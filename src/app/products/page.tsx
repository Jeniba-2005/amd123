import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { GLOBAL_PRODUCTS } from '@/lib/SmartRetailEngine';

export default async function ProductsPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }> | any
}) {
  // In Next.js 15+, searchParams is a promise
  const resolvedSearchParams = await searchParams;
  const categoryFilter = resolvedSearchParams?.category as string;
  
  // Fetch data from the internal API
  let products: any[] = [];
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/products?category=${categoryFilter || ''}`;
    const response = await fetch(apiUrl, { cache: 'no-store' });
    products = await response.json();
  } catch (error) {
    console.error("Failed to fetch products from API", error);
  }

  return (
    <div className="container" style={{ padding: '6rem 1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
        <div>
          <h1 className="title" style={{ margin: 0, textAlign: 'left', fontSize: '3rem', textTransform: 'uppercase' }}>
            {categoryFilter ? (
              <>
                <span style={{ color: 'var(--primary-orange)' }}>{categoryFilter}</span> Collection
              </>
            ) : (
              <>All <span style={{ color: 'var(--primary-orange)' }}>Products</span></>
            )}
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Powering your lifestyle with premium tech and gear.</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ 
            color: 'var(--primary-orange)', 
            fontWeight: 800, 
            fontSize: '1.2rem',
            textShadow: '0 0 10px var(--primary-orange-glow)'
          }}>
            {products.length}
          </span>
          <span style={{ color: 'var(--text-secondary)', marginLeft: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.9rem' }}>Items Found</span>
        </div>
      </div>

      {/* Main Layout containing Filters sidebar and Product Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '4rem' }}>
        
        {/* Futuristic Filters Sidebar */}
        <aside style={{ 
          background: 'var(--bg-glass)', 
          padding: '2.5rem', 
          borderRadius: '8px', 
          border: '1px solid var(--border-color)', 
          height: 'fit-content',
          backdropFilter: 'blur(10px)',
          position: 'sticky',
          top: '120px'
        }}>
          <h3 style={{ 
            fontSize: '1.1rem', 
            marginBottom: '2rem', 
            textTransform: 'uppercase', 
            letterSpacing: '2px',
            color: '#fff',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            paddingBottom: '1rem'
          }}>Filters</h3>
          
          <div style={{ marginBottom: '2.5rem' }}>
            <h4 style={{ fontSize: '0.85rem', marginBottom: '1.25rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Categories</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li>
                <Link href="/products" style={{ 
                  color: !categoryFilter ? 'var(--primary-orange)' : 'var(--text-secondary)', 
                  fontWeight: !categoryFilter ? 700 : 400,
                  transition: '0.3s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  {!categoryFilter && <span style={{ width: '4px', height: '4px', background: 'var(--primary-orange)', borderRadius: '50%', boxShadow: '0 0 10px var(--primary-orange)' }}></span>}
                  All Products
                </Link>
              </li>
              {['Clothing', 'Electronics', 'Groceries', 'Accessories'].map(cat => (
                <li key={cat}>
                  <Link href={`/products?category=${cat}`} style={{ 
                    color: categoryFilter === cat ? 'var(--primary-orange)' : 'var(--text-secondary)', 
                    fontWeight: categoryFilter === cat ? 700 : 400,
                    transition: '0.3s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    {categoryFilter === cat && <span style={{ width: '4px', height: '4px', background: 'var(--primary-orange)', borderRadius: '50%', boxShadow: '0 0 10px var(--primary-orange)' }}></span>}
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div style={{ paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
             <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', lineHeight: '1.5' }}>
               ShopSphere X<br />Powered by AMD Technology
             </p>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1" style={{ alignContent: 'start' }}>
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
          {products.length === 0 && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '10rem 2rem', background: 'var(--bg-glass)', borderRadius: '8px', border: '1px dashed var(--border-color)' }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>
                No energy signatures matching <span style={{ color: 'var(--primary-orange)', fontWeight: 600 }}>"{categoryFilter}"</span> found in the system.
              </p>
              <Link href="/products" className="btn btn-secondary" style={{ marginTop: '2rem' }}>Reset Search</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
