'use client';

import { useState, useEffect } from 'react';
import { LayoutGrid, Users, ShoppingCart, TrendingUp, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { SmartEngine } from '@/lib/SmartRetailEngine';
import { useSmartShop } from '@/context/SmartShopContext';

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { inventoryAlerts } = useSmartShop();

  useEffect(() => {
    fetch('/api/smart-retail?action=analytics')
      .then(res => res.json())
      .then(analytics => {
        setData(analytics);
        setLoading(false);
      })
      .catch(err => console.error("Admin data fetch failed", err));
  }, []);

  if (loading) return <div className="container" style={{ padding: '10rem', textAlign: 'center' }}>Decrypting Admin Protocols...</div>;

  const { revenue, sales, lowStock, topSellers } = data;
  
  const stats = [
    { label: 'Projected Revenue', value: `$${revenue.toLocaleString()}`, icon: TrendingUp, color: 'var(--success-color)' },
    { label: 'Units Sold', value: sales.toString(), icon: ShoppingCart, color: 'var(--primary-orange)' },
    { label: 'Low Stock SKUs', value: lowStock.length.toString(), icon: LayoutGrid, color: '#3498db' },
    { label: 'Active Users', value: '1,240', icon: Users, color: '#f39c12' }
  ];

  const lowStockItems = lowStock;
  const topSellersItems = topSellers;

  return (
    <div className="container" style={{ padding: '4rem 1rem' }}>
      <h1 className="title" style={{ textAlign: 'left', marginBottom: '2rem' }}>Admin Dashboard</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
        {stats.map((stat, idx) => (
          <div key={idx} className="card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: `rgba(0,0,0,0.05)`, padding: '1rem', borderRadius: '50%', color: stat.color }}>
              <stat.icon size={28} />
            </div>
            <div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>{stat.label}</p>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="card" style={{ padding: '2rem' }}>
             <h2 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
               <AlertTriangle size={20} color="var(--primary-orange)" />
               Inventory Watchlist
             </h2>
             {lowStockItems.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {lowStockItems.map((item: any) => (
                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'rgba(255, 69, 0, 0.05)', borderRadius: '8px', border: '1px solid rgba(255, 69, 0, 0.2)' }}>
                      <div>
                        <span style={{ fontWeight: 600 }}>{item.name}</span>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Category: {item.category}</p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ color: 'var(--primary-orange)', fontWeight: 800 }}>{item.stock} LEFT</span>
                        <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Replenish Required</p>
                      </div>
                    </div>
                  ))}
                </div>
             ) : (
                <p style={{ color: 'var(--success-color)', fontSize: '0.9rem' }}>All systems nominal. No low-stock conditions detected.</p>
             )}
          </div>

          <div className="card" style={{ padding: '2rem' }}>
             <h2 style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>Automated Operations Log</h2>
             <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
               <thead>
                 <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                   <th style={{ padding: '0.75rem 0' }}>Operation</th>
                   <th>Subject</th>
                   <th>Status</th>
                   <th style={{ textAlign: 'right' }}>Efficiency</th>
                 </tr>
               </thead>
               <tbody>
                 {[
                   { op: 'Stock Sync', sub: 'Global Inventory', status: 'Optimal', eff: '100%' },
                   { op: 'Price Adjust', sub: 'Category: Electronics', status: 'Automated', eff: '98%' },
                   { op: 'User Segmentation', sub: 'Personalization Engine', status: 'Active', eff: '94%' }
                 ].map((o: any, i: number) => (
                   <tr key={i} style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                     <td style={{ padding: '1rem 0', fontWeight: 600, color: 'var(--text-primary)' }}>{o.op}</td>
                     <td>{o.sub}</td>
                     <td>
                       <span style={{ padding: '0.2rem 0.5rem', background: 'rgba(0, 255, 102, 0.05)', borderRadius: '4px', fontSize: '0.8rem', color: 'var(--success-color)' }}>{o.status}</span>
                     </td>
                     <td style={{ textAlign: 'right', fontWeight: 600, color: 'var(--text-primary)' }}>{o.eff}</td>
                   </tr>
                 ))}
               </tbody>
             </table>
          </div>
        </div>

        <div className="card" style={{ padding: '2rem', height: 'fit-content' }}>
           <h2 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
             <ArrowUpRight size={20} color="var(--success-color)" />
             Top Selling SKUs
           </h2>
           <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
             {topSellersItems.map((item: any, i: number) => (
               <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                 <div style={{ width: '50px', height: '50px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', overflow: 'hidden' }}>
                    <img src={item.imageUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                 </div>
                 <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '0.9rem', marginBottom: '0.2rem' }}>{item.name}</h4>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{item.soldCount} Units Sold</span>
                 </div>
                 <div style={{ fontWeight: 700, color: 'var(--primary-orange)' }}>#{i+1}</div>
               </div>
             ))}
           </div>
           
           <div style={{ marginTop: '2.5rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color)' }}>
              <button className="btn btn-primary" style={{ width: '100%', marginBottom: '0.75rem' }}>Export Global Report</button>
              <button className="btn btn-secondary" style={{ width: '100%' }}>System Settings</button>
           </div>
        </div>
      </div>
    </div>
  );
}
