import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DollarSign, TrendingDown, TrendingUp, Home, Utensils, Coffee, Receipt, CreditCard, Plus, ArrowUpRight, ArrowDownRight, Wallet } from 'lucide-react';

const INITIAL_TRANSACTIONS = [
  { id: 1, title: 'Campus Cafe', category: 'Mess & Food', amount: 15.50, type: 'expense', date: 'Today, 2:30 PM', icon: Coffee, color: '#f59e0b' },
  { id: 2, title: 'Hostel Mess Fee (April)', category: 'Mess & Food', amount: 120.00, type: 'expense', date: 'Yesterday', icon: Utensils, color: '#ec4899' },
  { id: 3, title: 'Freelance Gig', category: 'Income', amount: 50.00, type: 'income', date: 'Apr 18', icon: ArrowUpRight, color: '#10b981' },
  { id: 4, title: 'Dorm Maintenance', category: 'Hostel & Rent', amount: 45.00, type: 'expense', date: 'Apr 15', icon: Home, color: '#3b82f6' },
  { id: 5, title: 'Library Print Shop', category: 'Utilities & Study', amount: 5.20, type: 'expense', date: 'Apr 12', icon: Receipt, color: '#8b5cf6' }
];

const INITIAL_BUDGET = [
  { name: 'Hostel & Rent', spent: 400, budget: 400, color: '#3b82f6' },
  { name: 'Mess & Food', spent: 180, budget: 250, color: '#ec4899' },
  { name: 'Utilities & Study', spent: 45, budget: 100, color: '#8b5cf6' },
  { name: 'Entertainment', spent: 85, budget: 150, color: '#f59e0b' }
];

