'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { UserPlus } from 'lucide-react';
import styles from '../auth.module.css';
import { useToast } from '@/context/ToastContext';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();
  const { showToast } = useToast();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock Registration Logic
    setTimeout(() => {
      setIsLoading(false);
      showToast('Registration successful! Welcome to ShopSphere.', 'success');
      router.push('/login'); 
    }, 1000);
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authWrapper}>
        <h1 className={styles.title}>Create Account</h1>
        <p className={styles.subtitle}>Join ShopSphere for smart shopping</p>

        <form className={styles.form} onSubmit={handleRegister}>
          <div className={styles.inputGroup}>
             <label className={styles.label}>Full Name</label>
             <input 
               type="text" 
               className={styles.input} 
               placeholder="John Doe" 
               value={name}
               onChange={(e) => setName(e.target.value)}
               required
             />
          </div>
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
               minLength={6}
               required
             />
          </div>

          <button type="submit" className={`btn btn-primary ${styles.submitBtn}`} disabled={isLoading}>
            {isLoading ? 'Creating Account...' : <><UserPlus size={20} /> Register</>}
          </button>
        </form>

        <div className={styles.footer}>
          Already have an account? <Link href="/login" className={styles.link}>Sign in here</Link>
        </div>
      </div>
    </div>
  );
}
