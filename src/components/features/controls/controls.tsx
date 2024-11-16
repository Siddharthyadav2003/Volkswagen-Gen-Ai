'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { 
  ThermometerSun, 
  Music2, 
  Navigation, 
  Settings,
  Power,
  Lock,
  Fan
} from 'lucide-react';

interface ControlItemProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  onClick?: () => void;
}

const ControlItem: React.FC<ControlItemProps> = ({ icon, title, value, onClick }) => (
  <div 
    onClick={onClick}
    className="flex items-center justify-between p-3 transition-colors bg-gray-100 rounded-lg cursor-pointer dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
  >
    <div className="flex items-center gap-3">
      <div className="text-blue-500">{icon}</div>
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{value}</p>
      </div>
    </div>
    <Settings className="w-4 h-4 text-gray-400" />
  </div>
);

const Controls = () => {
  return (
    <Card className="p-4">
      <h2 className="mb-4 text-lg font-semibold">Vehicle Controls</h2>
      <div className="space-y-3">
        <ControlItem
          icon={<ThermometerSun className="w-5 h-5" />}
          title="Temperature"
          value="24°C"
        />
        <ControlItem
          icon={<Fan className="w-5 h-5" />}
          title="Climate"
          value="Auto"
        />
        <ControlItem
          icon={<Music2 className="w-5 h-5" />}
          title="Media"
          value="Playing"
        />
        <ControlItem
          icon={<Navigation className="w-5 h-5" />}
          title="Navigation"
          value="Active"
        />
      </div>
    </Card>
  );
};

export default Controls;