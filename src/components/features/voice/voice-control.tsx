'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  Loader, 
  Navigation, 
  Thermometer, 
  Music2, 
  Lock,
  Fan 
} from 'lucide-react';

type CommandType = 'navigation' | 'climate' | 'music' | 'security' | 'system';

interface VoiceCommand {
  command: string;
  timestamp: Date;
  status: 'pending' | 'success' | 'error';
  response?: string;
  type: CommandType;
}

interface CommandListItem {
  command: string;
  type: CommandType;
  response: string;
}

const VoiceControl = () => {
  const [isListening, setIsListening] = useState(false);
  const [commands, setCommands] = useState<VoiceCommand[]>([]);
  const [processing, setProcessing] = useState(false);

  const commandList: CommandListItem[] = [
    {
      command: "Navigate to home",
      type: 'navigation',
      response: "Setting route to Home"
    },
    {
      command: "Set temperature to 22 degrees",
      type: 'climate',
      response: "Adjusting temperature to 22°C"
    },
    {
      command: "Play my playlist",
      type: 'music',
      response: "Playing your favorite playlist"
    },
    {
      command: "Lock the car",
      type: 'security',
      response: "Vehicle locked"
    },
    {
      command: "Turn on AC",
      type: 'climate',
      response: "AC activated"
    }
  ];

  const getCommandIcon = (type: CommandType) => {
    switch (type) {
      case 'navigation':
        return <Navigation className="w-4 h-4 text-blue-500" />;
      case 'climate':
        return <Thermometer className="w-4 h-4 text-red-500" />;
      case 'music':
        return <Music2 className="w-4 h-4 text-purple-500" />;
      case 'security':
        return <Lock className="w-4 h-4 text-green-500" />;
      default:
        return <Volume2 className="w-4 h-4 text-gray-500" />;
    }
  };

  const handleVoiceCommand = async () => {
    setProcessing(true);
    const randomCommand = commandList[Math.floor(Math.random() * commandList.length)];
    
    const newCommand: VoiceCommand = {
      command: randomCommand.command,
      timestamp: new Date(),
      status: 'pending',
      type: randomCommand.type
    };

    setCommands(prev => [...prev, newCommand]);

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Update command status
    setCommands(prev => 
      prev.map(cmd => 
        cmd === newCommand
          ? { ...cmd, status: 'success', response: randomCommand.response }
          : cmd
      )
    );

    setProcessing(false);
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      handleVoiceCommand();
    }
  };

  // Cleanup commands after 1 minute
  useEffect(() => {
    const cleanup = setInterval(() => {
      setCommands(prev => prev.filter(cmd => 
        new Date().getTime() - cmd.timestamp.getTime() < 60000
      ));
    }, 60000);

    return () => clearInterval(cleanup);
  }, []);

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold">Voice Assistant</h2>
          <p className="text-sm text-gray-500">
            {isListening ? "Listening..." : "Click microphone to start"}
          </p>
        </div>
        <button
          onClick={toggleListening}
          className={`p-3 rounded-full transition-all duration-200 ${
            isListening 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700'
          }`}
          disabled={processing}
        >
          {processing ? (
            <Loader className="w-5 h-5 animate-spin" />
          ) : isListening ? (
            <Mic className="w-5 h-5" />
          ) : (
            <MicOff className="w-5 h-5" />
          )}
        </button>
      </div>

      <div className="space-y-3 max-h-[300px] overflow-y-auto">
        {commands.map((cmd, index) => (
          <div 
            key={index} 
            className={`p-3 rounded-lg ${
              cmd.status === 'success' 
                ? 'bg-green-50 dark:bg-green-900/20' 
                : 'bg-gray-50 dark:bg-gray-800'
            }`}
          >
            <div className="flex items-start gap-3">
              {getCommandIcon(cmd.type)}
              <div className="flex-1">
                <p className="font-medium">{cmd.command}</p>
                {cmd.response && (
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {cmd.response}
                  </p>
                )}
                <p className="mt-1 text-xs text-gray-400">
                  {cmd.timestamp.toLocaleTimeString()}
                </p>
              </div>
              {cmd.status === 'pending' && (
                <Loader className="w-4 h-4 text-blue-500 animate-spin" />
              )}
            </div>
          </div>
        ))}

        {commands.length === 0 && (
          <div className="py-8 text-center text-gray-500">
            <p>Click the microphone to start voice commands</p>
            <p className="mt-2 text-sm">Try saying:</p>
            <ul className="mt-1 space-y-1 text-sm">
              <li>"Navigate to home"</li>
              <li>"Set temperature to 22 degrees"</li>
              <li>"Play my playlist"</li>
            </ul>
          </div>
        )}
      </div>
    </Card>
  );
};

export default VoiceControl;