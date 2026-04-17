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

// --- DATA: 25+ High-Performance Products ---

export const GLOBAL_PRODUCTS: SmartProduct[] = [
    // --- ELECTRONICS ---
    { 
        id: 'e1', 
        name: 'Apex-Core GPU (AMD Edition)', 
        price: 899.99, 
        category: 'Electronics', 
        imageUrl: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=600&auto=format&fit=crop', 
        rating: 4.9, 
        isNew: true,
        stock: 12,
        soldCount: 450,
        viewCount: 12000,
        tags: ['gaming', 'gpu', 'hardware', 'amd'],
        description: 'Next-generation architecture delivering elite performance for gamers and creators.'
    },
    { 
        id: 'e2', 
        name: 'Quantum-X Wireless Headphones', 
        price: 299.99, 
        category: 'Electronics', 
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop', 
        rating: 4.8,
        stock: 25,
        soldCount: 890,
        viewCount: 34000,
        tags: ['audio', 'wireless', 'headphones', 'music'],
        description: 'Immersive spatial audio with industry-leading noise cancellation.'
    },
    { 
        id: 'e3', 
        name: 'Triton 4K Gaming Monitor', 
        price: 549.00, 
        category: 'Electronics', 
        imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=600&auto=format&fit=crop', 
        rating: 4.7,
        stock: 8,
        soldCount: 120,
        viewCount: 4500,
        tags: ['monitor', 'gaming', '4k', 'display'],
        description: 'Ultra-fast 144Hz refresh rate with HDR600 certification.'
    },
    { 
        id: 'e4', 
        name: 'Mechanical X-Pro Keyboard', 
        price: 129.99, 
        category: 'Electronics', 
        imageUrl: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=600&auto=format&fit=crop', 
        rating: 4.6,
        stock: 30,
        soldCount: 450,
        viewCount: 8000,
        tags: ['keyboard', 'rgb', 'gaming', 'pc'],
        description: 'Tactile mechanical switches with customizable RGB lighting.'
    },
    { 
        id: 'e5', 
        name: 'Hyper-Light Gaming Mouse', 
        price: 79.00, 
        category: 'Electronics', 
        imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=600&auto=format&fit=crop', 
        rating: 4.8,
        stock: 45,
        soldCount: 1200,
        viewCount: 15000,
        tags: ['mouse', 'gaming', 'peripheral'],
        description: 'Ultra-lightweight design with 20K DPI optical sensor.'
    },

    // --- CLOTHING ---
    { 
        id: 'c1', 
        name: 'Nano-Tech Sneakers', 
        price: 189.00, 
        category: 'Clothing', 
        imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop', 
        rating: 4.9, 
        isNew: true,
        stock: 22,
        soldCount: 156,
        viewCount: 3800,
        tags: ['shoes', 'sneakers', 'footwear', 'running'],
        description: 'Self-lacing adaptive mesh for maximum kinetic energy return.'
    },
    { 
        id: 'c2', 
        name: 'Cyber-Knit Stealth Tee', 
        price: 34.99, 
        category: 'Clothing', 
        imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=600&auto=format&fit=crop', 
        rating: 4.5,
        stock: 50,
        soldCount: 210,
        viewCount: 4300,
        tags: ['shirt', 'tee', 'apparel', 'clothing'],
        description: 'Premium weighted cotton for ultimate comfort.'
    },
    { 
        id: 'c3', 
        name: 'Aero-Fit Tactical Hoodie', 
        price: 89.00, 
        category: 'Clothing', 
        imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600&auto=format&fit=crop', 
        rating: 4.7,
        stock: 15,
        soldCount: 320,
        viewCount: 5600,
        tags: ['hoodie', 'jacket', 'outerwear', 'clothing'],
        description: 'Water-resistant tactical hoodie with high-performance insulation.'
    },
    { 
        id: 'c4', 
        name: 'Vortex Mesh Joggers', 
        price: 55.00, 
        category: 'Clothing', 
        imageUrl: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=600&auto=format&fit=crop', 
        rating: 4.3,
        stock: 25,
        soldCount: 410,
        viewCount: 6700,
        tags: ['pants', 'joggers', 'fitness', 'clothing'],
        description: 'Breathable activewear built for the most intense training sessions.'
    },
    { 
        id: 'c5', 
        name: 'Zenith Dress Shirt', 
        price: 69.00, 
        category: 'Clothing', 
        imageUrl: 'https://images.unsplash.com/photo-1596755094514-b87a0418826c?q=80&w=600&auto=format&fit=crop', 
        rating: 4.4,
        stock: 18,
        soldCount: 95,
        viewCount: 2100,
        tags: ['shirt', 'formal', 'apparel', 'clothing'],
        description: 'Wrinkle-resistant smart fabric with thermal regulation tech.'
    },

    // --- ACCESSORIES ---
    { 
        id: 'a1', 
        name: 'Titanium Chrono Watch', 
        price: 450.00, 
        category: 'Accessories', 
        imageUrl: 'https://images.unsplash.com/photo-1524592094714-0f0654ece976?q=80&w=600&auto=format&fit=crop', 
        rating: 4.9,
        stock: 3,
        soldCount: 150,
        viewCount: 8500,
        tags: ['watch', 'luxury', 'jewelry', 'time'],
        description: 'Surgical-grade titanium body with sapphire glass.'
    },
    { 
        id: 'a2', 
        name: 'Orbit Smart Ring', 
        price: 199.00, 
        category: 'Accessories', 
        imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop', 
        rating: 4.6,
        stock: 10,
        soldCount: 85,
        viewCount: 4200,
        tags: ['ring', 'smart', 'health', 'jewelry'],
        description: 'Discreet health monitoring in a sleek zirconium ceramic band.'
    },
    { 
        id: 'a3', 
        name: 'Nebula UV Sunglasses', 
        price: 120.00, 
        category: 'Accessories', 
        imageUrl: 'https://images.unsplash.com/photo-1511499767390-9300627e3682?q=80&w=600&auto=format&fit=crop', 
        rating: 4.5,
        stock: 40,
        soldCount: 650,
        viewCount: 9000,
        tags: ['glasses', 'sunglasses', 'style'],
        description: 'Polarized lenses with futuristic lightweight geometric frames.'
    },
    { 
        id: 'a4', 
        name: 'Apex EDC Backpack', 
        price: 145.00, 
        category: 'Accessories', 
        imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop', 
        rating: 4.8,
        stock: 12,
        soldCount: 420,
        viewCount: 7800,
        tags: ['bag', 'backpack', 'travel', 'tech'],
        description: 'Theft-resistant design with integrated solar charging panel.'
    },

    // --- GROCERIES ---
    { 
        id: 'g1', 
        name: 'Bio-Grain Energy Bars', 
        price: 12.99, 
        category: 'Groceries', 
        imageUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=600&auto=format&fit=crop', 
        rating: 4.2,
        stock: 100,
        soldCount: 15000,
        viewCount: 120000,
        tags: ['food', 'snacks', 'health', 'bars'],
        description: 'Packed with essential nutrients for long-lasting energy.'
    },
    { 
        id: 'g2', 
        name: 'Artisan Roast Coffee', 
        price: 18.00, 
        category: 'Groceries', 
        imageUrl: 'https://images.unsplash.com/photo-1559056191-723eb708f5c9?q=80&w=600&auto=format&fit=crop', 
        rating: 4.9,
        stock: 60,
        soldCount: 2300,
        viewCount: 15000,
        tags: ['coffee', 'drink', 'beverage', 'beans'],
        description: 'Ethically sourced, small-batch roasted premium Arabica beans.'
    },
    { 
        id: 'g3', 
        name: 'Organic Matcha Powder', 
        price: 24.50, 
        category: 'Groceries', 
        imageUrl: 'https://images.unsplash.com/photo-1582733315328-84931a0b38b8?q=80&w=600&auto=format&fit=crop', 
        rating: 4.6,
        stock: 35,
        soldCount: 450,
        viewCount: 3200,
        tags: ['tea', 'matcha', 'drink', 'health'],
        description: 'Ceremonial grade matcha for ultimate focus and antioxidant support.'
    },
    { 
        id: 'g4', 
        name: 'Pro-Plant Protein Shaker', 
        price: 4.99, 
        category: 'Groceries', 
        imageUrl: 'https://images.unsplash.com/photo-1593095948071-4746232989d5?q=80&w=600&auto=format&fit=crop', 
        rating: 4.1,
        stock: 200,
        soldCount: 3400,
        viewCount: 5600,
        tags: ['food', 'shake', 'fitness'],
        description: 'Quick-release protein mix for high-intensity recovery.'
    }
];

