'use client';

import Link from 'next/link';
import { ShoppingBag, Laptop, Apple, Watch, ArrowRight, Sparkles, History } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import styles from './page.module.css';
import { useSmartShop } from '@/context/SmartShopContext';

export default function Home() {
  const { recommendations, recentlyViewed } = useSmartShop();

  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.particleContainer}>
          {[...Array(12)].map((_, i) => (
             <div key={i} className={styles.particle}></div>
          ))}
        </div>
        
        <div className={`container ${styles.heroContent} animate-fade-in`}>
          <h1 className={styles.heroTitle}>
            Power Your <span className={styles.highlight}>Shopping</span> Experience
          </h1>
          <p className={styles.heroSubtitle}>
            Discover a world of premium products with intelligent recommendations tailored just for you. 
            Experience the future of retail with ShopSphere X.
          </p>
          <div className={styles.heroActions}>
            <Link href="/products" className="btn btn-primary">
              Shop Now <ArrowRight size={20} />
            </Link>
            <Link href="#categories" className="btn btn-secondary">
              Explore
            </Link>
          </div>
        </div>
      </section>

      {/* Recently Viewed / Continue Shopping */}
      {recentlyViewed.length > 0 && (
        <section className={styles.section} style={{ paddingBottom: 0 }}>
          <div className="container">
            <h2 className="title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '3rem' }}>
              <History size={28} color="var(--primary-orange)" />
              Continue Your Journey
            </h2>
            <div className="grid grid-cols-4 sm:grid-cols-1 md:grid-cols-2">
              {recentlyViewed.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recommended For You Section - AI Based */}
      <section className={styles.section}>
        <div className="container">
          <h2 className="title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
            <Sparkles size={32} color="var(--primary-orange)" style={{ filter: 'drop-shadow(0 0 10px #ff4500)' }} />
            Precision Recommendations
          </h2>
          <div className="grid grid-cols-4 sm:grid-cols-1 md:grid-cols-2" style={{ marginTop: '4rem' }}>
            {recommendations.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className={`${styles.section} ${styles.sectionBg}`}>
        <div className="container">
          <h2 className="title">Shop by Category</h2>
          <div className={styles.gridCards}>
            <Link href="/products?category=Clothing" className={styles.categoryCard}>
              <div className={styles.iconWrapper}><ShoppingBag size={48} strokeWidth={1.5} /></div>
              <h3 className={styles.categoryTitle}>Clothing</h3>
            </Link>
            <Link href="/products?category=Electronics" className={styles.categoryCard}>
              <div className={styles.iconWrapper}><Laptop size={48} strokeWidth={1.5} /></div>
              <h3 className={styles.categoryTitle}>Electronics</h3>
            </Link>
            <Link href="/products?category=Groceries" className={styles.categoryCard}>
              <div className={styles.iconWrapper}><Apple size={48} strokeWidth={1.5} /></div>
              <h3 className={styles.categoryTitle}>Groceries</h3>
            </Link>
            <Link href="/products?category=Accessories" className={styles.categoryCard}>
              <div className={styles.iconWrapper}><Watch size={48} strokeWidth={1.5} /></div>
              <h3 className={styles.categoryTitle}>Accessories</h3>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
