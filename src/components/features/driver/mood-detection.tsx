'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { 
  Smile, 
  Frown, 
  Meh, 
  AlertTriangle, 
  Coffee,
  Eye
} from 'lucide-react';

interface MoodState {
  mood: 'alert' | 'tired' | 'distracted' | 'neutral';
  alertLevel: number;
  timeStamp: Date;
  suggestion?: string;
}

const MoodDetection = () => {
  const [driverState, setDriverState] = useState<MoodState>({
    mood: 'alert',
    alertLevel: 100,
    timeStamp: new Date()
  });

  const [suggestions, setSuggestions] = useState<string[]>([]);

  const getMoodIcon = (mood: MoodState['mood']) => {
    switch (mood) {
      case 'alert':
        return <Smile className="w-6 h-6 text-green-500" />;
      case 'tired':
        return <Coffee className="w-6 h-6 text-yellow-500" />;
      case 'distracted':
        return <Eye className="w-6 h-6 text-red-500" />;
      default:
        return <Meh className="w-6 h-6 text-gray-500" />;
    }
  };

  // Simulate real-time mood detection
  useEffect(() => {
    const interval = setInterval(() => {
      const moods: MoodState['mood'][] = ['alert', 'tired', 'distracted', 'neutral'];
      const randomMood = moods[Math.floor(Math.random() * moods.length)];
      const alertLevel = Math.floor(Math.random() * 100);

      setDriverState({
        mood: randomMood,
        alertLevel,
        timeStamp: new Date()
      });

      // Add suggestions based on mood
      if (randomMood === 'tired' && alertLevel < 50) {
        setSuggestions(prev => [
          ...prev,
          'Consider taking a break',
          'Coffee break recommended'
        ].slice(-3));
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Driver Monitoring</h2>
        {driverState.alertLevel < 50 && (
          <AlertTriangle className="w-5 h-5 text-yellow-500 animate-pulse" />
        )}
      </div>

      <div className="space-y-4">
        {/* Current State */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
          <div className="flex items-center gap-3">
            {getMoodIcon(driverState.mood)}
            <div>
              <p className="font-medium capitalize">{driverState.mood}</p>
              <p className="text-sm text-gray-500">
                Alert Level: {driverState.alertLevel}%
              </p>
            </div>
          </div>
        </div>

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Suggestions:</p>
            {suggestions.map((suggestion, index) => (
              <div 
                key={index}
                className="p-2 text-sm text-yellow-700 rounded bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-200"
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default MoodDetection;