/**
 * ShopSphere X: Unified Smart Retail Engine
 * This file consolidates all data, logic, and types for the smart retail system.
 */

// --- TYPES ---

export interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    imageUrl: string;
    rating: number;
    isNew?: boolean;
}

export interface SmartProduct extends Product {
    stock: number;
    soldCount: number;
    viewCount: number;
    tags: string[];
    description: string;
}

// --- DATA ---

export const GLOBAL_PRODUCTS: SmartProduct[] = [
    { 
        id: 'e1', 
        name: 'Apex-Core GPU (AMD Edition)', 
        price: 899.99, 
        category: 'Electronics', 
        imageUrl: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=600&auto=format&fit=crop', 
        rating: 4.9, 
        isNew: true,
        stock: 12,
        soldCount: 45,
        viewCount: 1200,
        tags: ['gaming', 'high-performance', 'hardware'],
        description: 'Next-generation architecture delivering elite performance for gamers and creators.'
    },
    { 
        id: '1', 
        name: 'Quantum-X Wireless Headphones', 
        price: 299.99, 
        category: 'Electronics', 
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop', 
        rating: 4.8,
        stock: 25,
        soldCount: 89,
        viewCount: 3400,
        tags: ['audio', 'wireless', 'accessories'],
        description: 'Immersive spatial audio with industry-leading noise cancellation.'
    },
    { 
        id: 'e2', 
        name: 'Pulse-Wave Gaming Keyboard', 
        price: 149.00, 
        category: 'Electronics', 
        imageUrl: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=600&auto=format&fit=crop', 
        rating: 4.7,
        stock: 4,
        soldCount: 120,
        viewCount: 2100,
        tags: ['peripherals', 'rgb', 'gaming'],
        description: 'Mechanical precision combined with vibrant RGB patterns.'
    },
    { 
        id: '5', 
        name: 'Zen-4 Smart Fitness Band', 
        price: 59.99, 
        category: 'Electronics', 
        imageUrl: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b0?q=80&w=600&auto=format&fit=crop', 
        rating: 4.1,
        stock: 0,
        soldCount: 340,
        viewCount: 5600,
        tags: ['wearable', 'health', 'fitness'],
        description: 'Track your vitals with precision energy efficiency.'
    },
    { 
        id: '2', 
        name: 'Cyber-Knit Stealth Tee', 
        price: 34.99, 
        category: 'Clothing', 
        imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=600&auto=format&fit=crop', 
        rating: 4.5,
        stock: 50,
        soldCount: 210,
        viewCount: 4300,
        tags: ['minimalist', 'cotton', 'apparel'],
        description: 'Premium weighted cotton for ultimate comfort.'
    },
    { 
        id: 'c1', 
        name: 'X-Core Tactical Hoodie', 
        price: 79.00, 
        category: 'Clothing', 
        imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600&auto=format&fit=crop', 
        rating: 4.6, 
        isNew: true,
        stock: 15,
        soldCount: 62,
        viewCount: 1500,
        tags: ['streetwear', 'oversized', 'tactical'],
        description: 'High-density knit with water-resistant coating.'
    },
    { 
        id: '3', 
        name: 'Bio-Grain Energy Bars', 
        price: 12.99, 
        category: 'Groceries', 
        imageUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=600&auto=format&fit=crop', 
        rating: 4.2,
        stock: 100,
        soldCount: 1500,
        viewCount: 12000,
        tags: ['healthy', 'organic', 'vegan'],
        description: 'Packed with essential nutrients for long-lasting energy.'
    },
    { 
        id: '4', 
        name: 'Titanium Chrono Watch', 
        price: 450.00, 
        category: 'Accessories', 
        imageUrl: 'https://images.unsplash.com/photo-1524592094714-0f0654ece976?q=80&w=600&auto=format&fit=crop', 
        rating: 4.9,
        stock: 3,
        soldCount: 15,
        viewCount: 2500,
        tags: ['jewelry', 'timepiece', 'luxury'],
        description: 'Surgical-grade titanium body with sapphire glass.'
    }
];

// --- LOGIC ENGINE ---

