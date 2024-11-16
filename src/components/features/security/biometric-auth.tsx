'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { 
  Fingerprint, 
  Eye, 
  Scan,
  Shield,
  UserCheck,
  AlertTriangle,
  Check
} from 'lucide-react';

interface AuthMethod {
  id: string;
  name: string;
  icon: React.ReactNode;
  status: 'active' | 'inactive' | 'processing';
}

const BiometricAuth = () => {
  const [activeMethod, setActiveMethod] = useState<string>('face');
  const [processingAuth, setProcessingAuth] = useState(false);
  const [lastAuth, setLastAuth] = useState<string>('Face ID verified at 10:30 AM');

  const authMethods: AuthMethod[] = [
    { 
      id: 'face', 
      name: 'Face ID', 
      icon: <Scan className="w-6 h-6" />, 
      status: 'active' 
    },
    { 
      id: 'fingerprint', 
      name: 'Fingerprint', 
      icon: <Fingerprint className="w-6 h-6" />, 
      status: 'active' 
    },
    { 
      id: 'iris', 
      name: 'Iris Scan', 
      icon: <Eye className="w-6 h-6" />, 
      status: 'active' 
    }
  ];

  const startAuth = (methodId: string) => {
    setActiveMethod(methodId);
    setProcessingAuth(true);
    setTimeout(() => {
      setProcessingAuth(false);
      setLastAuth(`${authMethods.find(m => m.id === methodId)?.name} verified at ${new Date().toLocaleTimeString()}`);
    }, 2000);
  };

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-green-500" />
          <h2 className="text-lg font-semibold">Biometric Security</h2>
        </div>
        <span className="px-2 py-1 text-sm text-green-700 bg-green-100 rounded-full dark:bg-green-900/20 dark:text-green-400">
          System Active
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        {authMethods.map((method) => (
          <button
            key={method.id}
            onClick={() => startAuth(method.id)}
            className={`p-3 rounded-lg flex flex-col items-center gap-2 transition-all
              ${activeMethod === method.id && processingAuth 
                ? 'bg-blue-100 dark:bg-blue-900/20 animate-pulse' 
                : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            disabled={processingAuth}
          >
            <div className={`${activeMethod === method.id ? 'text-blue-500' : 'text-gray-500'}`}>
              {method.icon}
            </div>
            <span className="text-xs font-medium">{method.name}</span>
          </button>
        ))}
      </div>

      {processingAuth ? (
        <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 animate-pulse">
          <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400">
            <Fingerprint className="w-5 h-5" />
            <p className="font-medium">Verifying...</p>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span className="text-sm">{lastAuth}</span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
            <h3 className="mb-2 text-sm font-medium text-green-800 dark:text-green-300">
              Active Security Features
            </h3>
            <div className="grid grid-cols-2 gap-2 text-sm text-green-700 dark:text-green-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>Anti-theft Active</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>PIN Protection</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>Biometric Lock</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>Remote Access</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default BiometricAuth;