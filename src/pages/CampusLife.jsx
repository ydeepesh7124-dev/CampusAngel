import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, TrendingUp, CheckCircle, CalendarOff, PartyPopper, Users, FileText, ChevronRight, PieChart, Download } from 'lucide-react';

const ACADEMIC_DATA = {
  gpa: 3.8,
  credits: 72,
  totalCredits: 120,
  attendance: 85,
  subjects: [
    { name: 'Data Structures', attendance: 90, marks: 'A', totalClasses: 40, attended: 36 },
    { name: 'Computer Networks', attendance: 75, marks: 'B+', totalClasses: 36, attended: 27 },
    { name: 'Operating Systems', attendance: 88, marks: 'A-', totalClasses: 42, attended: 37 },
    { name: 'Database Systems', attendance: 92, marks: 'A', totalClasses: 38, attended: 35 },
  ]
};

const CAMPUS_EVENTS = [
  { id: 1, title: 'Spring Tech Fest 2026', date: 'April 25, 2026', type: 'Event', icon: PartyPopper, color: '#ec4899' },
  { id: 2, title: 'AI Ethics Seminar', date: 'April 28, 2026', type: 'Seminar', icon: Users, color: '#3b82f6' },
  { id: 3, title: 'Coding Club Meetup', date: 'May 2, 2026', type: 'Club', icon: FileText, color: '#8b5cf6' }
];

const HOLIDAYS = [
  { name: 'Labor Day', date: 'May 1, 2026' },
  { name: 'Summer Break Begins', date: 'May 15, 2026' }
];

const CLUBS = [
  { name: 'Hackathon Society', role: 'Member', members: 120 },
  { name: 'Robotics Club', role: 'Lead', members: 85 }
];

