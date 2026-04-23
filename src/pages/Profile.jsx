import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Phone, MapPin, BookOpen, Save, Camera, Calendar, Clock, GraduationCap, Edit3, X } from 'lucide-react';

const AVATARS = [
  { style: 'notionists', seed: 'Deepesh', label: 'Boy 1' },
  { style: 'notionists', seed: 'Felix', label: 'Boy 2' },
  { style: 'notionists', seed: 'Aneka', label: 'Girl 1' },
  { style: 'notionists', seed: 'Jocelyn', label: 'Girl 2' },
  { style: 'adventurer', seed: 'Jack', label: 'Boy 3' },
  { style: 'adventurer', seed: 'Sarah', label: 'Girl 3' },
  { style: 'avataaars', seed: 'Brian', label: 'Boy 4' },
  { style: 'avataaars', seed: 'Jessica', label: 'Girl 4' },
];

export default function Profile() {
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('campusangel_profile');
    if (saved) return JSON.parse(saved);
    return {
      name: 'Deepesh',
      college: 'Stanford University',
      major: 'Computer Science',
      phone: '+1 (555) 123-4567',
      bio: 'Passionate about coding, AI, and building cool things.',
      gender: 'Male',
      startYear: '2023',
      endYear: '2027',
      semester: '4th Semester',
      avatarStyle: 'notionists',
      avatarSeed: 'Deepesh',
      caId: `CA-${Math.floor(100000 + Math.random() * 900000)}`
    };
  });

  const [isEditing, setIsEditing] = useState(() => !localStorage.getItem('campusangel_profile'));
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);

  const handleSave = () => {
    localStorage.setItem('campusangel_profile', JSON.stringify(profile));
    setIsEditing(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="responsive-padding" style={{ padding: '32px', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
      <motion.h1 className="responsive-title" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>
        My <span className="gradient-text">Profile</span> 🎓
      </motion.h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>Manage your personal details and college info.</p>

      {!isEditing && (
        <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} style={{ marginBottom: '32px', maxWidth: '400px', margin: '0 auto 32px auto', background: 'var(--accent-gradient)', padding: '2px', borderRadius: '20px', boxShadow: '0 12px 32px rgba(139, 92, 246, 0.3)' }}>
          <div style={{ background: 'var(--bg-secondary)', borderRadius: '18px', padding: '32px 24px', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            
            <div style={{ position: 'relative', zIndex: 2, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <img src={`https://api.dicebear.com/7.x/${profile.avatarStyle}/svg?seed=${profile.avatarSeed}`} alt="ID Avatar" style={{ width: '140px', height: '140px', borderRadius: '50%', backgroundColor: 'var(--bg-tertiary)', border: '4px solid var(--accent-primary)', marginBottom: '16px' }} />
              <h2 style={{ fontSize: '28px', fontWeight: '700', margin: 0, letterSpacing: '-0.5px' }}>{profile.name}</h2>
              <p style={{ color: 'var(--accent-primary)', fontWeight: '600', fontSize: '16px', margin: '4px 0 24px 0' }}>{profile.college}</p>
              
              <div style={{ background: 'var(--bg-tertiary)', padding: '16px', borderRadius: '12px', marginBottom: '24px', width: '100%', border: '1px solid var(--border-color)' }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '12px', margin: 0, letterSpacing: '1px' }}>CA ID</p>
                <p style={{ fontFamily: 'monospace', fontSize: '20px', letterSpacing: '2px', fontWeight: 'bold', color: 'var(--accent-primary)', margin: 0 }}>{profile.caId}</p>
              </div>

              <div className="responsive-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', width: '100%', textAlign: 'left', background: 'var(--bg-tertiary)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                <div><span style={{ color: 'var(--text-secondary)', fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase' }}>Major</span><br/><span style={{ fontWeight: '500' }}>{profile.major}</span></div>
                <div><span style={{ color: 'var(--text-secondary)', fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase' }}>Semester</span><br/><span style={{ fontWeight: '500' }}>{profile.semester}</span></div>
                <div><span style={{ color: 'var(--text-secondary)', fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase' }}>Gender</span><br/><span style={{ fontWeight: '500' }}>{profile.gender}</span></div>
                <div><span style={{ color: 'var(--text-secondary)', fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase' }}>Batch</span><br/><span style={{ fontWeight: '500' }}>{profile.startYear} - {profile.endYear}</span></div>
              </div>
            </div>
            
            <button onClick={() => setIsEditing(true)} style={{ position: 'absolute', top: '16px', right: '16px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', cursor: 'pointer', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, transition: '0.2s', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              <Edit3 size={18} />
            </button>

            <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)', borderRadius: '50%', zIndex: 1 }} />
            <div style={{ position: 'absolute', bottom: '-50px', left: '-50px', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)', borderRadius: '50%', zIndex: 1 }} />
          </div>
        </motion.div>
      )}

      <AnimatePresence>
        {isEditing && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '600', margin: 0 }}>Edit Details</h2>
              {localStorage.getItem('campusangel_profile') && (
                <button onClick={() => setIsEditing(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <X size={20} /> Cancel
                </button>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', flexWrap: 'wrap', gap: '24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                <div style={{ position: 'relative', width: '100px', height: '100px' }}>
                  <div style={{ width: '100%', height: '100%', borderRadius: '50%', backgroundColor: 'var(--bg-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: '2px solid var(--accent-primary)' }}>
                    <img src={`https://api.dicebear.com/7.x/${profile.avatarStyle}/svg?seed=${profile.avatarSeed}`} alt="avatar" style={{ width: '80%', height: '80%' }} />
                  </div>
                  <button onClick={() => setShowAvatarPicker(!showAvatarPicker)} style={{ position: 'absolute', bottom: '0', right: '0', background: 'var(--accent-primary)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
                    <Camera size={16} />
                  </button>
                </div>
              </div>
              
              {showAvatarPicker && (
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} style={{ flex: 1, background: 'var(--bg-tertiary)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '12px' }}>Choose an Avatar</p>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    {AVATARS.map((av, i) => (
                      <div key={i} onClick={() => { setProfile({...profile, avatarStyle: av.style, avatarSeed: av.seed}); setShowAvatarPicker(false); }} style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--bg-secondary)', cursor: 'pointer', border: profile.avatarSeed === av.seed ? '2px solid var(--accent-primary)' : '2px solid transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                        <img src={`https://api.dicebear.com/7.x/${av.style}/svg?seed=${av.seed}`} alt={av.label} style={{ width: '80%', height: '80%' }} />
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', marginBottom: '8px', fontSize: '14px' }}><User size={16}/> Full Name</label>
                <input type="text" value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'white', outline: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', marginBottom: '8px', fontSize: '14px' }}><User size={16}/> Gender</label>
                <select value={profile.gender} onChange={e => setProfile({...profile, gender: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'white', outline: 'none' }}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', marginBottom: '8px', fontSize: '14px' }}><MapPin size={16}/> College Name</label>
                <input type="text" value={profile.college} onChange={e => setProfile({...profile, college: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'white', outline: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', marginBottom: '8px', fontSize: '14px' }}><BookOpen size={16}/> Major / Course</label>
                <input type="text" value={profile.major} onChange={e => setProfile({...profile, major: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'white', outline: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', marginBottom: '8px', fontSize: '14px' }}><Calendar size={16}/> Batch Start Year</label>
                <input type="text" value={profile.startYear} onChange={e => setProfile({...profile, startYear: e.target.value})} placeholder="e.g. 2023" style={{ width: '100%', padding: '12px', borderRadius: '8px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'white', outline: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', marginBottom: '8px', fontSize: '14px' }}><GraduationCap size={16}/> Graduation Year</label>
                <input type="text" value={profile.endYear} onChange={e => setProfile({...profile, endYear: e.target.value})} placeholder="e.g. 2027" style={{ width: '100%', padding: '12px', borderRadius: '8px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'white', outline: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', marginBottom: '8px', fontSize: '14px' }}><Clock size={16}/> Current Semester</label>
                <input type="text" value={profile.semester} onChange={e => setProfile({...profile, semester: e.target.value})} placeholder="e.g. 4th Semester" style={{ width: '100%', padding: '12px', borderRadius: '8px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'white', outline: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', marginBottom: '8px', fontSize: '14px' }}><Phone size={16}/> Phone Number</label>
                <input type="tel" value={profile.phone} onChange={e => setProfile({...profile, phone: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'white', outline: 'none' }} />
              </div>
            </div>
            
            <div>
              <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '8px', fontSize: '14px' }}>Bio</label>
              <textarea value={profile.bio} onChange={e => setProfile({...profile, bio: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'white', outline: 'none', minHeight: '100px', resize: 'vertical' }} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={handleSave} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Save size={16} /> Save Profile
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

