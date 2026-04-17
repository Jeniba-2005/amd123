import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div>
            <h3 className={styles.heading}>ShopSphere 🛍️</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Your ultimate destination for modern, smart, and premium shopping experiences.
            </p>
          </div>
          
          <div>
            <h3 className={styles.heading}>Categories</h3>
            <ul className={styles.list}>
              <li><Link href="/products?category=Clothing" className={styles.link}>Clothing</Link></li>
              <li><Link href="/products?category=Electronics" className={styles.link}>Electronics</Link></li>
              <li><Link href="/products?category=Groceries" className={styles.link}>Groceries</Link></li>
              <li><Link href="/products?category=Accessories" className={styles.link}>Accessories</Link></li>
            </ul>
          </div>

          <div>
            <h3 className={styles.heading}>Customer Support</h3>
            <ul className={styles.list}>
              <li><Link href="/faq" className={styles.link}>FAQ</Link></li>
              <li><Link href="/returns" className={styles.link}>Returns & Exchanges</Link></li>
              <li><Link href="/shipping" className={styles.link}>Shipping Info</Link></li>
              <li><Link href="/contact" className={styles.link}>Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className={styles.heading}>Company</h3>
            <ul className={styles.list}>
              <li><Link href="/about" className={styles.link}>About Us</Link></li>
              <li><Link href="/careers" className={styles.link}>Careers</Link></li>
              <li><Link href="/privacy" className={styles.link}>Privacy Policy</Link></li>
              <li><Link href="/terms" className={styles.link}>Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} ShopSphere. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
