import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Quote, Flame, Target, PlayCircle, BookOpen, ExternalLink, ThumbsUp, MessageSquare, Share2, CheckCircle2, Circle, Trophy } from 'lucide-react';
import studentMeme from '../assets/student_meme.png';
import videoThumb from '../assets/success_video_thumb.png';

const MOCK_GOALS = [
  { id: 1, text: 'Maintain a GPA of 3.8 this semester', completed: true },
  { id: 2, text: 'Secure an internship for Summer 2026', completed: false },
  { id: 3, text: 'Complete 100 LeetCode problems', completed: false },
  { id: 4, text: 'Read one self-development book per month', completed: false },
];

export default function Motivation() {
  const [goals, setGoals] = useState(MOCK_GOALS);
  const [newGoal, setNewGoal] = useState('');

  const toggleGoal = (id) => {
    setGoals(goals.map(g => g.id === id ? { ...g, completed: !g.completed } : g));
  };

  const handleAddGoal = (e) => {
    e.preventDefault();
    if (!newGoal.trim()) return;
    setGoals([...goals, { id: Date.now(), text: newGoal, completed: false }]);
    setNewGoal('');
  };

  return (
    <div className="responsive-padding" style={{ padding: '32px', height: '100%', display: 'flex', flexDirection: 'column', maxWidth: '1400px', margin: '0 auto', width: '100%', overflowY: 'auto' }}>
      
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="responsive-title" style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            Daily <span className="gradient-text">Motivation</span> <Flame color="#ff4500" size={32} />
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
            Fuel your ambition, have a laugh, and track your biggest wins!
          </p>
        </motion.div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
        {/* Top Row: Daily Quote & Goals */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
          
          {/* Daily Quote Card */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'linear-gradient(135deg, rgba(255, 107, 107, 0.1) 0%, rgba(200, 80, 192, 0.1) 100%)', border: '1px solid rgba(255, 107, 107, 0.2)' }}>
            <Quote size={40} color="var(--accent-primary)" style={{ marginBottom: '16px', opacity: 0.5 }} />
            <p style={{ fontSize: '24px', fontWeight: '600', lineHeight: '1.4', marginBottom: '16px', fontStyle: 'italic' }}>
              "The future belongs to those who believe in the beauty of their dreams."
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ height: '2px', width: '30px', backgroundColor: 'var(--accent-primary)' }}></div>
              <p style={{ fontSize: '16px', fontWeight: '500', color: 'var(--text-secondary)' }}>Eleanor Roosevelt</p>
            </div>
          </motion.div>

          {/* Student Goals */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <Target size={22} color="#10b981" /> Long-term Goals
            </h2>
            
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
              {goals.map(goal => (
                <div key={goal.id} onClick={() => toggleGoal(goal.id)} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderRadius: '10px', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', cursor: 'pointer', transition: 'all 0.2s', opacity: goal.completed ? 0.6 : 1 }}>
                  {goal.completed ? <CheckCircle2 color="#10b981" size={20} /> : <Circle color="var(--text-secondary)" size={20} />}
                  <span style={{ fontSize: '15px', textDecoration: goal.completed ? 'line-through' : 'none' }}>
                    {goal.text}
                  </span>
                </div>
              ))}
            </div>

            <form onSubmit={handleAddGoal} style={{ display: 'flex', gap: '12px' }}>
              <input 
                type="text" 
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                placeholder="Add a new goal..." 
                style={{ flex: 1, backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '10px 16px', color: 'white', outline: 'none', fontSize: '14px' }}
              />
              <button type="submit" className="btn-primary" style={{ padding: '10px 20px', borderRadius: '10px' }}>Add</button>
            </form>
          </motion.div>
        </div>

        {/* Middle Row: Success Stories */}
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Trophy size={24} color="#f59e0b" /> Success Stories
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            
            {/* Blog Story */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-panel" style={{ padding: '24px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <BookOpen size={20} color="var(--accent-primary)" />
                <span style={{ fontSize: '14px', fontWeight: '500', color: 'var(--accent-primary)' }}>Featured Blog</span>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px', lineHeight: '1.4' }}>
                From Academic Probation to Google Intern: My Journey
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6', marginBottom: '20px' }}>
                How I turned my failing grades around in sophomore year by changing my study habits, managing my time better, and discovering my passion for software engineering...
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>5 min read • By Sarah J.</span>
                <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  Read More <ExternalLink size={14} />
                </button>
              </div>
            </motion.div>

            {/* Video Story */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-panel" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative', height: '180px', width: '100%', backgroundColor: '#000' }}>
                <img src={videoThumb} alt="Success Video" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} />
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '60px', height: '60px', backgroundColor: 'rgba(0,0,0,0.6)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'transform 0.2s' }} className="hover-scale">
                  <PlayCircle size={40} color="white" />
                </div>
              </div>
              <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
                    How I Landed 3 Job Offers Before Graduation
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                    Tips on networking, building projects, and acing the behavioral interview.
                  </p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>12:45 • CampusAngel TV</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Bottom Row: Memes */}
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '28px' }}>😂</span> Student Life Memes
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }} className="glass-panel" style={{ padding: '16px' }}>
              <div style={{ borderRadius: '12px', overflow: 'hidden', marginBottom: '16px', backgroundColor: 'var(--bg-tertiary)', aspectRatio: '1/1' }}>
                <img src={studentMeme} alt="Student Meme" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 8px' }}>
                <button className="btn-icon" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}><ThumbsUp size={18} /> <span style={{ fontSize: '14px' }}>4.2k</span></button>
                <button className="btn-icon" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}><MessageSquare size={18} /> <span style={{ fontSize: '14px' }}>128</span></button>
                <button className="btn-icon" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}><Share2 size={18} /></button>
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </div>
  );
}
