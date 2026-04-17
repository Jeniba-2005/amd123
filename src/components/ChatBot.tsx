'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, ShoppingCart, Info, RefreshCcw, ExternalLink } from 'lucide-react';
import styles from './ChatBot.module.css';
import { useCart } from '@/context/CartContext';
import { useSmartShop } from '@/context/SmartShopContext';
import { SmartEngine } from '@/lib/SmartRetailEngine';
import Link from 'next/link';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const { items, totalPrice } = useCart();
  const { recentlyViewed } = useSmartShop();

  const [messages, setMessages] = useState([
    { role: 'bot', content: "Hello! I'm Sphere-AI, your friendly shopping assistant. ✨ I'm here to help you find the best tech and gear. What are we looking for today? 🤖", type: 'text' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (overrideInput?: string) => {
    const text = overrideInput || input;
    if (!text.trim()) return;

    const userMessage = { role: 'user', content: text, type: 'text' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // AI Logic Migration: Calling Centralized API
    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: text, cartItems: items, history: recentlyViewed })
      });
      const result = await response.json();
      
      setMessages(prev => [...prev, { 
        role: 'bot', 
        content: result.text, 
        products: result.products,
        type: result.type 
      }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'bot', 
        content: "Satellite Link Interrupted. Unable to contact Sphere-AI core.", 
        type: 'default' 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const quickReplies = [
    { label: 'Shoes under 100', icon: <ShoppingCart size={14} /> },
    { label: 'Shipping Info', icon: <Info size={14} /> },
    { label: 'Return Policy', icon: <RefreshCcw size={14} /> },
    { label: 'Gift Ideas', icon: <Bot size={14} /> }
  ];

  return (
    <div className={styles.chatbotContainer}>
      {isOpen ? (
        <div className={styles.chatWindow}>
          <div className={styles.header}>
            <div className={styles.headerInfo}>
              <div className={styles.avatar}>
                <Bot size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 600 }}>Sphere-AI</h4>
                <div className={styles.status}>Online</div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>
          </div>

          <div className={styles.content}>
            {messages.map((msg: any, index) => (
              <div key={index} style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                <div 
                  className={`${styles.message} ${msg.role === 'bot' ? styles.botMessage : styles.userMessage}`}
                >
                  {msg.content}
                </div>
                {msg.products && (
                  <div className={styles.productCarousel}>
                    {msg.products.map((p: any) => (
                      <div key={p.id} className={styles.miniCard}>
                        <img src={p.imageUrl} alt="" className={styles.miniImg} />
                        <div className={styles.miniInfo}>
                          <div className={styles.miniTitle}>{p.name}</div>
                          <div className={styles.miniPrice}>${p.price}</div>
                          <Link href={`/products/${p.id}`} className={styles.miniLink}>
                            View <ExternalLink size={10} />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
                <div className={`${styles.message} ${styles.botMessage} ${styles.typing}`}>
                   <span>.</span><span>.</span><span>.</span>
                </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className={styles.quickReplies}>
            {quickReplies.map((qr, i) => (
               <button key={i} className={styles.qrBtn} onClick={() => handleSend(qr.label)}>
                 {qr.icon} {qr.label}
               </button>
            ))}
          </div>

          <div className={styles.inputArea}>
            <input 
              type="text" 
              placeholder="Ask anything..." 
              className={styles.input}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button className={styles.sendBtn} onClick={() => handleSend()}>
              <Send size={20} />
            </button>
          </div>
        </div>
      ) : (
        <button className={styles.fab} onClick={() => setIsOpen(true)}>
          <MessageSquare size={28} />
        </button>
      )}
    </div>
  );
}
