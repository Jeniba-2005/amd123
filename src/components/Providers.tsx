'use client';

import { ReactNode } from 'react';
import { ToastProvider } from '@/context/ToastContext';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { SmartShopProvider } from '@/context/SmartShopContext';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <SmartShopProvider>
        <WishlistProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </WishlistProvider>
      </SmartShopProvider>
    </ToastProvider>
  );
}
