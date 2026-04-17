'use client';

import { useWishlist } from '@/context/WishlistContext';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import { Heart, ArrowLeft, ShoppingBag } from 'lucide-react';

export default function WishlistPage() {
  const { wishlist, totalWishlistItems } = useWishlist();

  return (
    <div className="container" style={{ padding: '6rem 1rem', minHeight: '80vh' }}>
      <div style={{ marginBottom: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <Link href="/products" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '0.9rem' }}>
            <ArrowLeft size={16} /> Back to Products
          </Link>
          <h1 className="title" style={{ textAlign: 'left', margin: 0, textTransform: 'uppercase', letterSpacing: '2px' }}>
            My <span style={{ color: 'var(--primary-orange)' }}>Wishlist</span>
          </h1>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ 
            color: 'var(--primary-orange)', 
            fontWeight: 800, 
            fontSize: '1.5rem',
            textShadow: '0 0 10px var(--primary-orange-glow)'
          }}>
            {totalWishlistItems}
          </span>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Items Saved</p>
        </div>
      </div>

      {wishlist.length > 0 ? (
        <div className="grid grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          padding: '8rem 2rem', 
          background: 'var(--bg-glass)', 
          borderRadius: '12px', 
          border: '1px dashed var(--border-color)',
          textAlign: 'center'
        }}>
          <div style={{ 
            width: '80px', 
            height: '80px', 
            background: 'rgba(255, 69, 0, 0.1)', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            color: 'var(--primary-orange)',
            marginBottom: '2rem',
            boxShadow: '0 0 20px rgba(255, 69, 0, 0.1)'
          }}>
            <Heart size={40} />
          </div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Your Wishlist is Empty</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '400px', marginBottom: '2.5rem', lineHeight: '1.6' }}>
            Save items you love to your wishlist and they'll appear here. Power up your collection with ShopSphere X gear.
          </p>
          <Link href="/products" className="btn btn-primary">
            <ShoppingBag size={20} /> Start Shopping
          </Link>
        </div>
      )}
    </div>
  );
}
