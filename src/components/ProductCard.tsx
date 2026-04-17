'use client';

import Link from 'next/link';
import { Star, Heart, ShoppingBag } from 'lucide-react';
import styles from './ProductCard.module.css';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { useWishlist } from '@/context/WishlistContext';
import { useSmartShop } from '@/context/SmartShopContext';
import { Product, SmartProduct } from '@/lib/SmartRetailEngine';

export default function ProductCard({ product }: { product: Product | SmartProduct }) {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { getStockStatus, addToHistory } = useSmartShop();

  const isWishlisted = isInWishlist(product.id);
  const stockStatus = getStockStatus(product.id);

  const getStockClass = () => {
    if (stockStatus === 'In Stock') return styles.inStock;
    if (stockStatus === 'Low Stock') return styles.lowStock;
    return styles.outOfStock;
  };

  const handleProductClick = () => {
    // If it's a smart product or we find it in the list (most are in the list)
    // We treat all products as smart products for history tracking
    addToHistory(product as SmartProduct);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isWishlisted) {
      removeFromWishlist(product.id);
      showToast('Removed from wishlist', 'success');
    } else {
      addToWishlist(product);
      showToast('Added to wishlist', 'success');
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <Link href={`/products/${product.id}`} className={styles.card} onClick={handleProductClick}>
      <div className={styles.imageContainer}>
        {product.isNew && <span className={styles.tag}>NEW</span>}
        <div className={`${styles.stockBadge} ${getStockClass()}`}>
          {stockStatus}
        </div>
        <button 
          className={`${styles.wishlistBtn} ${isWishlisted ? styles.active : ''}`}
          onClick={handleWishlist}
          aria-label="Add to wishlist"
        >
          <Heart size={18} fill={isWishlisted ? 'var(--error-color)' : 'none'} />
        </button>
        {/* We use standard img for simplicity without configuring Next Image domains for now */}
        <img 
          src={product.imageUrl || 'https://via.placeholder.com/400x300'} 
          alt={product.name} 
          className={styles.image}
        />
      </div>
      
      <div className={styles.content}>
        <span className={styles.category}>{product.category}</span>
        <h3 className={styles.title}>{product.name}</h3>
        
        <div className={styles.rating}>
          <Star size={16} fill="#ffc107" />
          <span style={{ fontWeight: 600 }}>{product.rating.toFixed(1)}</span>
          <span className={styles.ratingCount}>(120)</span>
        </div>
        
        <div className={styles.footer}>
          <span className={styles.price}>${product.price.toFixed(2)}</span>
          <button 
            className={styles.addBtn}
            onClick={handleAddToCart}
            aria-label="Add to cart"
          >
            <ShoppingBag size={20} />
          </button>
        </div>
      </div>
    </Link>
  );
}
