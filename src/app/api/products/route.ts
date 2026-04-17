import { NextResponse } from 'next/server';
import { SmartEngine, GLOBAL_PRODUCTS } from '@/lib/SmartRetailEngine';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const query = searchParams.get('query');

  let products = [...GLOBAL_PRODUCTS];

  if (category) {
    products = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  if (query) {
    products = SmartEngine.search(query);
  }

  return NextResponse.json(products);
}
