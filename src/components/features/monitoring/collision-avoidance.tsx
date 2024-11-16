// collision-avoidance.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Car, AlertTriangle, Shield } from 'lucide-react';

interface Distance {
  front: number;
  left: number;
  right: number;
}

interface CollisionAvoidanceProps {
  distances: Distance;
}

const CollisionAvoidance: React.FC<CollisionAvoidanceProps> = ({
  distances: initialDistances
}) => {
  const [distances, setDistances] = useState(initialDistances);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setDistances(prev => ({
        front: prev.front + (Math.random() - 0.5),
        left: prev.left + (Math.random() - 0.5) * 0.2,
        right: prev.right + (Math.random() - 0.5) * 0.2,
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getWarningZone = (distance: number) => {
    if (distance < 0.5) return 'bg-red-500/20 text-red-700 dark:bg-red-900/20 dark:text-red-400';
    if (distance < 1.5) return 'bg-yellow-500/20 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400';
    return 'bg-green-500/20 text-green-700 dark:bg-green-900/20 dark:text-green-400';
  };

  const hasWarning = distances.left < 0.5 || distances.right < 0.5 || distances.front < 1.5;

  return (
    <Card className="relative p-4 overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Shield className={`w-5 h-5 ${isActive ? 'text-green-500' : 'text-gray-400'}`} />
          <h2 className="text-lg font-semibold">Collision Avoidance System</h2>
        </div>
        <button 
          onClick={() => setIsActive(!isActive)}
          className={`px-3 py-1 text-sm rounded-full transition-colors ${
            isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
          }`}
        >
          {isActive ? 'Active' : 'Disabled'}
        </button>
      </div>

      <div className="relative w-full h-48 mb-4 bg-gray-100 rounded-lg dark:bg-gray-800">
        <div className="absolute inset-0 flex items-center justify-center">
          <Car className="w-24 h-24 text-blue-500" />
          
          {/* Distance indicators */}
          <div className="absolute left-0 flex items-center justify-between w-full h-full px-4">
            <div className={`p-2 rounded-md transition-all ${getWarningZone(distances.left)}`}>
              {distances.left.toFixed(1)}m
            </div>
            <div className={`p-2 rounded-md transition-all ${getWarningZone(distances.right)}`}>
              {distances.right.toFixed(1)}m
            </div>
          </div>
          
          <div className="absolute w-full text-center top-2">
            <div className={`inline-block p-2 rounded-md transition-all ${getWarningZone(distances.front)}`}>
              {distances.front.toFixed(1)}m
            </div>
          </div>
        </div>
      </div>

      {hasWarning && (
        <div className="flex items-center gap-2 p-3 text-red-500 rounded-lg bg-red-50 dark:bg-red-900/20 animate-pulse">
          <AlertTriangle className="w-5 h-5" />
          <span className="font-medium">Warning: Object detected in {
            distances.left < 0.5 ? 'left' : distances.right < 0.5 ? 'right' : 'front'
          } zone</span>
        </div>
      )}
    </Card>
  );
};

export default CollisionAvoidance;