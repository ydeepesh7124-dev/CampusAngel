import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Star, Users, PlusCircle, Clock, Video, TrendingUp, Search } from 'lucide-react';

const CATEGORIES = ['All', 'Coding', 'YouTube Editing', 'UI/UX Design', 'Personal Development'];

const MOCK_COURSES = [
  {
    id: 1,
    title: 'Mastering React & Framer Motion',
    instructor: 'Alex Johnson',
    price: '₹2,499',
    rating: 4.8,
    students: 1240,
    duration: '8 hours',
    category: 'Coding',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 2,
    title: 'UI/UX Design for Beginners',
    instructor: 'Sarah Smith',
    price: 'Free',
    rating: 4.9,
    students: 3450,
    duration: '5 hours',
    category: 'UI/UX Design',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 3,
    title: 'Data Structures in Python',
    instructor: 'Michael Chen',
    price: '₹1,499',
    rating: 4.7,
    students: 890,
    duration: '12 hours',
    category: 'Coding',
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bfce8?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 4,
    title: 'Complete YouTube Editing Masterclass',
    instructor: 'Emma Davis',
    price: '₹999',
    rating: 4.6,
    students: 560,
    duration: '3 hours',
    category: 'YouTube Editing',
    image: 'https://images.unsplash.com/photo-1475721025505-c310b42b0321?w=500&auto=format&fit=crop&q=60'
  }
];

export default function Skillverse() {
  const [activeTab, setActiveTab] = useState('explore');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredCourses = MOCK_COURSES.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="responsive-padding" style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '40px', background: 'var(--bg-tertiary)', padding: '40px', borderRadius: '24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 className="responsive-title" style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '16px' }}>
            Welcome to <span className="gradient-text">Skillverse</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', lineHeight: '1.6', fontSize: '16px' }}>
            The ultimate student-to-student learning platform. Learn high-demand skills from your peers or monetize your own expertise by creating and selling courses.
          </p>
        </div>
        <BookOpen 
          size={180} 
          color="var(--accent-primary)" 
          style={{ position: 'absolute', right: '-20px', top: '-40px', opacity: 0.1, transform: 'rotate(15deg)' }} 
        />
      </div>

      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '32px' }}>
        <button
          onClick={() => setActiveTab('explore')}
          className="glass-panel"
          style={{
            padding: '12px 24px',
            borderRadius: '12px',
            background: activeTab === 'explore' ? 'var(--accent-gradient)' : 'var(--glass-bg)',
            color: activeTab === 'explore' ? 'white' : 'var(--text-primary)',
            border: activeTab === 'explore' ? 'none' : '1px solid var(--glass-border)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontWeight: '500'
          }}
        >
          <TrendingUp size={20} /> Explore Courses
        </button>
        <button
          onClick={() => setActiveTab('teach')}
          className="glass-panel"
          style={{
            padding: '12px 24px',
            borderRadius: '12px',
            background: activeTab === 'teach' ? 'var(--accent-gradient)' : 'var(--glass-bg)',
            color: activeTab === 'teach' ? 'white' : 'var(--text-primary)',
            border: activeTab === 'teach' ? 'none' : '1px solid var(--glass-border)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontWeight: '500'
          }}
        >
          <Video size={20} /> Teach & Sell
        </button>
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'explore' ? (
          <div>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '32px', flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ flex: '1 1 300px', position: 'relative' }}>
                <Search size={20} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                <input 
                  type="text" 
                  placeholder="Search skills, courses, or instructors..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ width: '100%', padding: '16px 16px 16px 48px', borderRadius: '12px', border: '1px solid var(--glass-border)', background: 'var(--bg-tertiary)', color: 'white', fontSize: '15px', outline: 'none' }}
                />
              </div>
              <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '4px' }}>
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className="glass-panel"
                    style={{
                      padding: '10px 20px',
                      borderRadius: '20px',
                      whiteSpace: 'nowrap',
                      background: selectedCategory === cat ? 'var(--accent-primary)' : 'var(--glass-bg)',
                      color: selectedCategory === cat ? 'white' : 'var(--text-primary)',
                      border: selectedCategory === cat ? 'none' : '1px solid var(--glass-border)',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {filteredCourses.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
                {filteredCourses.map((course, idx) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="glass-panel"
                    style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', cursor: 'pointer', transition: 'transform 0.2s', ':hover': { transform: 'translateY(-4px)' } }}
                  >
                    <div style={{ position: 'relative', height: '160px', width: '100%' }}>
                      <img src={course.image} alt={course.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(0,0,0,0.6)', padding: '4px 12px', borderRadius: '12px', backdropFilter: 'blur(4px)', fontSize: '12px', fontWeight: 'bold' }}>
                        {course.category}
                      </div>
                    </div>
                    
                    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                      <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px', lineHeight: '1.4' }}>{course.title}</h3>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '16px' }}>by {course.instructor}</p>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Star size={14} fill="#fbbf24" color="#fbbf24" /> {course.rating}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Users size={14} /> {course.students.toLocaleString()}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Clock size={14} /> {course.duration}
                        </span>
                      </div>

                      <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--accent-primary)' }}>
                          {course.price}
                        </span>
                        <button className="btn-primary" style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '14px' }}>
                          Enroll Now
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '64px', color: 'var(--text-secondary)' }}>
                <p style={{ fontSize: '18px' }}>No courses found for "{searchQuery}" in {selectedCategory}.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="glass-panel" style={{ padding: '48px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <div style={{ width: '80px', height: '80px', background: 'var(--accent-gradient)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <PlusCircle size={40} color="white" />
            </div>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '16px' }}>Create Your First Course</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', marginBottom: '32px', lineHeight: '1.6' }}>
              Turn your knowledge into income. Whether it's coding, design, music, or study hacks—there are students waiting to learn from you.
            </p>
            <button className="btn-primary" style={{ padding: '16px 32px', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Video size={20} /> Get Started as Instructor
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', width: '100%', marginTop: '48px', textAlign: 'left' }}>
              <div style={{ padding: '24px', background: 'var(--bg-tertiary)', borderRadius: '16px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>1. Record</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Upload your video lessons or written tutorials easily.</p>
              </div>
              <div style={{ padding: '24px', background: 'var(--bg-tertiary)', borderRadius: '16px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>2. Price</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Set your price or offer it for free to build an audience.</p>
              </div>
              <div style={{ padding: '24px', background: 'var(--bg-tertiary)', borderRadius: '16px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>3. Earn</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Get paid whenever someone enrolls in your premium course.</p>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
