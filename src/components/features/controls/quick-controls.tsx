'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { 
  Lock, 
  Power, 
  Fan, 
  Music, 
  BatteryCharging, 
  Settings 
} from 'lucide-react';

interface QuickControlProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick: () => void;
}

const QuickControlButton: React.FC<QuickControlProps> = ({ 
  icon, 
  label, 
  isActive = false, 
  onClick 
}) => (
  <button
    onClick={onClick}
    className={`p-3 rounded-lg flex flex-col items-center justify-center gap-2 transition-all
      ${isActive 
        ? 'bg-blue-500 text-white' 
        : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
  >
    {icon}
    <span className="text-xs font-medium">{label}</span>
  </button>
);

const QuickControls = () => {
  const [controls, setControls] = React.useState({
    locked: true,
    power: false,
    climate: false,
    music: false,
    charging: false,
  });

  const toggleControl = (key: keyof typeof controls) => {
    setControls(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Quick Controls</h2>
        <Settings className="w-5 h-5 text-gray-500" />
      </div>
      <div className="grid grid-cols-3 gap-3">
        <QuickControlButton
          icon={<Lock className="w-5 h-5" />}
          label={controls.locked ? "Locked" : "Unlocked"}
          isActive={controls.locked}
          onClick={() => toggleControl('locked')}
        />
        <QuickControlButton
          icon={<Power className="w-5 h-5" />}
          label="Power"
          isActive={controls.power}
          onClick={() => toggleControl('power')}
        />
        <QuickControlButton
          icon={<Fan className="w-5 h-5" />}
          label="Climate"
          isActive={controls.climate}
          onClick={() => toggleControl('climate')}
        />
        <QuickControlButton
          icon={<Music className="w-5 h-5" />}
          label="Music"
          isActive={controls.music}
          onClick={() => toggleControl('music')}
        />
        <QuickControlButton
          icon={<BatteryCharging className="w-5 h-5" />}
          label="Charging"
          isActive={controls.charging}
          onClick={() => toggleControl('charging')}
        />
      </div>
    </Card>
  );
};

export default QuickControls;