// --- LOGIC ENGINE ---

export const SmartEngine = {
    /**
     * Get recommendations based on viewed categories
     */
    getRecommendations: (viewedCategories: string[], viewedIds: string[]) => {
        if (!viewedCategories || viewedCategories.length === 0) {
            return GLOBAL_PRODUCTS.sort((a, b) => b.soldCount - a.soldCount).slice(0, 4);
        }
        
        const viewedSet = new Set(viewedIds);
        return GLOBAL_PRODUCTS
            .filter(p => viewedCategories.includes(p.category) && !viewedSet.has(p.id))
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 4);
    },

    /**
     * Fuzzy search logic with semantic synonym mapping
     */
    search: (query: string) => {
        if (!query.trim()) return [];
        const lower = query.toLowerCase();
        
        // Direct, simple term mapping for user-friendliness
        const SYNONYMS: Record<string, string[]> = {
            'clothing': ['apparel', 'clothes', 'dress', 'shirt', 'tee', 'hoodie', 'wear', 'pant', 'jogger'],
            'shoes': ['sneakers', 'footwear', 'shoe', 'run'],
            'electronics': ['tech', 'pc', 'gpu', 'hardware', 'gadget', 'computer', 'keyboard', 'mouse', 'monitor'],
            'groceries': ['food', 'snacks', 'nutrition', 'eat', 'coffee', 'tea', 'drink'],
            'accessories': ['watch', 'jewelry', 'bag', 'backpack', 'ring', 'glasses']
        };

        // Expand query if a common term is used
        let expandedTerms = [lower];
        for (const [key, terms] of Object.entries(SYNONYMS)) {
            if (terms.some(t => lower.includes(t)) || lower.includes(key)) {
                expandedTerms.push(key, ...terms);
            }
        }
        
        return GLOBAL_PRODUCTS.filter(p => 
            expandedTerms.some(term => 
                p.name.toLowerCase().includes(term) || 
                p.tags.some(t => t.toLowerCase().includes(term)) ||
                p.category.toLowerCase().includes(term)
            )
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
                ? `Hello there! 👋 So nice to see you again. I noticed you were looking at the ${history[0].name} earlier—would you like to see more details or similar items? ✨`
                : "Hello! I'm Sphere-AI, your personal shopping assistant. 🤖 How can I make your shopping experience amazing today? 🌟";
            return { text: greeting, type: 'default' };
        }

        // 2. Intent: History / Suggestions based on browsing
        if (lower.includes('suggest') || lower.includes('recommend') || lower.includes('for me')) {
            if (history.length > 0) {
                const targetCategory = history[0].category;
                const recs = GLOBAL_PRODUCTS.filter(p => p.category === targetCategory && !history.some(h => h.id === p.id)).slice(0, 3);
                if (recs.length > 0) {
                    return {
                        text: `Based on your interest in ${targetCategory}, I've found these high-priority items for you! ✨`,
                        products: recs,
                        type: 'results'
                    };
                }
            }
            // Fallback to top rated
            const gifts = [...GLOBAL_PRODUCTS].sort((a, b) => b.rating - a.rating).slice(0, 3);
            return {
                text: "I've picked out some of our most popular items just for you! 🌟",
                products: gifts,
                type: 'results'
            };
        }

        // 3. FAQ Contexts
        if (lower.includes('delivery') || lower.includes('shipping')) {
            return {
                text: "We handle all shipments with extreme care! 📦 Standard delivery takes 2-3 days, and orders over $2,000 get upgraded to Quantum Express shipping for free! 🚀",
                type: 'faq'
            };
        }
        if (lower.includes('return') || lower.includes('refund')) {
            return {
                text: "No worries! Our Return Protocol allows for easy 30-day exchanges. 🔄 Just make sure the items are in good condition, and we'll take care of the rest! 😊",
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
                    text: `I've found ${suggestions.length} great items under $${limit} for you! ✨`,
                    products: suggestions,
                    type: 'results'
                };
            }
        }

        // 5. Category/Search queries
        const searchResults = SmartEngine.search(query);
        if (searchResults.length > 0) {
            return {
                text: `I've found some amazing options for "${query}"! ✨ Take a look:`,
                products: searchResults.slice(0, 3),
                type: 'results'
            };
        }

        // 6. Default Response
        return {
            text: "I'm sorry, I couldn't find exactly what you're looking for. 🤖 Try searching for 'shoes', 'laptop', or 'clothing'—I'm sure we have something you'll love! 😊",
            type: 'default'
        };
    }
};