export default function Finance() {
  const [activeTab, setActiveTab] = useState('overview');
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [budget, setBudget] = useState(INITIAL_BUDGET);
  
  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [newExpense, setNewExpense] = useState({ title: '', amount: '', category: 'Mess & Food', type: 'expense' });

  const totalSpent = budget.reduce((acc, curr) => acc + curr.spent, 0);
  const totalBudget = budget.reduce((acc, curr) => acc + curr.budget, 0);
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
  const currentBalance = 1240.50 - totalSpent + totalIncome;

  const handlePostExpense = (e) => {
    e.preventDefault();
    if (!newExpense.title || !newExpense.amount) return;
    
    const amountVal = parseFloat(newExpense.amount.replace('₹', ''));
    if (isNaN(amountVal)) return;

    let icon = Receipt;
    let color = '#8b5cf6';
    if (newExpense.type === 'income') { icon = ArrowUpRight; color = '#10b981'; }
    else if (newExpense.category === 'Mess & Food') { icon = Utensils; color = '#ec4899'; }
    else if (newExpense.category === 'Hostel & Rent') { icon = Home; color = '#3b82f6'; }
    else if (newExpense.category === 'Entertainment') { icon = Coffee; color = '#f59e0b'; }

    const txn = {
      id: Date.now(),
      title: newExpense.title,
      category: newExpense.category,
      amount: amountVal,
      type: newExpense.type,
      date: 'Just Now',
      icon, color
    };

    setTransactions([txn, ...transactions]);

    if (newExpense.type === 'expense') {
      setBudget(prev => prev.map(b => b.name === newExpense.category ? { ...b, spent: b.spent + amountVal } : b));
    }

    setShowModal(false);
    setNewExpense({ title: '', amount: '', category: 'Mess & Food', type: 'expense' });
  };

  return (
    <div className="responsive-padding" style={{ padding: '32px', height: '100%', display: 'flex', flexDirection: 'column', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px', marginBottom: '32px' }}>
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="responsive-title" style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>
            Campus<span className="gradient-text">Finance</span> 💸
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
            Track your monthly budget, hostel fees, and mess expenses.
          </p>
        </motion.div>
        
        <div style={{ display: 'flex', gap: '16px' }}>
          <button className="btn-primary" onClick={() => setShowModal(true)} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Plus size={16} />
            <span>Add Expense</span>
          </button>
        </div>
      </div>

      <div className="responsive-flex" style={{ display: 'flex', gap: '24px', flex: 1, minHeight: 0 }}>
        
        {/* Left Column: Dashboard */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', overflowY: 'auto', paddingRight: '8px', flex: 1 }}>
          
          {/* Top Stats Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel" style={{ padding: '24px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '-10px', right: '-10px', opacity: 0.1 }}><Wallet size={100} color="var(--accent-primary)" /></div>
              <h3 style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: '500', marginBottom: '8px' }}>Total Balance</h3>
              <div style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>₹{currentBalance.toFixed(2)}</div>
              <div style={{ fontSize: '13px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <TrendingUp size={14} /> +2.5% from last month
              </div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-panel" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: '500', marginBottom: '8px' }}>Monthly Spent</h3>
              <div style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>₹{totalSpent.toFixed(2)}</div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ color: '#ef4444' }}><TrendingDown size={14} /></span> Out of ₹{totalBudget} budget
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-panel" style={{ padding: '24px', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.05))', borderColor: 'rgba(16, 185, 129, 0.2)' }}>
              <h3 style={{ fontSize: '14px', color: '#10b981', fontWeight: '600', marginBottom: '8px' }}>AI Insight</h3>
              <p style={{ fontSize: '14px', lineHeight: '1.5', color: 'var(--text-primary)' }}>
                You're spending 20% less on food this week! Good job eating at the Mess instead of ordering out.
              </p>
            </motion.div>
          </div>

          {/* Budget Breakdown */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-panel" style={{ padding: '24px', flex: 1 }}>
            <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <DollarSign size={20} color="var(--accent-secondary)" /> Budget Breakdown (April)
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {budget.map((cat, i) => {
                const percentage = Math.min((cat.spent / cat.budget) * 100, 100);
                const isOverBudget = cat.spent > cat.budget;
                
                return (
                  <div key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: '14px', fontWeight: '500' }}>{cat.name}</span>
                      <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                        <span style={{ color: isOverBudget ? '#ef4444' : 'var(--text-primary)', fontWeight: '600' }}>₹{cat.spent.toFixed(0)}</span> / ₹{cat.budget}
                      </span>
                    </div>
                    <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--bg-secondary)', borderRadius: '4px', overflow: 'hidden' }}>
                      <motion.div 
                        initial={{ width: 0 }} animate={{ width: `${percentage}%` }} transition={{ duration: 1, delay: 0.4 + (i * 0.1) }}
                        style={{ height: '100%', backgroundColor: isOverBudget ? '#ef4444' : cat.color, borderRadius: '4px' }} 
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

        </div>

        {/* Right Sidebar: Recent Transactions */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="glass-panel responsive-sidebar" style={{ width: '380px', padding: '24px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CreditCard size={20} color="var(--accent-primary)" /> Recent Activity
            </h2>
            <span style={{ fontSize: '12px', color: 'var(--accent-primary)', cursor: 'pointer' }}>View All</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto', flex: 1, paddingRight: '4px' }}>
            <AnimatePresence>
              {transactions.map((txn, i) => (
                <motion.div layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} key={txn.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', borderRadius: '12px', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', transition: 'all 0.2s', cursor: 'pointer' }} onMouseOver={e => e.currentTarget.style.borderColor='var(--accent-primary)'} onMouseOut={e => e.currentTarget.style.borderColor='var(--border-color)'}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: `${txn.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: txn.color }}>
                    <txn.icon size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '2px' }}>{txn.title}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{txn.date}</div>
                  </div>
                </div>
                <div style={{ fontSize: '15px', fontWeight: '600', color: txn.type === 'income' ? '#10b981' : 'var(--text-primary)' }}>
                  {txn.type === 'income' ? '+' : '-'}₹{txn.amount.toFixed(2)}
                </div>
              </motion.div>
            ))}
            </AnimatePresence>
          </div>

          <button className="btn-primary" style={{ width: '100%', marginTop: '20px', backgroundColor: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>
            Download Statement PDF
          </button>
        </motion.div>

      </div>

      {/* Add Expense Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onClick={() => setShowModal(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="glass-panel responsive-sidebar" style={{ width: '500px', maxWidth: '90vw', padding: '32px', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-secondary)' }}
            >
              <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '24px' }}>Add Transaction</h2>
              
              <form onSubmit={handlePostExpense} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Type</label>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                      <input type="radio" checked={newExpense.type === 'expense'} onChange={() => setNewExpense({...newExpense, type: 'expense'})} /> Expense
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                      <input type="radio" checked={newExpense.type === 'income'} onChange={() => setNewExpense({...newExpense, type: 'income'})} /> Income
                    </label>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Title / Description</label>
                  <input 
                    type="text" required value={newExpense.title} onChange={e => setNewExpense({...newExpense, title: e.target.value})}
                    placeholder="e.g. Late night pizza"
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)', color: 'white', outline: 'none' }}
                  />
                </div>
                
                <div className="responsive-flex" style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Amount</label>
                    <input 
                      type="number" step="0.01" required value={newExpense.amount} onChange={e => setNewExpense({...newExpense, amount: e.target.value})}
                      placeholder="15.00"
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)', color: 'white', outline: 'none' }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Category</label>
                    <select 
                      value={newExpense.category} onChange={e => setNewExpense({...newExpense, category: e.target.value})}
                      disabled={newExpense.type === 'income'}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)', color: 'white', outline: 'none' }}
                    >
                      <option value="Income">Income</option>
                      {budget.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                    </select>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
                  <button type="button" onClick={() => setShowModal(false)} style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer' }}>Cancel</button>
                  <button type="submit" className="btn-primary" style={{ padding: '10px 24px' }}>Save Transaction</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
