'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Battery, Thermometer, Gauge, AlertTriangle } from 'lucide-react';

interface VehicleStatusProps {
  batteryLevel?: number;
  temperature?: number;
  speed?: number;
  range?: number;
  alerts?: string[];
}

const VehicleStatus: React.FC<VehicleStatusProps> = ({
  batteryLevel = 82,
  temperature = 24,
  speed = 0,
  range = 285,
  alerts = []
}) => {
  // Helper function to determine battery color
  const getBatteryColor = (level: number) => {
    if (level > 50) return 'text-green-500';
    if (level > 20) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Vehicle Status</h2>
        <span className="text-sm text-gray-500">Live Updates</span>
      </div>

      {/* Battery Status */}
      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="flex items-center gap-3">
          <Battery className={getBatteryColor(batteryLevel)} size={24} />
          <div>
            <p className="text-sm text-gray-500">Battery Level</p>
            <p className="font-semibold">{batteryLevel}%</p>
          </div>
        </div>
        <span className="text-sm text-gray-500">{range} km range</span>
      </div>

      {/* Temperature */}
      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="flex items-center gap-3">
          <Thermometer className="text-blue-500" size={24} />
          <div>
            <p className="text-sm text-gray-500">Temperature</p>
            <p className="font-semibold">{temperature}°C</p>
          </div>
        </div>
      </div>

      {/* Speed */}
      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="flex items-center gap-3">
          <Gauge className="text-indigo-500" size={24} />
          <div>
            <p className="text-sm text-gray-500">Current Speed</p>
            <p className="font-semibold">{speed} km/h</p>
          </div>
        </div>
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-red-500">
            <AlertTriangle size={20} />
            <h3 className="font-semibold">Active Alerts</h3>
          </div>
          {alerts.map((alert, index) => (
            <div 
              key={index}
              className="p-3 bg-red-50 dark:bg-red-900/10 text-red-700 dark:text-red-400 rounded-lg text-sm"
            >
              {alert}
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default VehicleStatus;