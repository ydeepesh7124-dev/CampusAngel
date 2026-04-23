import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, MessageCircle, Calendar as CalendarIcon, Star, Award, GraduationCap, ArrowRight } from 'lucide-react';

const MOCK_SENIORS = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'Software Engineer at Google',
    major: 'Computer Science, Class of 2023',
    rating: 4.9,
    reviews: 124,
    skills: ['Frontend', 'System Design', 'Interview Prep'],
    image: 'https://api.dicebear.com/7.x/notionists/svg?seed=sarah'
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    role: 'Investment Banker at Goldman Sachs',
    major: 'Finance, Class of 2022',
    rating: 4.8,
    reviews: 89,
    skills: ['Resume Review', 'Finance Modeling', 'Networking'],
    image: 'https://api.dicebear.com/7.x/notionists/svg?seed=michael'
  },
  {
    id: 3,
    name: 'Emily Taylor',
    role: 'Product Manager at Microsoft',
    major: 'Business Admin, Class of 2021',
    rating: 5.0,
    reviews: 210,
    skills: ['Product Strategy', 'Agile', 'Behavioral Interviews'],
    image: 'https://api.dicebear.com/7.x/notionists/svg?seed=emily'
  }
];

export default function CareerGuidance() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = ['All', 'Engineering', 'Finance', 'Product', 'Design'];

  return (
    <div className="responsive-padding" style={{ padding: '24px', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px', background: 'var(--bg-tertiary)', padding: '32px', borderRadius: '16px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 className="responsive-title" style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '16px' }}>
            Career Guidance <span className="gradient-text">From Seniors</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', lineHeight: '1.6', fontSize: '16px' }}>
            Connect with alumni and senior students who have been in your shoes. Get 1-on-1 mentorship, resume reviews, and interview preparation to land your dream job.
          </p>
        </div>
        <GraduationCap 
          size={120} 
          color="var(--accent-primary)" 
          style={{ position: 'absolute', right: '-20px', bottom: '-20px', opacity: 0.2 }} 
        />
      </div>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', overflowX: 'auto', paddingBottom: '8px' }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className="glass-panel"
            style={{
              padding: '8px 24px',
              borderRadius: '24px',
              whiteSpace: 'nowrap',
              background: selectedCategory === cat ? 'var(--accent-primary)' : 'var(--glass-bg)',
              color: selectedCategory === cat ? 'white' : 'var(--text-primary)',
              border: selectedCategory === cat ? 'none' : '1px solid var(--glass-border)',
              cursor: 'pointer'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
        {MOCK_SENIORS.map((senior, idx) => (
          <motion.div
            key={senior.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-panel"
            style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}
          >
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '16px' }}>
              <img 
                src={senior.image} 
                alt={senior.name} 
                style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--bg-secondary)', border: '2px solid var(--accent-primary)' }} 
              />
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>{senior.name}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '4px' }}>{senior.role}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#fbbf24', fontSize: '12px' }}>
                  <Star size={12} fill="#fbbf24" />
                  <span>{senior.rating}</span>
                  <span style={{ color: 'var(--text-secondary)' }}>({senior.reviews} reviews)</span>
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', fontSize: '13px', color: 'var(--text-secondary)' }}>
              <Award size={16} />
              {senior.major}
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px', flex: 1 }}>
              {senior.skills.map(skill => (
                <span key={skill} style={{ fontSize: '12px', padding: '4px 12px', background: 'rgba(139, 92, 246, 0.1)', color: 'var(--accent-primary)', borderRadius: '12px' }}>
                  {skill}
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: 'auto' }}>
              <button 
                className="btn-primary" 
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                onClick={() => alert(`Booking session with ${senior.name}...`)}
              >
                <CalendarIcon size={16} /> Book
              </button>
              <button 
                className="glass-panel" 
                style={{ padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                onClick={() => alert(`Opening chat with ${senior.name}...`)}
              >
                <MessageCircle size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div style={{ marginTop: '48px', padding: '24px', background: 'var(--accent-gradient)', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px', color: 'white' }}>Want to become a mentor?</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)' }}>Share your experience and help juniors navigate their career path.</p>
        </div>
        <button style={{ background: 'white', color: 'var(--accent-primary)', padding: '12px 24px', borderRadius: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', border: 'none' }}>
          Apply Now <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
