import { voiceCommands } from '@/components/features/voice/voice-commands';

const CLAUDE_API_KEY = process.env.NEXT_PUBLIC_CLAUDE_API_KEY;

export async function processCommandServer(command: string) {
  try {
    // First try matching with predefined commands
    const matchedCommand = voiceCommands.find(cmd => 
      command.toLowerCase().includes(cmd.command.toLowerCase())
    );

    if (matchedCommand) {
      return {
        content: [{ text: matchedCommand.response }]
      };
    }

    // If no match found and API is available, try Claude API
    if (CLAUDE_API_KEY) {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'anthropic-version': '2024-02-15-preview',
          'x-api-key': CLAUDE_API_KEY,
        },
        body: JSON.stringify({
          model: "claude-3-opus-20240229",
          max_tokens: 1024,
          messages: [{
            role: "user",
            content: command
          }],
          system: `You are an AI assistant integrated into a vehicle interface system. Respond naturally to commands about:
          - Music control (play, pause, next, previous)
          - Climate control (temperature, AC)
          - Navigation
          - Vehicle status
          - General inquiries
          
          Keep responses brief and natural.`
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      return await response.json();
    }

    // If no API key and no match found
    return {
      content: [{ text: "I understand you want to " + command + ". However, I can only process basic commands at the moment." }]
    };

  } catch (error) {
    console.error('Server error:', error);
    throw error;
  }
}