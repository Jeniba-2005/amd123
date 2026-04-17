'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogIn } from 'lucide-react';
import styles from '../auth.module.css';
import { useToast } from '@/context/ToastContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { showToast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock Login Logic
    setTimeout(() => {
      setIsLoading(false);
      showToast('Successfully logged in!', 'success');
      router.push('/'); 
    }, 1000);
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authWrapper}>
        <h1 className={styles.title}>Welcome Back</h1>
        <p className={styles.subtitle}>Enter your credentials to access your account</p>

        <form className={styles.form} onSubmit={handleLogin}>
          <div className={styles.inputGroup}>
             <label className={styles.label}>Email Address</label>
             <input 
               type="email" 
               className={styles.input} 
               placeholder="you@example.com" 
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               required
             />
          </div>
          <div className={styles.inputGroup}>
             <label className={styles.label}>Password</label>
             <input 
               type="password" 
               className={styles.input} 
               placeholder="••••••••" 
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               required
             />
          </div>

          <button type="submit" className={`btn btn-primary ${styles.submitBtn}`} disabled={isLoading}>
            {isLoading ? 'Signing In...' : <><LogIn size={20} /> Sign In</>}
          </button>
        </form>

        <div className={styles.footer}>
          Don't have an account? <Link href="/register" className={styles.link}>Register here</Link>
        </div>
      </div>
    </div>
  );
}
