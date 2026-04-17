'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { useToast } from './ToastContext';
import { Product, SmartEngine } from '@/lib/SmartRetailEngine';

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  discount: number;
  discountThreshold: number;
  isNearThreshold: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [totals, setTotals] = useState({ total: 0, discount: 0, isNearThreshold: false });
  const { showToast } = useToast();

  useEffect(() => {
    const savedCart = localStorage.getItem('shopsphere_cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart JSON');
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('shopsphere_cart', JSON.stringify(items));
    
    // Sync with backend API for total calculations
    const syncCart = async () => {
      try {
          const response = await fetch('/api/cart', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ items })
          });
          const data = await response.json();
          if (data.success) {
              setTotals({ total: data.total, discount: data.discount, isNearThreshold: data.isNearThreshold });
          }
      } catch (err) {
          console.error("Cart sync failed", err);
      }
    };
    
    syncCart();
  }, [items]);

  const addToCart = useCallback((product: Product) => {
    setItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        showToast(`Increased amount of ${product.name} in cart`, 'success');
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      showToast(`Added ${product.name} to cart`, 'success');
      return [...prev, { ...product, quantity: 1 }];
    });
  }, [showToast]);

  const removeFromCart = useCallback((productId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const { total: totalPrice, discount, isNearThreshold } = totals;

  return (
    <CartContext.Provider
      value={{ 
        items, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart, 
        totalItems, 
        totalPrice,
        discount,
        discountThreshold: 2000,
        isNearThreshold
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
