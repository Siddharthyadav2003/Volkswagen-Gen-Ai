import { NextResponse } from 'next/server';
import { processCommandServer } from '@/lib/claude/server-service';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    console.log('Received command:', message);

    const claudeResponse = await processCommandServer(message);
    const responseContent = claudeResponse.content[0].text;

    return NextResponse.json({
      response: responseContent,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json({ 
      response: "Sorry, there was an error processing your request. Please try again.",
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { 
      status: 500 
    });
  }
}