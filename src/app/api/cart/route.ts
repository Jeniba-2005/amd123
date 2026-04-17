import { NextResponse } from 'next/server';
import { SmartEngine } from '@/lib/SmartRetailEngine';

export async function POST(request: Request) {
  try {
    const { items } = await request.json();
    
    // Validate or process items if needed
    const totals = SmartEngine.calculateTotals(items);
    
    return NextResponse.json({
      success: true,
      ...totals
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400 });
  }
}