export const SmartEngine = {
    /**
     * Get recommendations based on viewed categories
     */
    getRecommendations: (viewedCategories: string[], viewedIds: string[]) => {
        if (viewedCategories.length === 0) {
            return GLOBAL_PRODUCTS.sort((a, b) => b.soldCount - a.soldCount).slice(0, 4);
        }
        
        const viewedSet = new Set(viewedIds);
        return GLOBAL_PRODUCTS
            .filter(p => viewedCategories.includes(p.category) && !viewedSet.has(p.id))
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 4);
    },

    /**
     * Fuzzy search logic with typo tolerance simulation
     */
    search: (query: string) => {
        if (!query.trim()) return [];
        const lower = query.toLowerCase();
        return GLOBAL_PRODUCTS.filter(p => 
            p.name.toLowerCase().includes(lower) || 
            p.tags.some(t => t.toLowerCase().includes(lower)) ||
            p.category.toLowerCase().includes(lower)
        ).slice(0, 5);
    },

    /**
     * Stock status determination
     */
    getStockStatus: (productId: string): 'In Stock' | 'Low Stock' | 'Out of Stock' => {
        const product = GLOBAL_PRODUCTS.find(p => p.id === productId);
        if (!product || product.stock <= 0) return 'Out of Stock';
        if (product.stock < 5) return 'Low Stock';
        return 'In Stock';
    },

    /**
     * Automated discount and tax calculations
     */
    calculateTotals: (cartItems: { price: number, quantity: number }[]) => {
        const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const threshold = 2000;
        const discount = subtotal >= threshold ? subtotal * 0.1 : 0;
        const tax = (subtotal - discount) * 0.08;
        return {
            subtotal,
            discount,
            tax,
            total: subtotal - discount + tax + (subtotal > 0 ? 10 : 0), // Includes flat shipping
            isNearThreshold: !discount && subtotal >= threshold * 0.9
        };
    },

    /**
     * Analytics Generator
     */
    getAnalytics: () => {
        const revenue = GLOBAL_PRODUCTS.reduce((acc, p) => acc + (p.price * p.soldCount), 0);
        const sales = GLOBAL_PRODUCTS.reduce((acc, p) => acc + p.soldCount, 0);
        const lowStock = GLOBAL_PRODUCTS.filter(p => p.stock < 5 && p.stock > 0);
        const topSellers = [...GLOBAL_PRODUCTS].sort((a, b) => b.soldCount - a.soldCount).slice(0, 3);
        
        return {
            revenue,
            sales,
            lowStock,
            topSellers
        };
    },

    /**
     * Chat Processor: Natural Language Query Handler
     */
    processChatQuery: (query: string, cartItems: any[] = [], history: any[] = []) => {
        const lower = query.toLowerCase();
        
        // 1. Personalized Greeting/Context
        if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
            const historyCount = history.length;
            const greeting = historyCount > 0 
                ? `Welcome back, John. I see you've recently explored ${history[0].name}. Would you like to continue that mission?`
                : "Protocol Initialized. I'm Sphere-AI. How can I assist with your shopping mission today?";
            return { text: greeting, type: 'default' };
        }

        // 2. Intent: History / Suggestions based on browsing
        if (lower.includes('suggest') || lower.includes('recommend') || lower.includes('for me')) {
            if (history.length > 0) {
                const targetCategory = history[0].category;
                const recs = GLOBAL_PRODUCTS.filter(p => p.category === targetCategory && !history.some(h => h.id === p.id)).slice(0, 3);
                if (recs.length > 0) {
                    return {
                        text: `Based on your interest in ${targetCategory}, I've calibrated these high-priority items:`,
                        products: recs,
                        type: 'results'
                    };
                }
            }
            // Fallback to top rated
            const gifts = [...GLOBAL_PRODUCTS].sort((a, b) => b.rating - a.rating).slice(0, 3);
            return {
                text: "Calibrating personalized suggestions based on global trends... These are currently top-tier:",
                products: gifts,
                type: 'results'
            };
        }

        // 3. FAQ Contexts
        if (lower.includes('delivery') || lower.includes('shipping')) {
            return {
                text: "All orbital shipments are handled via Hyper-Logistics. Standard delivery (2-3 days) is automated. Orders >$2k qualify for Quantum Express.",
                type: 'faq'
            };
        }
        if (lower.includes('return') || lower.includes('refund')) {
            return {
                text: "Our Return Protocol allows for 30-day hardware exchanges. Seals must remain intact for full credit.",
                type: 'faq'
            };
        }

        // 4. Price-based queries
        const priceMatch = lower.match(/(?:under|below|less than)\s*(\d+)/);
        if (priceMatch) {
            const limit = parseInt(priceMatch[1]);
            const suggestions = GLOBAL_PRODUCTS.filter(p => p.price <= limit).slice(0, 3);
            if (suggestions.length > 0) {
                return {
                    text: `Found ${suggestions.length} units matching your thermal budget (<$${limit}):`,
                    products: suggestions,
                    type: 'results'
                };
            }
        }

        // 5. Category/Search queries
        const searchResults = SmartEngine.search(query);
        if (searchResults.length > 0) {
            return {
                text: `Thermal scan complete for "${query}". Matching signatures found:`,
                products: searchResults.slice(0, 3),
                type: 'results'
            };
        }

        // 6. Default Response
        return {
            text: "Interference detected. I couldn't find a direct protocol match. Try asking about 'GPU shipping', 'returns', or 'Gifts < $100'.",
            type: 'default'
        };
    }
};
