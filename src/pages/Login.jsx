import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Building2, ArrowRight } from 'lucide-react';
import logo from '../assets/logo.png';

export default function Login({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate authentication
    onLogin();
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', background: 'radial-gradient(circle at top left, rgba(139, 92, 246, 0.15), transparent 40%), radial-gradient(circle at bottom right, rgba(59, 130, 246, 0.15), transparent 40%)' }}>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel"
        style={{ width: '100%', maxWidth: '440px', padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
          <img src={logo} alt="CampusAngel Logo" style={{ width: '48px', height: '48px', borderRadius: '12px' }} />
          <h1 style={{ fontSize: '28px', fontWeight: '700', letterSpacing: '-0.5px' }}>
            Campus<span className="gradient-text">Angel</span>
          </h1>
        </div>

        <div style={{ display: 'flex', width: '100%', gap: '8px', background: 'var(--bg-tertiary)', padding: '6px', borderRadius: '12px', marginBottom: '32px' }}>
          <button
            onClick={() => setIsLogin(true)}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '8px',
              background: isLogin ? 'var(--accent-primary)' : 'transparent',
              color: isLogin ? 'white' : 'var(--text-secondary)',
              border: 'none',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Log In
          </button>
          <button
            onClick={() => setIsLogin(false)}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '8px',
              background: !isLogin ? 'var(--accent-primary)' : 'transparent',
              color: !isLogin ? 'white' : 'var(--text-secondary)',
              border: 'none',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <AnimatePresence mode="wait">
            {!isLogin && (
              <motion.div
                key="signup-fields"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
              >
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Full Name</label>
                  <div style={{ position: 'relative' }}>
                    <User size={18} color="var(--text-secondary)" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input 
                      type="text" required placeholder="Deepesh"
                      style={{ width: '100%', padding: '14px 16px 14px 44px', borderRadius: '12px', background: 'var(--bg-tertiary)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none' }}
                    />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px' }}>University / College</label>
                  <div style={{ position: 'relative' }}>
                    <Building2 size={18} color="var(--text-secondary)" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input 
                      type="text" required placeholder="Stanford University"
                      style={{ width: '100%', padding: '14px 16px 14px 44px', borderRadius: '12px', background: 'var(--bg-tertiary)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none' }}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px' }}>University Email</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} color="var(--text-secondary)" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="email" required placeholder="student@university.edu"
                style={{ width: '100%', padding: '14px 16px 14px 44px', borderRadius: '12px', background: 'var(--bg-tertiary)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} color="var(--text-secondary)" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="password" required placeholder="••••••••"
                style={{ width: '100%', padding: '14px 16px 14px 44px', borderRadius: '12px', background: 'var(--bg-tertiary)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none' }}
              />
            </div>
          </div>

          {isLogin && (
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '13px', color: 'var(--accent-primary)', cursor: 'pointer' }}>Forgot Password?</span>
            </div>
          )}

          <button type="submit" className="btn-primary" style={{ marginTop: '16px', padding: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', fontSize: '16px' }}>
            {isLogin ? 'Log In to Account' : 'Create Student Account'} <ArrowRight size={18} />
          </button>
        </form>

        <p style={{ marginTop: '32px', fontSize: '13px', color: 'var(--text-secondary)', textAlign: 'center' }}>
          By continuing, you agree to CampusAngel's Terms of Service and Privacy Policy.
        </p>

      </motion.div>
    </div>
  );
}
