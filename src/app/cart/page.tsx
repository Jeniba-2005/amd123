'use client';

import Link from 'next/link';
import { ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import styles from './page.module.css';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();

  const SHIPPING_FEE = items.length > 0 ? 10.00 : 0;
  const TAX_RATE = 0.08;
  const taxes = totalPrice * TAX_RATE;
  const finalTotal = totalPrice + SHIPPING_FEE + taxes;

  if (items.length === 0) {
    return (
      <div className={`container ${styles.cartContainer}`}>
        <div className={styles.emptyState}>
          <ShoppingBag size={64} color="var(--text-secondary)" style={{ margin: '0 auto' }} />
          <h2>Your cart is currently empty</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            Before proceed to checkout you must add some products to your shopping cart.
          </p>
          <Link href="/products" className="btn btn-primary">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`container ${styles.cartContainer}`}>
      <h1 className="title" style={{ textAlign: 'left' }}>Shopping Cart</h1>
      
      <div className={styles.cartGrid}>
        <div className={styles.cartItems}>
          {items.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <img src={item.imageUrl} alt={item.name} className={styles.itemImage} />
              
              <div className={styles.itemInfo}>
                <div className={styles.itemCategory}>{item.category}</div>
                <h3 className={styles.itemTitle}>
                  <Link href={`/products/${item.id}`}>{item.name}</Link>
                </h3>
                <div className={styles.itemPrice}>${item.price.toFixed(2)}</div>
                
                <div className={styles.quantityControl} style={{ marginTop: 'auto' }}>
                  <button 
                    className={styles.qtyBtn} 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >-</button>
                  <span className={styles.qtyValue}>{item.quantity}</span>
                  <button 
                    className={styles.qtyBtn} 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >+</button>
                </div>
              </div>

              <button 
                className={styles.removeBtn} 
                onClick={() => removeFromCart(item.id)}
                aria-label="Remove item"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>

        <div className={styles.summary}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Order Summary</h2>
          
          <div className={styles.summaryRow}>
            <span>Subtotal</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Shipping</span>
            <span>${SHIPPING_FEE.toFixed(2)}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Taxes (8%)</span>
            <span>${taxes.toFixed(2)}</span>
          </div>
          
          <div className={`${styles.summaryRow} ${styles.total}`}>
            <span>Total</span>
            <span>${finalTotal.toFixed(2)}</span>
          </div>

          <Link href="/checkout" className={`btn btn-primary ${styles.checkoutBtn}`}>
            Proceed to Checkout <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
}
