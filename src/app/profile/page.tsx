'use client';

import { User, Package, Settings, LogOut, ChevronRight, ShieldCheck, CreditCard } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const mockUser = {
    name: 'John Doe',
    email: 'john.doe@amd-sphere.com',
    memberSince: 'Oct 2023',
    status: 'Core Member',
    avatar: 'JD'
  };

  const mockOrders = [
    { id: 'ORD-X92', date: '2023-11-15', total: 1299.99, status: 'Delivered', items: 2 },
    { id: 'ORD-X45', date: '2023-10-22', total: 645.50, status: 'Processing', items: 1 }
  ];

  return (
    <div className="container" style={{ padding: '6rem 1rem' }}>
      <div style={{ marginBottom: '3rem' }}>
        <h1 className="title" style={{ textAlign: 'left', margin: 0, textTransform: 'uppercase', letterSpacing: '2px' }}>
          User <span style={{ color: 'var(--primary-orange)' }}>Profile</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Manage your ShopSphere X account and order history.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '3rem' }}>
        
        {/* Futuristic Sidebar */}
        <aside style={{ 
          background: 'var(--bg-glass)', 
          borderRadius: '8px', 
          border: '1px solid var(--border-color)', 
          overflow: 'hidden', 
          height: 'fit-content',
          backdropFilter: 'blur(20px)'
        }}>
          <div style={{ 
            padding: '3rem 2rem', 
            borderBottom: '1px solid var(--border-color)', 
            textAlign: 'center',
            background: 'linear-gradient(180deg, rgba(255, 69, 0, 0.05) 0%, transparent 100%)' 
          }}>
            <div style={{ 
              width: '100px', 
              height: '100px', 
              background: 'linear-gradient(135deg, var(--primary-orange), #d13000)', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              margin: '0 auto 1.5rem', 
              color: 'white',
              fontSize: '2rem',
              fontWeight: 800,
              boxShadow: '0 0 20px var(--primary-orange-glow)',
              border: '2px solid rgba(255, 255, 255, 0.2)'
            }}>
               {mockUser.avatar}
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#fff' }}>{mockUser.name}</h3>
            <p style={{ color: 'var(--primary-orange)', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginTop: '0.25rem' }}>{mockUser.status}</p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.5rem' }}>{mockUser.email}</p>
          </div>
          
          <ul style={{ display: 'flex', flexDirection: 'column' }}>
            <li>
              <Link href="#orders" style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                padding: '1.5rem 2rem', 
                color: 'var(--primary-orange)', 
                background: 'rgba(255, 69, 0, 0.05)', 
                fontWeight: 600, 
                borderLeft: '4px solid var(--primary-orange)' 
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <Package size={20} /> Order History
                </div>
                <ChevronRight size={16} />
              </Link>
            </li>
            <li>
              <Link href="#payment" style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                padding: '1.5rem 2rem', 
                color: 'var(--text-secondary)',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                transition: '0.3s'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <CreditCard size={20} /> Payment Methods
                </div>
                <ChevronRight size={16} />
              </Link>
            </li>
            <li>
              <Link href="#security" style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                padding: '1.5rem 2rem', 
                color: 'var(--text-secondary)',
                borderBottom: '1px solid rgba(255,255,255,0.05)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <ShieldCheck size={20} /> Security Settings
                </div>
                <ChevronRight size={16} />
              </Link>
            </li>
            <li>
              <button style={{ 
                width: '100%', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem', 
                padding: '1.5rem 2rem', 
                color: 'var(--error-color)', 
                background: 'none', 
                border: 'none', 
                cursor: 'pointer', 
                textAlign: 'left', 
                fontSize: '1rem',
                fontWeight: 600
              }}>
                <LogOut size={20} /> Terminate Session
              </button>
            </li>
          </ul>
        </aside>

        {/* Main Content Area */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          
          {/* Recent Orders Section */}
          <div className="card" style={{ padding: '2.5rem' }}>
            <h2 style={{ 
              fontSize: '1.3rem', 
              marginBottom: '2rem', 
              textTransform: 'uppercase', 
              letterSpacing: '1px',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              paddingBottom: '1rem'
            }}>Active Deployments <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 400 }}>(Recent Orders)</span></h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {mockOrders.map(order => (
                <div key={order.id} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  padding: '1.75rem', 
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--border-color)', 
                  borderRadius: '8px',
                  transition: '0.3s'
                }}>
                  <div>
                    <h4 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.25rem', color: '#fff' }}>{order.id}</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                      Timestamp: {order.date} • {order.items} Items Encapsulated
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ 
                      fontWeight: 800, 
                      fontSize: '1.2rem', 
                      color: 'var(--primary-orange)',
                      textShadow: '0 0 10px var(--primary-orange-glow)'
                    }}>${order.total.toLocaleString()}</div>
                    <span style={{ 
                      display: 'inline-block', 
                      padding: '0.3rem 0.75rem', 
                      background: order.status === 'Delivered' ? 'rgba(0, 255, 102, 0.1)' : 'rgba(255, 165, 0, 0.1)', 
                      color: order.status === 'Delivered' ? 'var(--success-color)' : '#ffa500', 
                      borderRadius: '50px', 
                      fontSize: '0.75rem', 
                      fontWeight: 700, 
                      marginTop: '0.5rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      border: '1px solid currentColor'
                    }}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Account Details / Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div className="card" style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '1.25rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>System Reliability</h3>
              <div style={{ fontSize: '2rem', fontWeight: 800 }}>99.9<span style={{ color: 'var(--primary-orange)' }}>%</span></div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '0.5rem' }}>Member since {mockUser.memberSince}</p>
            </div>
            <div className="card" style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '1.25rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Security Level</h3>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--success-color)' }}>OPTIMAL</div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '0.5rem' }}>Biometric Sync: Active</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
