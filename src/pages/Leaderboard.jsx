import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Medal, Star, Flame, Users, Target, Gift, Zap, Crown, Award, ChevronRight } from 'lucide-react';

const MOCK_LEADERBOARD = {
  daily: [
    { rank: 1, name: 'Rahul S.', points: 850, avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=rahul', badge: '🔥 Hot Streak' },
    { rank: 2, name: 'Deepesh', points: 720, avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=deepesh', badge: 'Top Contributor' },
    { rank: 3, name: 'Priya M.', points: 640, avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=priya', badge: '' },
    { rank: 4, name: 'Aman K.', points: 510, avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=aman', badge: '' },
    { rank: 5, name: 'Neha G.', points: 480, avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=neha', badge: '' },
  ],
  weekly: [
    { rank: 1, name: 'Deepesh', points: 5200, avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=deepesh', badge: 'Top Contributor' },
    { rank: 2, name: 'Sarah C.', points: 4800, avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=sarah', badge: 'Expert Mentor' },
    { rank: 3, name: 'Rahul S.', points: 4100, avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=rahul', badge: '🔥 Hot Streak' },
    { rank: 4, name: 'Emily T.', points: 3800, avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=emily', badge: '' },
    { rank: 5, name: 'Aman K.', points: 3400, avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=aman', badge: '' },
  ],
  allTime: [
    { rank: 1, name: 'Sarah C.', points: 45000, avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=sarah', badge: 'Legend 👑' },
    { rank: 2, name: 'Michael R.', points: 42300, avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=michael', badge: 'Veteran' },
    { rank: 3, name: 'Deepesh', points: 38500, avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=deepesh', badge: 'Rising Star 🌟' },
    { rank: 4, name: 'Aman K.', points: 35200, avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=aman', badge: '' },
    { rank: 5, name: 'Priya M.', points: 31000, avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=priya', badge: '' },
  ]
};

const HOW_TO_EARN = [
  { category: 'Daily Activity', icon: <Target size={20} color="#3b82f6" />, points: '+10 to +50', desc: 'Login, watch content, complete tasks' },
  { category: 'Contribution', icon: <Star size={20} color="#8b5cf6" />, points: '+80 to +150', desc: 'Post notes, answer questions, upload material' },
  { category: 'Social Growth', icon: <Users size={20} color="#10b981" />, points: '+5 to +300', desc: 'Refer friends, create communities, help others' },
  { category: 'Special Actions', icon: <Flame size={20} color="#f59e0b" />, points: '+400 to +1000', desc: 'Mentoring, complete courses, win challenges' },
];

export default function Leaderboard() {
  const [timeframe, setTimeframe] = useState('weekly');
  const [activeSubTab, setActiveSubTab] = useState('rules'); // rules or rewards

  const renderRankIcon = (rank) => {
    if (rank === 1) return <Crown size={24} color="#fbbf24" />;
    if (rank === 2) return <Medal size={24} color="#94a3b8" />;
    if (rank === 3) return <Medal size={24} color="#b45309" />;
    return <span style={{ fontSize: '18px', fontWeight: 'bold', width: '24px', textAlign: 'center', color: 'var(--text-secondary)' }}>#{rank}</span>;
  };

  return (
    <div className="responsive-padding" style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Header & Unlock Progress */}
      <div style={{ background: 'var(--bg-tertiary)', padding: '32px', borderRadius: '24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexWrap: 'wrap', gap: '32px', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 className="responsive-title" style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Trophy color="var(--accent-primary)" size={40} />
              Hall of Fame
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>Compete, stay active, and earn rewards as you learn.</p>
          </div>
          
          <div style={{ flex: '1 1 300px', background: 'rgba(255,255,255,0.03)', padding: '24px', borderRadius: '16px', border: '1px solid var(--accent-primary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Gift size={18} color="var(--accent-primary)"/> Next Reward Pool Unlock
              </span>
              <span style={{ fontWeight: 'bold', color: 'var(--accent-primary)' }}>₹50,000</span>
            </div>
            <div style={{ height: '12px', background: 'var(--bg-secondary)', borderRadius: '6px', overflow: 'hidden', marginBottom: '12px' }}>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '72%' }}
                transition={{ duration: 1, ease: 'easeOut' }}
                style={{ height: '100%', background: 'var(--accent-gradient)', borderRadius: '6px' }} 
              />
            </div>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', textAlign: 'right' }}>
              🚀 <strong>7,200 / 10,000</strong> users joined
            </p>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
        
        {/* Leaderboard Column */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', background: 'var(--bg-tertiary)', padding: '6px', borderRadius: '12px' }}>
            {['daily', 'weekly', 'allTime'].map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: '8px',
                  background: timeframe === tf ? 'var(--accent-primary)' : 'transparent',
                  color: timeframe === tf ? 'white' : 'var(--text-secondary)',
                  fontWeight: timeframe === tf ? '600' : '500',
                  textTransform: 'capitalize'
                }}
              >
                {tf === 'allTime' ? 'All Time' : tf}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={timeframe}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
              >
                {MOCK_LEADERBOARD[timeframe].map((user) => (
                  <div key={user.rank} style={{ 
                    display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', 
                    background: user.name === 'Deepesh' ? 'rgba(139, 92, 246, 0.15)' : 'var(--bg-tertiary)', 
                    borderRadius: '16px',
                    border: user.name === 'Deepesh' ? '1px solid var(--accent-primary)' : '1px solid transparent'
                  }}>
                    {renderRankIcon(user.rank)}
                    <img src={user.avatar} alt="avatar" style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--bg-secondary)' }} />
                    <div style={{ flex: 1 }}>
                      <p style={{ fontWeight: 'bold', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {user.name} {user.name === 'Deepesh' && <span style={{ fontSize: '12px', background: 'var(--accent-primary)', padding: '2px 8px', borderRadius: '8px' }}>You</span>}
                      </p>
                      {user.badge && <span style={{ fontSize: '12px', color: 'var(--accent-secondary)' }}>{user.badge}</span>}
                    </div>
                    <div style={{ fontWeight: 'bold', fontSize: '18px', color: 'var(--accent-primary)' }}>
                      {user.points.toLocaleString()} <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 'normal' }}>pts</span>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Info Column (Rules & Rewards) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div className="glass-panel" style={{ padding: '8px', display: 'flex', flexWrap: 'wrap', gap: '8px', borderRadius: '16px' }}>
            <button
              onClick={() => setActiveSubTab('rules')}
              style={{ flex: 1, padding: '12px', borderRadius: '12px', background: activeSubTab === 'rules' ? 'var(--bg-tertiary)' : 'transparent', color: activeSubTab === 'rules' ? 'white' : 'var(--text-secondary)', fontWeight: 'bold' }}
            >
              How to Earn Points
            </button>
            <button
              onClick={() => setActiveSubTab('rewards')}
              style={{ flex: 1, padding: '12px', borderRadius: '12px', background: activeSubTab === 'rewards' ? 'var(--bg-tertiary)' : 'transparent', color: activeSubTab === 'rewards' ? 'white' : 'var(--text-secondary)', fontWeight: 'bold' }}
            >
              Rewards & Perks
            </button>
          </div>

          <AnimatePresence mode="wait">
            {activeSubTab === 'rules' ? (
              <motion.div key="rules" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {HOW_TO_EARN.map((rule, idx) => (
                  <div key={idx} className="glass-panel" style={{ padding: '20px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <div style={{ background: 'var(--bg-tertiary)', padding: '12px', borderRadius: '12px' }}>
                      {rule.icon}
                    </div>
                    <div>
                      <h3 style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '4px' }}>{rule.category}</h3>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '8px' }}>{rule.desc}</p>
                      <span style={{ display: 'inline-block', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '4px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>
                        {rule.points}
                      </span>
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div key="rewards" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div className="glass-panel" style={{ padding: '24px', borderLeft: '4px solid #10b981' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    💵 Real Rewards
                  </h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--text-secondary)' }}>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><ChevronRight size={16} color="#10b981"/> Cash (₹100 - ₹5000) via UPI</li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><ChevronRight size={16} color="#10b981"/> Exclusive Internship Opportunities</li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><ChevronRight size={16} color="#10b981"/> Amazon & Swiggy Gift Cards</li>
                  </ul>
                </div>

                <div className="glass-panel" style={{ padding: '24px', borderLeft: '4px solid #3b82f6' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    🎓 Student Benefits
                  </h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--text-secondary)' }}>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><ChevronRight size={16} color="#3b82f6"/> Free premium course unlocks</li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><ChevronRight size={16} color="#3b82f6"/> Verified Certificates</li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><ChevronRight size={16} color="#3b82f6"/> 1-on-1 mentorship sessions</li>
                  </ul>
                </div>

                <div className="glass-panel" style={{ padding: '24px', borderLeft: '4px solid #8b5cf6' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    🎁 Cool Perks
                  </h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--text-secondary)' }}>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><ChevronRight size={16} color="#8b5cf6"/> Special badges (e.g. Top Mentor)</li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><ChevronRight size={16} color="#8b5cf6"/> Profile highlight & more visibility</li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><ChevronRight size={16} color="#8b5cf6"/> Early access to new CampusAngel features</li>
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
}
