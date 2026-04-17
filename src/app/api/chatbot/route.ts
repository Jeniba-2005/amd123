import { NextResponse } from 'next/server';
import { SmartEngine } from '@/lib/SmartRetailEngine';

export async function POST(request: Request) {
  try {
    const { query, cartItems, history } = await request.json();
    
    // Process the query through the unified engine
    const response = SmartEngine.processChatQuery(query, cartItems || [], history || []);
    
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ 
      text: "Protocol Error: I've encountered interference while scanning your request. Please retry.",
      type: 'default'
    }, { status: 500 });
  }
}
