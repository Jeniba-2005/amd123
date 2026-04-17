'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { GLOBAL_PRODUCTS, SmartProduct, SmartEngine } from '@/lib/SmartRetailEngine';

interface SmartShopContextType {
  recentlyViewed: SmartProduct[];
  recommendations: SmartProduct[];
  addToHistory: (product: SmartProduct) => void;
  getSuggestions: (query: string) => SmartProduct[];
  getStockStatus: (productId: string) => string;
  inventoryAlerts: string[];
}

const SmartShopContext = createContext<SmartShopContextType | undefined>(undefined);

export const SmartShopProvider = ({ children }: { children: ReactNode }) => {
  const [allProducts, setAllProducts] = useState<SmartProduct[]>([]);
  const [historyIds, setHistoryIds] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<SmartProduct[]>([]);
  
  // Load History from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem('shopsphere_history');
    if (saved) {
      try {
        setHistoryIds(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load history');
      }
    }
    
    // Initial fetch for all products to populate the context
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setAllProducts(data))
      .catch(err => console.error("Failed to fetch products", err));
  }, []);

  useEffect(() => {
    localStorage.setItem('shopsphere_history', JSON.stringify(historyIds));
  }, [historyIds]);

  // Fetch Recommendations from API when history changes
  useEffect(() => {
    const fetchRecs = async () => {
        const viewed = historyIds
            .map(id => allProducts.find(p => p.id === id))
            .filter((p): p is SmartProduct => !!p);
            
        const categories = Array.from(new Set(viewed.map(p => p.category)));
        
        try {
            const resp = await fetch('/api/smart-retail', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    action: 'recommendations', 
                    payload: {
                        ids: historyIds, 
                        categories: categories 
                    }
                })
            });
            const data = await resp.json();
            setRecommendations(data);
        } catch (err) {
            console.error("Failed to fetch recommendations", err);
        }
    };

    if (allProducts.length > 0) {
        fetchRecs();
    }
  }, [historyIds, allProducts]);

  const addToHistory = (product: SmartProduct) => {
    setHistoryIds(prev => {
      const filtered = prev.filter(id => id !== product.id);
      return [product.id, ...filtered].slice(0, 10);
    });
  };

  const recentlyViewed = useMemo(() => {
    return historyIds
      .map(id => allProducts.find(p => p.id === id))
      .filter((p): p is SmartProduct => !!p);
  }, [historyIds, allProducts]);

  return (
    <SmartShopContext.Provider value={{ 
      recentlyViewed, 
      recommendations, 
      addToHistory, 
      getSuggestions: SmartEngine.search, 
      getStockStatus: SmartEngine.getStockStatus,
      inventoryAlerts: SmartEngine.getAnalytics().lowStock.map(p => `Alert: ${p.name} at ${p.stock}`)
    }}>
      {children}
    </SmartShopContext.Provider>
  );
};

export const useSmartShop = () => {
  const context = useContext(SmartShopContext);
  if (!context) throw new Error('useSmartShop must be used within a SmartShopProvider');
  return context;
};
