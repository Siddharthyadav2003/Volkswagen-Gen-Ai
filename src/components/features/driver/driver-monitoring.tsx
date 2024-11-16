'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { 
  Eye, 
  Brain, 
  Heart, 
  AlertTriangle, 
  Activity,
  AlertCircle
} from 'lucide-react';

interface DriverState {
  alertness: number;
  stressLevel: number;
  heartRate: number;
  eyeMovements: number;
  distractionLevel: number;
  warnings: string[];
}

const DriverMonitoring = () => {
  const [driverState, setDriverState] = useState<DriverState>({
    alertness: 95,
    stressLevel: 30,
    heartRate: 75,
    eyeMovements: 90,
    distractionLevel: 15,
    warnings: []
  });

  const getAlertLevel = (value: number) => {
    if (value >= 80) return 'bg-green-500';
    if (value >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  // Simulate real-time monitoring
  useEffect(() => {
    const updateState = () => {
      const newState: DriverState = {
        alertness: Math.max(0, Math.min(100, driverState.alertness + (Math.random() * 10 - 5))),
        stressLevel: Math.max(0, Math.min(100, driverState.stressLevel + (Math.random() * 10 - 5))),
        heartRate: Math.max(60, Math.min(100, driverState.heartRate + (Math.random() * 6 - 3))),
        eyeMovements: Math.max(0, Math.min(100, driverState.eyeMovements + (Math.random() * 10 - 5))),
        distractionLevel: Math.max(0, Math.min(100, driverState.distractionLevel + (Math.random() * 10 - 5))),
        warnings: []
      };

      // Generate warnings based on state
      if (newState.alertness < 70) {
        newState.warnings.push('Low alertness detected');
      }
      if (newState.stressLevel > 70) {
        newState.warnings.push('High stress level');
      }
      if (newState.distractionLevel > 50) {
        newState.warnings.push('Driver distraction detected');
      }

      setDriverState(newState);
    };

    const interval = setInterval(updateState, 2000);
    return () => clearInterval(interval);
  }, [driverState]);

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Driver Monitoring</h2>
        {driverState.warnings.length > 0 && (
          <AlertTriangle className="w-5 h-5 text-red-500 animate-pulse" />
        )}
      </div>

      <div className="space-y-6">
        {/* Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-500" />
              <div className="flex-1">
                <p className="text-sm text-gray-500">Alertness</p>
                <div className="h-2 mt-1 bg-gray-200 rounded-full">
                  <div 
                    className={`h-2 rounded-full ${getAlertLevel(driverState.alertness)}`}
                    style={{ width: `${driverState.alertness}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-500" />
              <div className="flex-1">
                <p className="text-sm text-gray-500">Stress Level</p>
                <div className="h-2 mt-1 bg-gray-200 rounded-full">
                  <div 
                    className={`h-2 rounded-full ${getAlertLevel(100 - driverState.stressLevel)}`}
                    style={{ width: `${driverState.stressLevel}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500" />
              <div className="flex-1">
                <p className="text-sm text-gray-500">Heart Rate</p>
                <p className="font-medium">{Math.round(driverState.heartRate)} BPM</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-green-500" />
              <div className="flex-1">
                <p className="text-sm text-gray-500">Eye Movement</p>
                <div className="h-2 mt-1 bg-gray-200 rounded-full">
                  <div 
                    className={`h-2 rounded-full ${getAlertLevel(driverState.eyeMovements)}`}
                    style={{ width: `${driverState.eyeMovements}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-orange-500" />
              <div className="flex-1">
                <p className="text-sm text-gray-500">Distraction</p>
                <div className="h-2 mt-1 bg-gray-200 rounded-full">
                  <div 
                    className={`h-2 rounded-full ${getAlertLevel(100 - driverState.distractionLevel)}`}
                    style={{ width: `${driverState.distractionLevel}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Warnings */}
        {driverState.warnings.length > 0 && (
          <div className="space-y-2">
            {driverState.warnings.map((warning, index) => (
              <div 
                key={index}
                className="flex items-center gap-2 p-2 text-sm text-red-700 rounded-lg bg-red-50 dark:bg-red-900/20 dark:text-red-200"
              >
                <AlertTriangle className="w-4 h-4" />
                {warning}
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default DriverMonitoring;