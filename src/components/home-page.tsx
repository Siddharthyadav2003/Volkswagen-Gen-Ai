'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Mic, AlertTriangle, ChevronRight, Shield, HomeIcon, Navigation, PhoneCall } from 'lucide-react';

export default function HomePage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Handle initial client/server mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-background"></div>;
  }

  const maintenanceItems = [
    { title: 'Brake pads', dueIn: '2 months' },
    { title: 'Tire rotation', dueIn: '1 month' }
  ];

  const safetySystems = ['ABS', 'ESP', 'Airbags', 'ADAS'];
  const connectedSystems = ['Smart Home', 'Navigation', 'Emergency Services'];

  return (
    <div className="container-custom">
      {/* Profile Section */}
      <div className="card card-hover mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <span className="text-blue-600 dark:text-blue-300">SC</span>
            </div>
            <div>
              <h2 className="section-title">Sarah Chen</h2>
              <p className="section-subtitle">Personal Profile Active</p>
            </div>
          </div>
          <div className="status-dot status-dot-active"></div>
        </div>
      </div>

      {/* Voice Assistant */}
      <div className="card card-hover mb-6">
        <div className="flex items-center justify-between">
          <div className="system-status">
            <Mic className="text-blue-500 dark:text-blue-400" />
            <span>Voice Assistant</span>
          </div>
          <button className="voice-assistant-button">
            Simulate Voice Command
          </button>
        </div>
      </div>

      {/* Collision Warning */}
      <div className="alert alert-warning mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="text-red-500 dark:text-red-400" />
            <div>
              <h3 className="font-medium">Collision Avoidance System</h3>
              <p className="text-sm">Vehicle detected in blind spot</p>
            </div>
          </div>
          <span>Warning Active</span>
        </div>
      </div>

      {/* Vehicle Diagnostics */}
      <div className="card card-hover mb-6">
        <div className="flex items-center justify-between">
          <div className="system-status">
            <span>🔧</span>
            <span>Vehicle Diagnostics</span>
          </div>
          <button className="btn-secondary">Show Details</button>
        </div>
      </div>

      {/* Predictive Maintenance */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <span>📡</span>
          <h3 className="section-title">Predictive Maintenance Alerts</h3>
        </div>
        <div className="space-y-2">
          {maintenanceItems.map((item) => (
            <div key={item.title} className="maintenance-item">
              <div>
                <h4 className="maintenance-title">{item.title}</h4>
                <p className="maintenance-subtitle">Due in: {item.dueIn}</p>
              </div>
              <ChevronRight className="text-gray-400 dark:text-gray-500" />
            </div>
          ))}
        </div>
      </div>

      {/* Systems Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Safety Systems */}
        <div className="card card-hover">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="text-green-500 dark:text-green-400" />
            <h3 className="section-title">Safety Systems Active</h3>
          </div>
          <ul className="list-check">
            {safetySystems.map(system => (
              <li key={system} className="list-check-item">
                <span className="list-check-icon">✓</span>
                <span>{system}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Connected Systems */}
        <div className="card card-hover">
          <div className="flex items-center gap-2 mb-4">
            <HomeIcon className="text-blue-500 dark:text-blue-400" />
            <h3 className="section-title">Connected Systems</h3>
          </div>
          <ul className="list-check">
            {connectedSystems.map(system => (
              <li key={system} className="list-check-item">
                <span className="list-check-icon">✓</span>
                <span>{system}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Theme Toggle */}
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="btn btn-primary"
      >
        Toggle Theme
      </button>
    </div>
  );
}