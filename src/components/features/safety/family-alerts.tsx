// src/components/features/safety/family-alerts.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { 
  Heart, 
  Users, 
  AlertTriangle, 
  Bell,
  PhoneCall
} from 'lucide-react';

interface VitalSigns {
  heartRate: number;
  stressLevel: number;
  alertness: number;
}

interface EmergencyContact {
  name: string;
  relation: string;
  notified: boolean;
}

const FamilyAlerts = () => {
  const [vitalSigns, setVitalSigns] = useState<VitalSigns>({
    heartRate: 75,
    stressLevel: 30,
    alertness: 90
  });

  const [emergencyContacts] = useState<EmergencyContact[]>([
    { name: 'Sarah Chen', relation: 'Spouse', notified: false },
    { name: 'David Chen', relation: 'Son', notified: false },
    { name: 'Emergency Services', relation: 'Medical', notified: false }
  ]);

  const [alerts, setAlerts] = useState<string[]>([]);

  // Simulate vital signs monitoring
  useEffect(() => {
    const interval = setInterval(() => {
      setVitalSigns(prev => ({
        heartRate: prev.heartRate + (Math.random() - 0.5) * 5,
        stressLevel: Math.max(0, Math.min(100, prev.stressLevel + (Math.random() - 0.5) * 10)),
        alertness: Math.max(0, Math.min(100, prev.alertness + (Math.random() - 0.5) * 5))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Monitor for concerning conditions
  useEffect(() => {
    if (vitalSigns.alertness < 70) {
      setAlerts(prev => [...prev, 'Low driver alertness detected']);
    }
    if (vitalSigns.stressLevel > 70) {
      setAlerts(prev => [...prev, 'High stress level detected']);
    }
    if (vitalSigns.heartRate > 100) {
      setAlerts(prev => [...prev, 'Elevated heart rate detected']);
    }
  }, [vitalSigns]);

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-500" />
          <h2 className="text-lg font-semibold">Family Safety Alerts</h2>
        </div>
        <Bell className="w-5 h-5 text-gray-500" />
      </div>

      <div className="space-y-4">
        {/* Vital Signs */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
            <Heart className="w-4 h-4 mb-1 text-red-500" />
            <div className="text-sm">
              <p className="text-gray-500">Heart Rate</p>
              <p className="font-medium">{Math.round(vitalSigns.heartRate)} BPM</p>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
            <AlertTriangle className="w-4 h-4 mb-1 text-yellow-500" />
            <div className="text-sm">
              <p className="text-gray-500">Stress</p>
              <p className="font-medium">{Math.round(vitalSigns.stressLevel)}%</p>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
            <Bell className="w-4 h-4 mb-1 text-blue-500" />
            <div className="text-sm">
              <p className="text-gray-500">Alertness</p>
              <p className="font-medium">{Math.round(vitalSigns.alertness)}%</p>
            </div>
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Emergency Contacts</h3>
          {emergencyContacts.map((contact, index) => (
            <div 
              key={index}
              className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-800"
            >
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-500" />
                <div className="text-sm">
                  <p className="font-medium">{contact.name}</p>
                  <p className="text-gray-500">{contact.relation}</p>
                </div>
              </div>
              <PhoneCall className="w-4 h-4 text-blue-500" />
            </div>
          ))}
        </div>

        {/* Active Alerts */}
        {alerts.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-red-500">Active Alerts</h3>
            {alerts.slice(-3).map((alert, index) => (
              <div 
                key={index}
                className="flex items-center gap-2 p-2 text-sm text-red-700 rounded-lg bg-red-50 dark:bg-red-900/20 dark:text-red-300"
              >
                <AlertTriangle className="w-4 h-4" />
                {alert}
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default FamilyAlerts;