import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Gift, Crown, Medal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TOP_STUDENTS = [
  { rank: 1, name: 'Sarah', points: '45k', avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=sarah' },
  { rank: 2, name: 'Michael', points: '42k', avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=michael' },
  { rank: 3, name: 'Deepesh', points: '38k', avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=deepesh' },
];

export default function GlobalHeader() {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate('/leaderboard')}
      className="global-header"
      style={{
        padding: '12px 24px',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        background: 'rgba(19, 19, 26, 0.8)',
        backdropFilter: 'blur(12px)',
        position: 'sticky',
        top: 0,
        zIndex: 10,
        cursor: 'pointer'
      }}
    >
      {/* Top 3 Leaderboard */}
      <div className="global-header-top3" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-primary)', fontWeight: 'bold' }}>
          <Trophy size={20} /> <span className="hide-on-mobile">Top 3</span>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          {TOP_STUDENTS.map((student) => (
            <div key={student.rank} className="glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '4px 12px', borderRadius: '20px', border: student.name === 'Deepesh' ? '1px solid var(--accent-primary)' : '1px solid var(--glass-border)' }}>
              {student.rank === 1 ? <Crown size={14} color="#fbbf24" /> : <Medal size={14} color={student.rank === 2 ? '#94a3b8' : '#b45309'} />}
              <img src={student.avatar} alt={student.name} style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--bg-secondary)' }} />
              <span style={{ fontSize: '13px', fontWeight: '500' }}>
                <span className="name-text">{student.name} </span>
                <span style={{ color: 'var(--accent-primary)' }}>{student.points}</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Reward Unlock Progress */}
      <div className="global-header-reward" style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: '1', maxWidth: '300px', marginLeft: 'auto' }}>
        <Gift size={18} color="var(--accent-primary)" />
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Next Unlock</span>
            <span style={{ fontWeight: 'bold', color: 'var(--accent-primary)' }}>7.2k / 10k Users</span>
          </div>
          <div style={{ height: '6px', background: 'var(--bg-tertiary)', borderRadius: '3px', overflow: 'hidden' }}>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '72%' }}
              transition={{ duration: 1 }}
              style={{ height: '100%', background: 'var(--accent-gradient)', borderRadius: '3px' }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