export default function CampusLife() {
  const [activeTab, setActiveTab] = useState('academics');

  return (
    <div className="responsive-padding" style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
      
      <div style={{ marginBottom: '32px' }}>
        <h1 className="responsive-title" style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Building2 color="var(--accent-primary)" size={32} />
          Campus <span className="gradient-text">Life</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>Your centralized portal for academics, attendance, and campus activities.</p>
      </div>

      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '32px' }}>
        <button
          onClick={() => setActiveTab('academics')}
          className="glass-panel"
          style={{
            padding: '12px 24px',
            borderRadius: '12px',
            background: activeTab === 'academics' ? 'var(--accent-gradient)' : 'var(--glass-bg)',
            color: activeTab === 'academics' ? 'white' : 'var(--text-primary)',
            border: activeTab === 'academics' ? 'none' : '1px solid var(--glass-border)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontWeight: '500'
          }}
        >
          <TrendingUp size={20} /> Academics & Marks
        </button>
        <button
          onClick={() => setActiveTab('activities')}
          className="glass-panel"
          style={{
            padding: '12px 24px',
            borderRadius: '12px',
            background: activeTab === 'activities' ? 'var(--accent-gradient)' : 'var(--glass-bg)',
            color: activeTab === 'activities' ? 'white' : 'var(--text-primary)',
            border: activeTab === 'activities' ? 'none' : '1px solid var(--glass-border)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontWeight: '500'
          }}
        >
          <PartyPopper size={20} /> Events & Clubs
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'academics' ? (
          <motion.div key="academics" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
            {/* Academic Overview Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '32px' }}>
              <div className="glass-panel" style={{ padding: '24px', borderLeft: '4px solid #3b82f6' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <TrendingUp color="#3b82f6" size={24} />
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>Current GPA</h3>
                </div>
                <div style={{ fontSize: '36px', fontWeight: 'bold' }}>{ACADEMIC_DATA.gpa}<span style={{ fontSize: '16px', color: 'var(--text-secondary)' }}>/4.0</span></div>
              </div>

              <div className="glass-panel" style={{ padding: '24px', borderLeft: '4px solid #10b981', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <CheckCircle color="#10b981" size={24} />
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>Overall Attendance</h3>
                </div>
                <div style={{ fontSize: '36px', fontWeight: 'bold', color: ACADEMIC_DATA.attendance < 75 ? '#ef4444' : 'inherit' }}>
                  {ACADEMIC_DATA.attendance}%
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 'auto', paddingTop: '16px' }}>
                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Target: Min 75%</p>
                  <a href="https://erp.university.edu/attendance" target="_blank" rel="noreferrer" style={{ fontSize: '12px', color: 'var(--accent-primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    Detailed Logs <ChevronRight size={12} />
                  </a>
                </div>
              </div>

              <div className="glass-panel" style={{ padding: '24px', borderLeft: '4px solid #8b5cf6' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <PieChart color="#8b5cf6" size={24} />
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>Credits Earned</h3>
                </div>
                <div style={{ fontSize: '36px', fontWeight: 'bold' }}>{ACADEMIC_DATA.credits}<span style={{ fontSize: '16px', color: 'var(--text-secondary)' }}>/{ACADEMIC_DATA.totalCredits}</span></div>
                <div style={{ height: '6px', background: 'var(--bg-tertiary)', borderRadius: '4px', marginTop: '12px', overflow: 'hidden' }}>
                  <div style={{ width: `${(ACADEMIC_DATA.credits / ACADEMIC_DATA.totalCredits) * 100}%`, height: '100%', background: '#8b5cf6' }} />
                </div>
              </div>
            </div>

            {/* Subject wise marks and attendance */}
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>Subject Performance</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              {ACADEMIC_DATA.subjects.map((sub, idx) => (
                <div key={idx} className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 'bold' }}>{sub.name}</h3>
                    <span style={{ fontWeight: 'bold', fontSize: '18px', color: 'var(--accent-primary)', background: 'var(--bg-tertiary)', padding: '4px 12px', borderRadius: '8px' }}>Grade {sub.marks}</span>
                  </div>
                  
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Attendance: {sub.attended}/{sub.totalClasses} classes</span>
                      <span style={{ fontWeight: 'bold', color: sub.attendance < 75 ? '#ef4444' : '#10b981' }}>{sub.attendance}%</span>
                    </div>
                    <div style={{ height: '8px', background: 'var(--bg-secondary)', borderRadius: '4px', overflow: 'hidden', marginBottom: '12px' }}>
                      <motion.div 
                        initial={{ width: 0 }} animate={{ width: `${sub.attendance}%` }} 
                        style={{ height: '100%', background: sub.attendance < 75 ? '#ef4444' : '#10b981', borderRadius: '4px' }} 
                      />
                    </div>
                    {(() => {
                      const target = 75;
                      const current = (sub.attended / sub.totalClasses) * 100;
                      if (current >= target) {
                        const canMiss = Math.floor((sub.attended / (target / 100)) - sub.totalClasses);
                        return (
                          <div style={{ fontSize: '13px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <CheckCircle size={14} /> {canMiss > 0 ? `Safe to miss ${canMiss} class${canMiss > 1 ? 'es' : ''}` : 'Exactly on track'}
                          </div>
                        );
                      } else {
                        const needed = Math.ceil(((target / 100) * sub.totalClasses - sub.attended) / (1 - (target / 100)));
                        return (
                          <div style={{ fontSize: '13px', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <TrendingUp size={14} /> Need {needed} class{needed > 1 ? 'es' : ''} to reach {target}%
                          </div>
                        );
                      }
                    })()}
                  </div>
                  
                  <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Official University Portal</span>
                    <a href={`https://university.edu/syllabus/${sub.name.replace(/\s+/g, '-').toLowerCase()}.pdf`} target="_blank" rel="noreferrer" className="btn-primary" style={{ padding: '6px 12px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}>
                      <Download size={14} /> Syllabus
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div key="activities" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
            
            {/* Upcoming Events */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <PartyPopper size={20} color="#ec4899" /> Upcoming Events
              </h2>
              {CAMPUS_EVENTS.map(event => (
                <div key={event.id} className="glass-panel" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '16px', borderLeft: `4px solid ${event.color}` }}>
                  <div style={{ background: 'var(--bg-tertiary)', padding: '12px', borderRadius: '12px' }}>
                    <event.icon color={event.color} size={20} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontWeight: 'bold', fontSize: '16px' }}>{event.title}</h4>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{event.date}</p>
                  </div>
                  <button className="btn-icon" style={{ background: 'transparent', color: 'var(--text-secondary)' }}><ChevronRight size={20} /></button>
                </div>
              ))}
            </div>

            {/* Clubs & Societies */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Users size={20} color="#3b82f6" /> My Clubs
              </h2>
              {CLUBS.map((club, idx) => (
                <div key={idx} className="glass-panel" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '4px' }}>{club.name}</h4>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{club.members} Members</p>
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#3b82f6', background: 'rgba(59, 130, 246, 0.1)', padding: '4px 12px', borderRadius: '12px' }}>
                    {club.role}
                  </span>
                </div>
              ))}
              <button className="glass-panel" style={{ padding: '16px', textAlign: 'center', color: 'var(--text-secondary)', borderStyle: 'dashed', cursor: 'pointer', background: 'transparent' }}>
                + Explore More Clubs
              </button>
            </div>

            {/* Holidays List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CalendarOff size={20} color="#10b981" /> Holidays
              </h2>
              <div className="glass-panel" style={{ padding: '8px', display: 'flex', flexDirection: 'column' }}>
                {HOLIDAYS.map((holiday, idx) => (
                  <div key={idx} style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: idx !== HOLIDAYS.length - 1 ? '1px solid var(--border-color)' : 'none' }}>
                    <span style={{ fontWeight: '500' }}>{holiday.name}</span>
                    <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{holiday.date}</span>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
