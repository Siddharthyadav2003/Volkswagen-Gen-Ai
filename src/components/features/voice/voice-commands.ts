// voice-commands.ts
export interface VoiceCommandType {
    command: string;
    type: 'navigation' | 'climate' | 'music' | 'security' | 'system';
    response: string;
    action?: () => void;
    songName?: string;
    destination?: string;
    temperature?: number;
   }
   
   export const voiceCommands: VoiceCommandType[] = [
    {
      command: "Play my playlist",
      type: 'music',
      response: "Playing Mamushi",
      songName: "Mamushi"
    },
    {
      command: "Pause music",
      type: 'music', 
      response: "Music paused"
    },
    {
      command: "Navigate to home",
      type: 'navigation',
      response: "Setting route to Home",
      destination: "Home"
    },
    {
      command: "Set temperature to 22 degrees",
      type: 'climate',
      response: "Adjusting temperature to 22°C",
      temperature: 22
    },
    {
      command: "Turn on AC",
      type: 'climate',
      response: "AC activated"
    },
    {
      command: "Turn off AC", 
      type: 'climate',
      response: "AC deactivated"
    },
    {
      command: "Lock the car",
      type: 'security',
      response: "Vehicle locked"
    },
    {
      command: "Unlock the car",
      type: 'security', 
      response: "Vehicle unlocked"
    }
   ];
   
   // Helper function to find best matching command
   export function findMatchingCommand(input: string): VoiceCommandType | undefined {
    const normalizedInput = input.toLowerCase().trim();
    
    return voiceCommands.find(cmd => 
      normalizedInput.includes(cmd.command.toLowerCase())
    );
   }
   
   // Handle music playback
   export function playMusic(songName: string) {
    // Add music playback logic here
    console.log(`Playing ${songName}`);
   }
   
   // Handle climate control
   export function setTemperature(temp: number) {
    // Add temperature control logic
    console.log(`Setting temperature to ${temp}°C`);
   }
   
   // Handle navigation
   export function navigate(destination: string) {
    // Add navigation logic
    console.log(`Navigating to ${destination}`);
   }