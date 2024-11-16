// src/components/features/smart-home/smart-home-integration.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { 
  Home, 
  Lightbulb, 
  Thermometer, 
  Lock,
  Bell,
  Power,
  Battery,
  Shield,
  AlertTriangle
} from 'lucide-react';

interface SmartHomeDevice {
  id: string;
  name: string;
  type: 'light' | 'thermostat' | 'lock' | 'alarm' | 'power' | 'charger';
  status: 'on' | 'off' | 'charging' | 'armed';
  value?: number;
}

const SmartHomeIntegration = () => {
  const [devices, setDevices] = useState<SmartHomeDevice[]>([
    { id: '1', name: 'Living Room', type: 'light', status: 'off' },
    { id: '2', name: 'Home Security', type: 'alarm', status: 'armed' },
    { id: '3', name: 'Temperature', type: 'thermostat', status: 'on', value: 22 },
    { id: '4', name: 'Main Door', type: 'lock', status: 'on' },
    { id: '5', name: 'Car Charger', type: 'charger', status: 'charging' }
  ]);

  const [homeMode, setHomeMode] = useState<'away' | 'arriving' | 'home'>('away');

  const getDeviceIcon = (type: SmartHomeDevice['type']) => {
    switch (type) {
      case 'light': return <Lightbulb className="w-5 h-5" />;
      case 'thermostat': return <Thermometer className="w-5 h-5" />;
      case 'lock': return <Lock className="w-5 h-5" />;
      case 'alarm': return <Bell className="w-5 h-5" />;
      case 'power': return <Power className="w-5 h-5" />;
      case 'charger': return <Battery className="w-5 h-5" />;
    }
  };

  const toggleDevice = (id: string) => {
    setDevices(prev => prev.map(device => 
      device.id === id 
        ? { ...device, status: device.status === 'on' ? 'off' : 'on' }
        : device
    ));
  };

  // Simulate arrival mode when within 1km of home
  useEffect(() => {
    const interval = setInterval(() => {
      setHomeMode(prev => {
        if (prev === 'away') return 'arriving';
        if (prev === 'arriving') return 'home';
        return 'away';
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Trigger home automation based on mode
  useEffect(() => {
    if (homeMode === 'arriving') {
      // Simulate turning on lights and adjusting temperature
      setDevices(prev => prev.map(device => {
        if (device.type === 'light') return { ...device, status: 'on' };
        if (device.type === 'thermostat') return { ...device, status: 'on', value: 22 };
        return device;
      }));
    }
  }, [homeMode]);

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Home className="w-5 h-5 text-blue-500" />
          <h2 className="text-lg font-semibold">Smart Home Control</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 text-sm rounded-full ${
            homeMode === 'arriving' 
              ? 'bg-yellow-100 text-yellow-700' 
              : homeMode === 'home'
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-100 text-gray-700'
          }`}>
            {homeMode === 'arriving' ? 'Arriving Soon' : homeMode.charAt(0).toUpperCase() + homeMode.slice(1)}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {/* Devices Grid */}
        <div className="grid grid-cols-2 gap-3">
          {devices.map(device => (
            <button
              key={device.id}
              onClick={() => toggleDevice(device.id)}
              className={`p-3 rounded-lg transition-colors ${
                device.status === 'on' || device.status === 'charging' || device.status === 'armed'
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                  : 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                {getDeviceIcon(device.type)}
                <span className="text-sm font-medium">{device.name}</span>
              </div>
              <div className="text-xs">
                {device.type === 'thermostat' && device.value 
                  ? `${device.value}°C` 
                  : device.status.charAt(0).toUpperCase() + device.status.slice(1)}
              </div>
            </button>
          ))}
        </div>

        {/* Automation Cards */}
        <div className="space-y-2">
          <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium text-green-700">Arrival Mode Active</p>
                <p className="text-sm text-green-600">Preparing home for your arrival</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SmartHomeIntegration;