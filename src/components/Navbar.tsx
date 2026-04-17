'use client';

import Link from 'next/link';
import { ShoppingCart, Heart, User, LogIn, Flame, Search } from 'lucide-react';
import styles from './Navbar.module.css';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useSmartShop } from '@/context/SmartShopContext';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { totalItems } = useCart();
  const { totalWishlistItems } = useWishlist();
  const { getSuggestions } = useSmartShop();
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  const isAuthenticated = false;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length > 0) {
      try {
        const response = await fetch(`/api/products?query=${encodeURIComponent(query)}`);
        const results = await response.json();
        setSuggestions(results);
        setShowSuggestions(true);
      } catch (err) {
        console.error("Search fetch failed", err);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (productId: string) => {
    setShowSuggestions(false);
    setSearchQuery('');
    router.push(`/products/${productId}`);
  };

  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.navbar}`} style={{ borderBottom: 'none', background: 'transparent', padding: 0 }}>
        <Link href="/" className={styles.logo}>
          <Flame className={styles.logoIcon} size={28} /> ShopSphere X
        </Link>

        {/* Smart Search Bar */}
        <div className={styles.searchContainer} ref={searchRef}>
          <input 
            type="text" 
            placeholder="Search precision hardware..." 
            className={styles.searchInput}
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => searchQuery.length > 0 && setShowSuggestions(true)}
          />
          <Search className={styles.searchIcon} size={18} />
          
          {showSuggestions && suggestions.length > 0 && (
            <div className={styles.suggestions}>
              {suggestions.map((product) => (
                <div 
                  key={product.id} 
                  className={styles.suggestionItem}
                  onClick={() => handleSuggestionClick(product.id)}
                >
                  <img src={product.imageUrl} alt={product.name} className={styles.suggestionImage} />
                  <div className={styles.suggestionInfo}>
                    <h4>{product.name}</h4>
                    <span>${product.price.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <ul className={styles.navLinks}>
          <li><Link href="/products?category=Clothing" className={styles.link}>Clothing</Link></li>
          <li><Link href="/products?category=Electronics" className={styles.link}>Electronics</Link></li>
          <li><Link href="/products?category=Groceries" className={styles.link}>Groceries</Link></li>
          <li><Link href="/products?category=Accessories" className={styles.link}>Accessories</Link></li>
        </ul>

        <div className={styles.actions}>
          <Link href="/wishlist" className={styles.iconBtn} aria-label="Wishlist">
            <Heart size={24} />
            {totalWishlistItems > 0 && (
              <span className={styles.badge}>{totalWishlistItems}</span>
            )}
          </Link>
          
          <Link href="/cart" className={styles.iconBtn} aria-label="Cart">
            <ShoppingCart size={24} />
            {totalItems > 0 && (
              <span className={styles.badge}>{totalItems}</span>
            )}
          </Link>

          {isAuthenticated ? (
            <Link href="/profile" className={styles.iconBtn} aria-label="Profile">
              <User size={24} />
            </Link>
          ) : (
            <Link href="/login" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
              <LogIn size={18} />
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
