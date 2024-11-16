'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { 
  Hand, 
  Volume2, 
  Music, 
  Phone,
  ArrowUpDown,
  RotateCcw,
  PlayCircle,
  PauseCircle,
  FastForward,
  Rewind,
  PhoneCall,
  PhoneOff
} from 'lucide-react';

interface GestureAction {
  id: string;
  gesture: string;
  action: string;
  icon: React.ReactNode;
  description: string;
}

const GestureControl = () => {
  const [isActive, setIsActive] = useState(true);
  const [currentGesture, setCurrentGesture] = useState<string>('');
  const [recentActions, setRecentActions] = useState<string[]>([]);

  const gestures: GestureAction[] = [
    {
      id: 'wave-right',
      gesture: 'Wave Right',
      action: 'Next Track',
      icon: <FastForward className="w-4 h-4" />,
      description: 'Wave hand right to skip track'
    },
    {
      id: 'wave-left',
      gesture: 'Wave Left',
      action: 'Previous Track',
      icon: <Rewind className="w-4 h-4" />,
      description: 'Wave hand left to go back'
    },
    {
      id: 'palm-up',
      gesture: 'Palm Up',
      action: 'Increase Volume',
      icon: <Volume2 className="w-4 h-4" />,
      description: 'Raise palm to increase volume'
    },
    {
      id: 'palm-down',
      gesture: 'Palm Down',
      action: 'Decrease Volume',
      icon: <Volume2 className="w-4 h-4" />,
      description: 'Lower palm to decrease volume'
    },
    {
      id: 'thumbs-up',
      gesture: 'Thumbs Up',
      action: 'Accept Call',
      icon: <PhoneCall className="w-4 h-4" />,
      description: 'Thumbs up to accept calls'
    },
    {
      id: 'thumbs-down',
      gesture: 'Thumbs Down',
      action: 'Reject Call',
      icon: <PhoneOff className="w-4 h-4" />,
      description: 'Thumbs down to reject calls'
    }
  ];

  // Simulate gesture detection
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      const randomGesture = gestures[Math.floor(Math.random() * gestures.length)];
      setCurrentGesture(randomGesture.gesture);
      setRecentActions(prev => [
        `${randomGesture.action} - ${new Date().toLocaleTimeString()}`,
        ...prev.slice(0, 4)
      ]);
    }, 5000);

    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Hand className="w-5 h-5 text-blue-500" />
          <h2 className="text-lg font-semibold">Gesture Control</h2>
        </div>
        <button
          onClick={() => setIsActive(!isActive)}
          className={`px-3 py-1 rounded-full text-sm transition-colors ${
            isActive 
              ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' 
              : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
          }`}
        >
          {isActive ? 'Active' : 'Disabled'}
        </button>
      </div>

      {currentGesture && isActive && (
        <div className="p-4 mb-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 animate-pulse">
          <div className="flex items-center justify-center text-blue-700 dark:text-blue-400">
            <Hand className="w-6 h-6 mr-2" />
            <span className="font-medium">{currentGesture} Detected</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 mb-4">
        {gestures.map((gesture) => (
          <div 
            key={gesture.id}
            className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
          >
            <div className="flex items-center gap-2 mb-1">
              {gesture.icon}
              <span className="text-sm font-medium">{gesture.gesture}</span>
            </div>
            <p className="text-xs text-gray-500">{gesture.description}</p>
          </div>
        ))}
      </div>

      {recentActions.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Recent Actions</h3>
          {recentActions.map((action, index) => (
            <div 
              key={index}
              className="flex items-center justify-between p-2 text-sm rounded-lg bg-gray-50 dark:bg-gray-800"
            >
              <span>{action}</span>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default GestureControl;