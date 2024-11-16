// src/components/auth/auth-screen.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { 
  Fingerprint, 
  Eye, 
  Lock, 
  Shield,
  ChevronRight 
} from 'lucide-react';

interface AuthScreenProps {
  onAuthenticate: () => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onAuthenticate }) => {
  const [pin, setPin] = useState('');
  const [authMethod, setAuthMethod] = useState<'pin' | 'biometric'>('pin');
  const [error, setError] = useState('');

  // Watch for PIN changes
  useEffect(() => {
    if (pin.length === 4) {
      if (pin === '1234') {
        onAuthenticate();
      } else {
        setError('Invalid PIN');
        setPin('');
      }
    }
  }, [pin, onAuthenticate]);

  const simulateBiometric = () => {
    setAuthMethod('biometric');
    setTimeout(() => {
      onAuthenticate();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="w-full max-w-md p-8">
        <div className="mb-8 text-center">
          <Shield className="w-16 h-16 mx-auto mb-4 text-blue-500" />
          <h1 className="mb-2 text-2xl font-bold text-white">Vehicle Authentication</h1>
          <p className="text-gray-400">Please authenticate to access your vehicle</p>
        </div>

        {authMethod === 'pin' ? (
          <div className="space-y-4">
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center w-12 h-12 border-2 rounded-lg"
                  style={{
                    borderColor: pin.length > i ? '#60A5FA' : '#374151',
                    backgroundColor: pin.length > i ? '#60A5FA20' : 'transparent'
                  }}
                >
                  {pin.length > i && '•'}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, 'del'].map((num, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (num === 'del') {
                      setPin(prev => prev.slice(0, -1));
                      setError(''); // Clear error on delete
                    } else if (typeof num === 'number') {
                      if (pin.length < 4) {
                        setPin(prev => prev + num);
                      }
                    }
                  }}
                  className={`h-16 rounded-lg flex items-center justify-center text-xl
                    ${num === '' ? 'invisible' : ''}
                    ${typeof num === 'number' 
                      ? 'bg-gray-800 hover:bg-gray-700 text-white' 
                      : num === 'del' 
                        ? 'bg-red-900/20 text-red-500 hover:bg-red-900/30' 
                        : ''
                    }`}
                >
                  {num === 'del' ? '←' : num}
                </button>
              ))}
            </div>

            {error && (
              <p className="text-center text-red-500">{error}</p>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <div className="text-center">
              <Fingerprint className="w-24 h-24 mx-auto text-blue-500 animate-pulse" />
              <p className="mt-4 text-blue-400">Scanning...</p>
            </div>
          </div>
        )}

        <div className="flex justify-center mt-8">
          <button
            onClick={() => {
              setAuthMethod(prev => prev === 'pin' ? 'biometric' : 'pin');
              setPin(''); // Clear PIN when switching methods
              setError(''); // Clear any errors
            }}
            className="flex items-center gap-2 text-gray-400 hover:text-white"
          >
            {authMethod === 'pin' ? (
              <>
                <Fingerprint className="w-5 h-5" />
                <span>Use Biometric</span>
              </>
            ) : (
              <>
                <Lock className="w-5 h-5" />
                <span>Use PIN</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;