'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Banknote, CreditCard, Smartphone, CheckCircle } from 'lucide-react';
import styles from './page.module.css';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';

export default function CheckoutPage() {
  const { items, totalPrice, discount, isNearThreshold, discountThreshold, clearCart } = useCart();
  const { showToast } = useToast();
  const router = useRouter();
  
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const SHIPPING_FEE = items.length > 0 ? 10.00 : 0;
  const TAX_RATE = 0.08;
  const taxes = totalPrice * TAX_RATE;
  const finalTotal = totalPrice + SHIPPING_FEE + taxes;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      showToast('Your cart is empty', 'error');
      return;
    }

    setIsSubmitting(true);
    
    // Automation: Simulate inventory processing and stock decrement
    setTimeout(() => {
      setIsSubmitting(false);
      showToast('Payment Verified. Stock updated in real-time.', 'success');
      
      // Secondary automation: Shifting status
      setTimeout(() => {
        showToast('Precision Logic: Order moved to SHIPPED status.', 'success');
      }, 2000);

      clearCart();
      router.push('/profile'); 
    }, 1500);
  };

  if (items.length === 0 && !isSubmitting) {
    return (
      <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
         <h1 className="title">Checkout</h1>
         <p>You have no items to checkout. Please add items to your cart first.</p>
      </div>
    );
  }

  return (
    <div className={`container ${styles.checkoutContainer}`}>
      <h1 className="title" style={{ textAlign: 'left' }}>Checkout</h1>
      
      <div className={styles.checkoutLayout}>
        <form onSubmit={handleCheckout}>
          <div className={styles.formSection}>
            <h2 className={styles.sectionTitle}>Shipping Address</h2>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.label}>First Name</label>
                <input required className={styles.input} type="text" placeholder="John" />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Last Name</label>
                <input required className={styles.input} type="text" placeholder="Doe" />
              </div>
              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>Email Address</label>
                <input required className={styles.input} type="email" placeholder="john@example.com" />
              </div>
              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>Address</label>
                <input required className={styles.input} type="text" placeholder="123 Main St" />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>City</label>
                <input required className={styles.input} type="text" placeholder="New York" />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Postal Code</label>
                <input required className={styles.input} type="text" placeholder="10001" />
              </div>
            </div>
          </div>

          <div className={styles.formSection}>
            <h2 className={styles.sectionTitle}>Payment Method</h2>
            <div className={styles.paymentOptions}>
              <label className={`${styles.paymentOption} ${paymentMethod === 'card' ? styles.active : ''}`}>
                <input 
                  type="radio" 
                  name="payment" 
                  value="card" 
                  checked={paymentMethod === 'card'} 
                  onChange={() => setPaymentMethod('card')}
                  style={{ display: 'none' }} 
                />
                <CreditCard size={24} color={paymentMethod === 'card' ? 'var(--primary-purple)' : 'var(--text-secondary)'} />
                <span style={{ fontWeight: 500, color: paymentMethod === 'card' ? 'var(--primary-purple)' : 'inherit' }}>Credit / Debit Card</span>
              </label>

              <label className={`${styles.paymentOption} ${paymentMethod === 'upi' ? styles.active : ''}`}>
                <input 
                  type="radio" 
                  name="payment" 
                  value="upi" 
                  checked={paymentMethod === 'upi'} 
                  onChange={() => setPaymentMethod('upi')}
                  style={{ display: 'none' }} 
                />
                <Smartphone size={24} color={paymentMethod === 'upi' ? 'var(--primary-purple)' : 'var(--text-secondary)'} />
                <span style={{ fontWeight: 500, color: paymentMethod === 'upi' ? 'var(--primary-purple)' : 'inherit' }}>UPI</span>
              </label>

              <label className={`${styles.paymentOption} ${paymentMethod === 'cod' ? styles.active : ''}`}>
                <input 
                  type="radio" 
                  name="payment" 
                  value="cod" 
                  checked={paymentMethod === 'cod'} 
                  onChange={() => setPaymentMethod('cod')}
                  style={{ display: 'none' }} 
                />
                <Banknote size={24} color={paymentMethod === 'cod' ? 'var(--primary-purple)' : 'var(--text-secondary)'} />
                <span style={{ fontWeight: 500, color: paymentMethod === 'cod' ? 'var(--primary-purple)' : 'inherit' }}>Cash on Delivery</span>
              </label>
            </div>
          </div>

          <button type="submit" className={`btn btn-primary ${styles.submitBtn}`} disabled={isSubmitting}>
            {isSubmitting ? 'Processing...' : `Pay $${finalTotal.toFixed(2)}`}
          </button>
        </form>

        <div className={styles.orderSummary}>
          <h2 className={styles.sectionTitle}>Order Summary</h2>
          <div style={{ marginBottom: '1.5rem', maxHeight: '300px', overflowY: 'auto' }}>
            {items.map(item => (
              <div key={item.id} className={styles.summaryItem}>
                <img src={item.imageUrl} alt={item.name} className={styles.summaryImage} />
                <div className={styles.summaryDetails}>
                  <div className={styles.summaryTitle}>{item.name}</div>
                  <div className={styles.summaryQty}>Qty: {item.quantity}</div>
                </div>
                <div className={styles.summaryPrice}>${(item.price * item.quantity).toFixed(2)}</div>
              </div>
            ))}
          </div>

          <div className={styles.totals}>
            <div className={styles.totalRow}>
              <span>Gross Total</span>
              <span>${(totalPrice + (discount || 0)).toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className={styles.totalRow} style={{ color: 'var(--success-color)' }}>
                <span>Precision Discount (10%)</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
            )}
            {isNearThreshold && (
              <div style={{ 
                padding: '0.75rem', 
                background: 'rgba(255, 69, 0, 0.1)', 
                border: '1px solid var(--primary-orange)', 
                borderRadius: '4px',
                fontSize: '0.8rem',
                color: 'var(--primary-orange)',
                marginBottom: '1rem'
              }}>
                <strong>Intelligence Alert:</strong> You're within 10% of our $2,000 elite discount threshold! Add more gear to save 10% on your entire order.
              </div>
            )}
            <div className={styles.totalRow}>
              <span>Logistics (Shipping)</span>
              <span>${SHIPPING_FEE.toFixed(2)}</span>
            </div>
            <div className={styles.totalRow}>
              <span>System Tax</span>
              <span>${taxes.toFixed(2)}</span>
            </div>
            <div className={`${styles.totalRow} ${styles.final}`}>
              <span style={{ color: 'var(--primary-orange)' }}>Net Payable</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
