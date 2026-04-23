import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { BookOpen, Briefcase, Users, BrainCircuit, Target, DollarSign, Calendar, ShoppingBag, PenTool, GraduationCap, Timer, Lightbulb, Trophy, Building2, User, Flame } from 'lucide-react';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';

const navItems = [
  { path: '/ai-teacher', name: 'AI Teacher', icon: BookOpen },
  { path: '/planner', name: 'Study Planner', icon: Calendar },
  { path: '/motivation', name: 'Motivation', icon: Flame },
  { path: '/jobs', name: 'CampusJobs', icon: Briefcase },
  { path: '/community', name: 'Community', icon: Users },
  { path: '/health', name: 'Mental Health', icon: BrainCircuit },
  { path: '/books', name: 'BookBaazar', icon: ShoppingBag },
  { path: '/finance', name: 'Finance', icon: DollarSign },
  { path: '/diary', name: 'Diary', icon: PenTool },
  { path: '/tools', name: 'Study Tools', icon: Timer },
  { path: '/career', name: 'Career Guidance', icon: GraduationCap },
  { path: '/skillverse', name: 'Skillverse', icon: Lightbulb },
  { path: '/practice', name: 'Practice Hub', icon: Target },
  { path: '/campus-life', name: 'Campus Life', icon: Building2 },
  { path: '/leaderboard', name: 'Leaderboard', icon: Trophy },
  { path: '/profile', name: 'My Profile', icon: User },
];

export default function Sidebar({ isOpen, setIsOpen }) {
  const navigate = useNavigate();

  return (
    <div className={`sidebar-container ${isOpen ? 'open' : ''}`} style={{
      display: 'flex',
      flexDirection: 'column',
      padding: '24px 16px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px', padding: '0 8px' }}>
        <img 
          src={logo} 
          alt="CampusAngel Logo" 
          style={{
            width: '40px',
            height: '40px',
            objectFit: 'contain',
            borderRadius: '8px'
          }} 
        />
        <h1 style={{ fontSize: '20px', fontWeight: '700', letterSpacing: '-0.5px' }}>
          Campus<span className="gradient-text">Angel</span>
        </h1>
      </div>

      <div className="nav-items-container" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto', paddingRight: '8px', paddingBottom: '16px' }}>
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600', padding: '0 8px', marginBottom: '8px' }}>
          Menu
        </p>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => setIsOpen?.(false)}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              borderRadius: '12px',
              textDecoration: 'none',
              color: isActive ? 'white' : 'var(--text-secondary)',
              backgroundColor: isActive ? 'var(--glass-bg)' : 'transparent',
              border: isActive ? '1px solid var(--glass-border)' : '1px solid transparent',
              transition: 'all 0.2s ease',
              fontWeight: isActive ? '500' : '400'
            })}
          >
            {({ isActive }) => (
              <>
                <item.icon size={20} color={isActive ? 'var(--accent-primary)' : 'currentColor'} />
                <span>{item.name}</span>
                {isActive && (
                  <motion.div
                    layoutId="active-indicator"
                    style={{
                      position: 'absolute',
                      left: 0,
                      width: '4px',
                      height: '24px',
                      backgroundColor: 'var(--accent-primary)',
                      borderRadius: '0 4px 4px 0'
                    }}
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>

      <div 
        onClick={() => { navigate('/profile'); setIsOpen?.(false); }}
        className="glass-panel profile-btn" 
        style={{ padding: '16px', marginTop: 'auto', flexShrink: 0, display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', border: '1px solid var(--glass-border)' }}
      >
        <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--bg-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src="https://api.dicebear.com/7.x/notionists/svg?seed=deepesh" alt="avatar" style={{ width: '24px', height: '24px' }} />
        </div>
        <div>
          <p style={{ fontSize: '14px', fontWeight: '500' }}>Deepesh</p>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Pro Student</p>
        </div>
      </div>
    </div>
  );
}
