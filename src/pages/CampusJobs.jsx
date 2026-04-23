import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Search, Star, DollarSign, Clock, MapPin, ChevronRight, Plus, Filter, TrendingUp } from 'lucide-react';

const INITIAL_GIGS = [
  { id: 1, title: 'Need a video editor for YouTube vlog', price: '₹500', time: 'Urgent', type: 'Remote', tags: ['Video Editing', 'Premiere Pro'], user: 'Rahul K.', avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Rahul' },
  { id: 2, title: 'React JS Tutor for Midterms', price: '₹200/hr', time: 'This Week', type: 'Campus Library', tags: ['Tutoring', 'React', 'JS'], user: 'Sarah M.', avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Sarah' },
  { id: 3, title: 'Design a logo for my startup', price: '₹1000', time: 'Flexible', type: 'Remote', tags: ['Graphic Design', 'Illustrator'], user: 'Alex D.', avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Alex' },
  { id: 4, title: 'Need someone to run errands', price: '₹150', time: 'Today', type: 'North Campus', tags: ['Errands', 'Physical'], user: 'Priya S.', avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Priya' },
];

const MOCK_FREELANCERS = [
  { id: 1, name: 'Ananya V.', skill: 'Graphic Designer', rating: 4.9, jobs: 24, avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Ananya' },
  { id: 2, name: 'David L.', skill: 'Full Stack Dev', rating: 5.0, jobs: 12, avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=David' },
  { id: 3, name: 'Kiran R.', skill: 'Video Editor', rating: 4.8, jobs: 45, avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Kiran' },
];

import { AnimatePresence } from 'framer-motion';

export default function CampusJobs() {
  const [activeTab, setActiveTab] = useState('find-work');
  const [search, setSearch] = useState('');
  const [gigs, setGigs] = useState(INITIAL_GIGS);
  
  // Post Gig Modal State
  const [showModal, setShowModal] = useState(false);
  const [newGig, setNewGig] = useState({ title: '', price: '', tags: '' });

  const handlePostGig = (e) => {
    e.preventDefault();
    if (!newGig.title || !newGig.price) return;
    
    const gig = {
      id: Date.now(),
      title: newGig.title,
      price: newGig.price.includes('₹') ? newGig.price : `₹${newGig.price}`,
      time: 'Just Now',
      type: 'Campus',
      tags: newGig.tags ? newGig.tags.split(',').map(t => t.trim()) : ['General'],
      user: 'Deepesh',
      avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=deepesh'
    };
    
    setGigs([gig, ...gigs]);
    setShowModal(false);
    setNewGig({ title: '', price: '', tags: '' });
  };

  const filteredGigs = gigs.filter(gig => 
    gig.title.toLowerCase().includes(search.toLowerCase()) || 
    gig.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="responsive-padding" style={{ padding: '32px', height: '100%', display: 'flex', flexDirection: 'column', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px', marginBottom: '32px' }}>
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="responsive-title" style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>
            Campus<span className="gradient-text">Jobs</span> 💼
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
            Earn money, build your portfolio, and hire your peers.
          </p>
        </motion.div>
        
        <div style={{ display: 'flex', gap: '16px' }}>
          <button className="btn-icon" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
            <Filter size={18} />
          </button>
          <button className="btn-primary" onClick={() => setShowModal(true)} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Plus size={16} />
            <span>Post a Gig</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', overflowX: 'auto', whiteSpace: 'nowrap' }}>
        {['Find Work', 'Hire Students', 'My Projects'].map((tab) => {
          const tabId = tab.toLowerCase().replace(' ', '-');
          const isActive = activeTab === tabId;
          return (
            <button
              key={tabId}
              onClick={() => setActiveTab(tabId)}
              style={{
                padding: '10px 24px',
                borderRadius: '100px',
                fontSize: '15px',
                fontWeight: isActive ? '600' : '500',
                backgroundColor: isActive ? 'rgba(139, 92, 246, 0.15)' : 'transparent',
                color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                border: 'none',
                transition: 'all 0.2s',
                cursor: 'pointer'
              }}
            >
              {tab}
            </button>
          );
        })}
      </div>

      <div className="responsive-flex" style={{ display: 'flex', gap: '24px', flex: 1, minHeight: 0 }}>
        
        {/* Main Content: Gig List */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto', paddingRight: '8px', flex: 2.5 }}>
          
          <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'var(--bg-tertiary)', padding: '0 20px', borderRadius: '16px', border: '1px solid var(--border-color)', height: '56px' }}>
            <Search size={20} color="var(--text-secondary)" />
            <input 
              type="text" 
              placeholder="Search for skills, jobs, or tags..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ flex: 1, backgroundColor: 'transparent', border: 'none', color: 'white', padding: '0 16px', outline: 'none', fontSize: '15px' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <AnimatePresence>
              {filteredGigs.map((gig, i) => (
              <motion.div 
                key={gig.id}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="glass-panel"
                style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseOver={e => e.currentTarget.style.borderColor = 'var(--accent-primary)'}
                onMouseOut={e => e.currentTarget.style.borderColor = 'var(--border-color)'}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: 'var(--text-primary)' }}>{gig.title}</h3>
                    <div style={{ display: 'flex', gap: '16px', color: 'var(--text-secondary)', fontSize: '13px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={14} /> {gig.time}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={14} /> {gig.type}</span>
                    </div>
                  </div>
                  <div style={{ padding: '8px 16px', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981', borderRadius: '100px', fontWeight: '700', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {gig.price}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  {gig.tags.map(tag => (
                    <span key={tag} style={{ padding: '4px 12px', backgroundColor: 'var(--bg-secondary)', borderRadius: '6px', fontSize: '12px', color: 'var(--text-secondary)', border: '1px solid var(--border-color)' }}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', paddingTop: '16px', borderTop: '1px solid var(--border-color)', flexWrap: 'wrap', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img src={gig.avatar} alt={gig.user} style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--bg-secondary)' }} />
                    <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Posted by <span style={{ color: 'var(--text-primary)', fontWeight: '500' }}>{gig.user}</span></span>
                  </div>
                  <button className="btn-primary" style={{ padding: '8px 20px', fontSize: '14px' }}>Apply Now</button>
                </div>
              </motion.div>
              ))}
            </AnimatePresence>
            {filteredGigs.length === 0 && (
              <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
                No gigs found matching your search.
              </div>
            )}
          </div>
        </motion.div>

        {/* Right Sidebar: Stats & Top Freelancers */}
        <div className="responsive-sidebar" style={{ display: 'flex', flexDirection: 'column', gap: '24px', flex: 1 }}>
          
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass-panel" style={{ padding: '24px', background: 'var(--accent-gradient)', color: 'white', border: 'none' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '500', marginBottom: '8px', opacity: 0.9 }}>Your Earnings</h3>
            <div style={{ fontSize: '42px', fontWeight: '700', marginBottom: '16px', letterSpacing: '-1px' }}>₹1250.00</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', backgroundColor: 'rgba(255,255,255,0.2)', padding: '8px 16px', borderRadius: '12px', width: 'fit-content' }}>
              <TrendingUp size={16} />
              <span>+ ₹500 this week</span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Star size={18} color="#f59e0b" fill="#f59e0b" /> Top Students
              </h3>
              <span style={{ fontSize: '12px', color: 'var(--accent-primary)', cursor: 'pointer' }}>View All</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {MOCK_FREELANCERS.map((person) => (
                <div key={person.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img src={person.avatar} alt={person.name} style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--bg-tertiary)' }} />
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '2px' }}>{person.name}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{person.skill}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end' }}>
                      <Star size={12} color="#f59e0b" fill="#f59e0b" /> {person.rating}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{person.jobs} jobs</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>

      {/* Post Gig Modal */}
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
              <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '24px' }}>Post a New Gig</h2>
              
              <form onSubmit={handlePostGig} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Gig Title</label>
                  <input 
                    type="text" required value={newGig.title} onChange={e => setNewGig({...newGig, title: e.target.value})}
                    placeholder="e.g. Need a logo designed"
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)', color: 'white', outline: 'none' }}
                  />
                </div>
                
                <div className="responsive-flex" style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Budget / Price</label>
                    <input 
                      type="text" required value={newGig.price} onChange={e => setNewGig({...newGig, price: e.target.value})}
                      placeholder="₹500 or ₹200/hr"
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)', color: 'white', outline: 'none' }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Tags (comma separated)</label>
                    <input 
                      type="text" value={newGig.tags} onChange={e => setNewGig({...newGig, tags: e.target.value})}
                      placeholder="Design, Logo"
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)', color: 'white', outline: 'none' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
                  <button type="button" onClick={() => setShowModal(false)} style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer' }}>Cancel</button>
                  <button type="submit" className="btn-primary" style={{ padding: '10px 24px' }}>Post Gig</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

