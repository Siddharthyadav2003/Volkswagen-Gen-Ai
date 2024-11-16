'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { 
  Mic, 
  MicOff, 
  Loader, 
  Volume2, 
  VolumeX,
  RotateCcw
} from 'lucide-react';

interface VoiceCommand {
  command: string;
  response?: string;
  timestamp: Date;
  status: 'pending' | 'success' | 'error';
}

const VoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [loading, setLoading] = useState(false);
  const [commands, setCommands] = useState<VoiceCommand[]>([]);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = handleSpeechResult;
      recognitionRef.current.onerror = handleSpeechError;
      recognitionRef.current.onend = () => setIsListening(false);
    }

    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  const handleSpeechResult = async (event: any) => {
    const command = event.results[0][0].transcript;
    await processCommand(command);
  };

  const handleSpeechError = (event: any) => {
    console.error('Speech recognition error:', event.error);
    setIsListening(false);
    setCommands(prev => [{
      command: 'Error recognizing speech',
      timestamp: new Date(),
      status: 'error'
    }, ...prev]);
  };

  const processCommand = async (command: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: command }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      setCommands(prev => [{
        command,
        response: data.response,
        timestamp: new Date(),
        status: 'success'
      }, ...prev]);

      if (voiceEnabled) {
        speakResponse(data.response);
      }

    } catch (error) {
      console.error('Error processing command:', error);
      setCommands(prev => [{
        command,
        response: "I'm sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
        status: 'error'
      }, ...prev]);
    } finally {
      setLoading(false);
    }
  };

  const speakResponse = (text: string) => {
    if (synthRef.current && voiceEnabled) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setIsSpeaking(false);
      synthRef.current.speak(utterance);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  const clearHistory = () => {
    setCommands([]);
  };

  return (
    <Card className="p-4 bg-gray-800 border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-white">Voice Assistant</h2>
          <p className="text-sm text-gray-400">
            {isListening ? 'Listening...' : 'Click microphone to speak'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setVoiceEnabled(!voiceEnabled)}
            className="p-2 text-gray-400 rounded-full hover:bg-gray-700"
            title={voiceEnabled ? 'Disable voice response' : 'Enable voice response'}
          >
            {voiceEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>
          <button
            onClick={clearHistory}
            className="p-2 text-gray-400 rounded-full hover:bg-gray-700"
            title="Clear history"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
          <button
            onClick={toggleListening}
            disabled={loading}
            className={`p-3 rounded-full transition-colors ${
              isListening 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {loading ? (
              <Loader className="w-6 h-6 animate-spin" />
            ) : isListening ? (
              <Mic className="w-6 h-6" />
            ) : (
              <MicOff className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      <div className="space-y-4 max-h-[400px] overflow-y-auto">
        {commands.map((cmd, index) => (
          <div 
            key={index}
            className={`p-3 rounded-lg ${
              cmd.status === 'error' 
                ? 'bg-red-900/20' 
                : 'bg-gray-700/50'
            }`}
          >
            <div className="flex items-start gap-2">
              <div className="flex-1">
                <p className="text-gray-300">
                  <span className="text-blue-400">You:</span> {cmd.command}
                </p>
                {cmd.response && (
                  <p className="mt-2 text-white">
                    <span className="text-green-400">Assistant:</span> {cmd.response}
                  </p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  {cmd.timestamp.toLocaleTimeString()}
                </p>
              </div>
              {cmd.status === 'pending' && (
                <Loader className="w-4 h-4 text-blue-400 animate-spin" />
              )}
            </div>
          </div>
        ))}

        {commands.length === 0 && (
          <div className="py-8 text-center text-gray-400">
            <p>No commands yet</p>
            <p className="mt-2 text-sm">Try saying:</p>
            <ul className="mt-1 text-sm">
              <li>"Set temperature to 22 degrees"</li>
              <li>"Navigate to home"</li>
              <li>"Turn on AC"</li>
            </ul>
          </div>
        )}
      </div>
    </Card>
  );
};

export default VoiceAssistant;