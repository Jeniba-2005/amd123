import { NextResponse } from 'next/server';
import { SmartEngine, GLOBAL_PRODUCTS } from '@/lib/SmartRetailEngine';

/**
 * ShopSphere X: Unified Internal API Route
 * Handles all "Smart Retail" operations via a single endpoint.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');

  switch (action) {
    case 'products':
      const category = searchParams.get('category');
      const products = category 
        ? GLOBAL_PRODUCTS.filter(p => p.category === category)
        : GLOBAL_PRODUCTS;
      return NextResponse.json(products);

    case 'search':
      const query = searchParams.get('q') || '';
      return NextResponse.json(SmartEngine.search(query));

    case 'recommendations':
      const categories = searchParams.get('categories')?.split(',') || [];
      const exclude = searchParams.get('exclude')?.split(',') || [];
      return NextResponse.json(SmartEngine.getRecommendations(categories, exclude));

    case 'analytics':
      return NextResponse.json(SmartEngine.getAnalytics());

    default:
      return NextResponse.json({ error: 'Invalid operation' }, { status: 400 });
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  const { action, payload } = body;

  switch (action) {
    case 'calculate_totals':
      return NextResponse.json(SmartEngine.calculateTotals(payload.items));
    
    case 'recommendations':
      return NextResponse.json(SmartEngine.getRecommendations(payload.categories, payload.ids));
    
    case 'simulate_order':
      // Automation Simulation: In a real app, this would update DB.
      // Here we simulate the automated status progression.
      return NextResponse.json({
        success: true,
        orderId: `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        status: 'Processing',
        message: 'Order received. Stock levels adjusted in memory.'
      });

    default:
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  }
}
