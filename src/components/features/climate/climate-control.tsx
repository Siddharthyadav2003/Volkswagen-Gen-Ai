'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { 
  Thermometer,
  Fan,
  Droplets,
  ArrowUp,
  ArrowDown,
  Power
} from 'lucide-react';

interface ClimateState {
  temperature: number;
  fanSpeed: number;
  mode: 'auto' | 'manual';
  isOn: boolean;
  humidity: number;
}

const ClimateControl = () => {
  const [climate, setClimate] = useState<ClimateState>({
    temperature: 22,
    fanSpeed: 2,
    mode: 'auto',
    isOn: true,
    humidity: 45
  });

  const adjustTemperature = (delta: number) => {
    setClimate(prev => ({
      ...prev,
      temperature: Math.min(30, Math.max(16, prev.temperature + delta))
    }));
  };

  const adjustFanSpeed = (delta: number) => {
    setClimate(prev => ({
      ...prev,
      fanSpeed: Math.min(5, Math.max(1, prev.fanSpeed + delta))
    }));
  };

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Climate Control</h2>
        <button
          onClick={() => setClimate(prev => ({ ...prev, isOn: !prev.isOn }))}
          className={`p-2 rounded-full transition-colors ${
            climate.isOn 
              ? 'bg-green-500 text-white' 
              : 'bg-gray-200 text-gray-500'
          }`}
        >
          <Power className="w-5 h-5" />
        </button>
      </div>

      {climate.isOn && (
        <div className="space-y-6">
          {/* Temperature Control */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Thermometer className="w-6 h-6 text-red-500" />
              <div>
                <p className="text-sm text-gray-500">Temperature</p>
                <p className="text-2xl font-bold">{climate.temperature}°C</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => adjustTemperature(-0.5)}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <ArrowDown className="w-4 h-4" />
              </button>
              <button
                onClick={() => adjustTemperature(0.5)}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Fan Speed */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Fan className="w-6 h-6 text-blue-500" />
              <div>
                <p className="text-sm text-gray-500">Fan Speed</p>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-8 rounded-full ${
                        i < climate.fanSpeed
                          ? 'bg-blue-500'
                          : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => adjustFanSpeed(-1)}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <ArrowDown className="w-4 h-4" />
              </button>
              <button
                onClick={() => adjustFanSpeed(1)}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Humidity */}
          <div className="flex items-center gap-3">
            <Droplets className="w-6 h-6 text-cyan-500" />
            <div>
              <p className="text-sm text-gray-500">Humidity</p>
              <p className="font-medium">{climate.humidity}%</p>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default ClimateControl;