'use client';

import { useState, useEffect, useMemo } from 'react';
import { Star, Truck, Shield, RotateCcw, Heart, Zap, PackageSearch } from 'lucide-react';
import styles from './page.module.css';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { SmartProduct, SmartEngine } from '@/lib/SmartRetailEngine';
import { useSmartShop } from '@/context/SmartShopContext';
import { useWishlist } from '@/context/WishlistContext';
import ProductCard from '@/components/ProductCard';

export default function ProductDetail({ params }: { params: { id: string } }) {
  const { id } = params;
  const [product, setProduct] = useState<SmartProduct | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const { addToHistory, getStockStatus } = useSmartShop();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products?query=${id}`);
        const data = await response.json();
        const found = data.find((p: any) => p.id === id);
        setProduct(found || null);
      } catch (error) {
        console.error("Failed to fetch product", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const [activeImage, setActiveImage] = useState('');
  
  useEffect(() => {
    if (product) {
      setActiveImage(product.imageUrl);
      addToHistory(product);
    }
  }, [product, addToHistory]);

  const [frequentlyBoughtWith, setFrequentlyBoughtWith] = useState<SmartProduct[]>([]);

  useEffect(() => {
    if (product) {
      fetch(`/api/products?category=${product.category}`)
        .then(res => res.json())
        .then(data => {
            setFrequentlyBoughtWith(data.filter((p: any) => p.id !== product.id).slice(0, 3));
        });
    }
  }, [product]);

  if (loading) return <div className="container" style={{ padding: '10rem', textAlign: 'center' }}>Loading Signal...</div>;
  if (!product) return <div className="container" style={{ padding: '10rem', textAlign: 'center' }}>Signal Lost. Product not found.</div>;

  const isWishlisted = isInWishlist(product.id);
  const stockStatus = getStockStatus(product.id);

  const handleAddToCart = () => {
    if (product.stock <= 0) {
      showToast('Item is out of stock', 'error');
      return;
    }
    addToCart(product);
  };

  const handleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
      showToast('Removed from wishlist', 'success');
    } else {
      addToWishlist(product);
      showToast('Added to wishlist', 'success');
    }
  };

  return (
    <div className={`container ${styles.detailContainer}`}>
      <div className={styles.productWrapper}>
        
        {/* Images Side */}
        <div className={styles.imageGallery}>
          <img src={activeImage} alt={product.name} className={styles.mainImage} />
        </div>

        {/* Info Side */}
        <div className={styles.info}>
          <div className={styles.category}>{product.category}</div>
          <h1 className={styles.title}>{product.name}</h1>
          
          <div className={styles.rating}>
             {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} fill={i < Math.floor(product.rating) ? '#ffc107' : 'none'} color="#ffc107" />
             ))}
             <span style={{ fontWeight: 'bold', marginLeft: '0.5rem' }}>{product.rating}</span>
             <span style={{ color: 'var(--text-secondary)' }}>({product.viewCount} views)</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div className={styles.price}>${product.price.toFixed(2)}</div>
            <span style={{ 
              padding: '0.3rem 0.6rem', 
              background: stockStatus === 'Out of Stock' ? 'rgba(255,0,0,0.1)' : 'rgba(0,255,102,0.1)',
              color: stockStatus === 'Out of Stock' ? 'var(--error-color)' : 'var(--success-color)',
              borderRadius: '4px',
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              border: '1px solid currentColor'
            }}>
              {stockStatus}
            </span>
          </div>
          
          <p className={styles.description}>
            {product.description}
          </p>

          <div className={styles.actions}>
            <div className={styles.quantitySelector}>
              <button className={styles.qtyBtn} onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
              <span className={styles.qtyValue}>{quantity}</span>
              <button className={styles.qtyBtn} onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
            
            <button 
              className={`btn btn-primary ${styles.addBtn}`} 
              onClick={handleAddToCart}
              disabled={stockStatus === 'Out of Stock'}
            >
              Add to Cart
            </button>
          </div>

          <button 
            className="btn btn-secondary" 
            style={{ width: '100%', display: 'flex', gap: '0.5rem', marginTop: '1rem' }}
            onClick={handleWishlist}
          >
            <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
            {isWishlisted ? 'Saved to Wishlist' : 'Add to Wishlist'}
          </button>

          <div className={styles.features}>
            <div className={styles.featureItem}><Truck size={20} color="var(--primary-orange)" /> Logistics Node: Express</div>
            <div className={styles.featureItem}><Shield size={20} color="var(--primary-orange)" /> Secure Handshake</div>
            <div className={styles.featureItem}><RotateCcw size={20} color="var(--primary-orange)" /> Protocol: Returnable</div>
          </div>
        </div>
      </div>

      {/* Frequently Bought Together */}
      <div style={{ marginTop: '6rem' }}>
        <h2 className="title" style={{ textAlign: 'left', marginBottom: '3rem', fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Zap size={24} color="var(--primary-orange)" />
          Frequently Bought Together
        </h2>
        <div className="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {frequentlyBoughtWith.map(item => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
