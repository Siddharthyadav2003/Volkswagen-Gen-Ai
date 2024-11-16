// src/components/features/security/vehicle-security.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { 
  Lock, 
  Shield, 
  Bell, 
  Radio, 
  AlertTriangle,
  MapPin
} from 'lucide-react';

interface SecurityState {
  isLocked: boolean;
  alarmActive: boolean;
  motionDetected: boolean;
  geofenceStatus: 'inside' | 'outside' | 'approaching';
  lastActivity: string;
  alerts: string[];
}

const VehicleSecurity = () => {
  const [securityState, setSecurityState] = useState<SecurityState>({
    isLocked: true,
    alarmActive: true,
    motionDetected: false,
    geofenceStatus: 'inside',
    lastActivity: 'Vehicle locked',
    alerts: []
  });

  // Simulate security monitoring
  useEffect(() => {
    const interval = setInterval(() => {
      const randomEvent = Math.random();
      
      if (randomEvent < 0.2) {
        setSecurityState(prev => ({
          ...prev,
          motionDetected: true,
          alerts: [...prev.alerts, 'Motion detected near vehicle'],
        }));
      } else {
        setSecurityState(prev => ({
          ...prev,
          motionDetected: false
        }));
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-blue-500" />
          <h2 className="text-lg font-semibold">Vehicle Security</h2>
        </div>
        <div className="flex items-center gap-3">
          <Bell className={`w-5 h-5 ${securityState.alarmActive ? 'text-green-500' : 'text-gray-400'}`} />
          <Lock className={`w-5 h-5 ${securityState.isLocked ? 'text-green-500' : 'text-red-500'}`} />
        </div>
      </div>

      <div className="space-y-4">
        {/* Status Indicators */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
            <div className="flex items-center gap-2 mb-2">
              <Radio className="text-blue-500" />
              <span className="text-sm text-gray-500">Security System</span>
            </div>
            <p className="font-medium text-green-500">Active</p>
          </div>

          <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="text-blue-500" />
              <span className="text-sm text-gray-500">Geofence</span>
            </div>
            <p className="font-medium capitalize">{securityState.geofenceStatus}</p>
          </div>
        </div>

        {/* Alerts */}
        {securityState.motionDetected && (
          <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 animate-pulse">
            <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
              <AlertTriangle className="w-5 h-5" />
              <p className="font-medium">Motion Detected</p>
            </div>
          </div>
        )}

        {/* Activity Log */}
        <div className="mt-4">
          <h3 className="mb-2 text-sm font-medium">Recent Activity</h3>
          <div className="space-y-2 text-sm text-gray-500">
            {securityState.alerts.slice(-3).map((alert, index) => (
              <div key={index} className="flex items-center gap-2">
                <span>•</span>
                <span>{alert}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default VehicleSecurity;