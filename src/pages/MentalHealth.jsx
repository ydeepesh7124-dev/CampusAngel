import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Smile, Frown, Coffee, Phone, MessageCircle, Shield, Sun, Send } from 'lucide-react';

const MOODS = [
  { id: 'great', emoji: '😄', label: 'Great', color: '#10b981' },
  { id: 'good', emoji: '🙂', label: 'Good', color: '#3b82f6' },
  { id: 'okay', emoji: '😐', label: 'Okay', color: '#f59e0b' },
  { id: 'stressed', emoji: '😫', label: 'Stressed', color: '#f97316' },
  { id: 'sad', emoji: '😔', label: 'Low', color: '#ef4444' }
];

const EXPERTS = [
  { name: 'Dr. Emily Chen', title: 'Campus Counselor', status: 'Available', avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Emily' },
  { name: 'Rahul V.', title: 'Peer Listener', status: 'In a session', avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Rahul2' },
  { name: 'Sarah J.', title: 'Peer Listener', status: 'Available', avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=SarahJ' }
];

export default function MentalHealth() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [showMoodSaved, setShowMoodSaved] = useState(false);
  
  // Venting Session State
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleMoodSelect = (moodId) => {
    setSelectedMood(moodId);
    setShowMoodSaved(true);
    setTimeout(() => setShowMoodSaved(false), 3000);
  };

  const startSession = () => {
    setIsSessionActive(true);
    setMessages([{ role: 'assistant', text: "Hi Deepesh. I'm here to listen. You can vent, share your worries, or just talk. What's on your mind today?" }]);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;
    
    const userText = input;
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setInput('');
    setIsTyping(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) throw new Error("API key missing");

      const prompt = `You are a highly empathetic, non-judgmental, and supportive mental health listener for a student named Deepesh. Acknowledge their feelings, be incredibly gentle, and offer mild reassurance. Do not give medical advice. Keep it concise.\n\nStudent says: ${userText}`;

      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ role: 'user', parts: [{ text: prompt }] }] })
      });
      
      const data = await res.json();
      const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm here for you.";
      
      setMessages(prev => [...prev, { role: 'assistant', text: aiText }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', text: "I'm having trouble connecting, but please know I'm thinking of you." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="responsive-padding" style={{ padding: '32px', height: '100%', display: 'flex', flexDirection: 'column', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '32px' }}>
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="responsive-title" style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>
            Safe<span className="gradient-text">Space</span> 💙
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
            Your mental health matters. Take a breath, we are here for you.
          </p>
        </motion.div>
        
        <button className="btn-primary" style={{ backgroundColor: '#ef4444', background: 'none', border: '1px solid #ef4444', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: 'none' }}>
          <Phone size={16} />
          <span>Emergency Helpline</span>
        </button>
      </div>

      <div className="responsive-flex" style={{ display: 'flex', gap: '24px', flex: 1, minHeight: 0 }}>
        
        {/* Left Column */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Daily Check-in */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-panel" style={{ padding: '32px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            {/* Subtle background glow based on mood */}
            <div style={{ 
              position: 'absolute', inset: 0, opacity: 0.1, zIndex: 0, transition: 'background-color 0.5s',
              backgroundColor: selectedMood ? MOODS.find(m => m.id === selectedMood).color : 'transparent' 
            }} />
            
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px' }}>How are you feeling today?</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '24px' }}>Your check-ins are private and help us personalize your support.</p>
              
              <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
                {MOODS.map(mood => (
                  <button
                    key={mood.id}
                    onClick={() => handleMoodSelect(mood.id)}
                    style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
                      padding: '16px', borderRadius: '16px', cursor: 'pointer', transition: 'all 0.2s',
                      backgroundColor: selectedMood === mood.id ? 'var(--bg-tertiary)' : 'transparent',
                      border: selectedMood === mood.id ? `2px solid ${mood.color}` : '2px solid transparent',
                      transform: selectedMood === mood.id ? 'scale(1.05)' : 'scale(1)'
                    }}
                    onMouseOver={e => e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'}
                    onMouseOut={e => e.currentTarget.style.backgroundColor = selectedMood === mood.id ? 'var(--bg-tertiary)' : 'transparent'}
                  >
                    <span style={{ fontSize: '32px' }}>{mood.emoji}</span>
                    <span style={{ fontSize: '13px', fontWeight: '500', color: selectedMood === mood.id ? mood.color : 'var(--text-secondary)' }}>
                      {mood.label}
                    </span>
                  </button>
                ))}
              </div>

              <AnimatePresence>
                {showMoodSaved && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ marginTop: '20px', color: '#10b981', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <Heart size={16} /> Mood logged. You're doing great.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* AI Venting Space */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-panel" style={{ padding: '32px', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ padding: '10px', borderRadius: '12px', backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
                <MessageCircle size={24} />
              </div>
              <div>
                <h2 style={{ fontSize: '18px', fontWeight: '600' }}>Anonymous Vent Space</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Chat with CampusAngel's empathetic AI listener. No judgment, ever.</p>
              </div>
            </div>

            {!isSessionActive ? (
              <div style={{ flex: 1, backgroundColor: 'var(--bg-tertiary)', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '1px dashed var(--border-color)' }}>
                <Sun size={48} color="var(--text-secondary)" style={{ opacity: 0.5, marginBottom: '16px' }} />
                <p style={{ color: 'var(--text-secondary)', textAlign: 'center', maxWidth: '300px', marginBottom: '24px' }}>
                  "Sometimes just typing out what's on your mind can lift a huge weight off your shoulders."
                </p>
                <button onClick={startSession} className="btn-primary" style={{ background: 'linear-gradient(135deg, #3b82f6, #2dd4bf)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MessageCircle size={18} /> Start a Session
                </button>
              </div>
            ) : (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-tertiary)', borderRadius: '12px', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
                <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {messages.map((msg, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                      <div style={{ 
                        maxWidth: '80%', padding: '12px 16px', borderRadius: '16px', 
                        backgroundColor: msg.role === 'user' ? '#3b82f6' : 'var(--bg-secondary)',
                        color: msg.role === 'user' ? 'white' : 'var(--text-primary)',
                        borderTopRightRadius: msg.role === 'user' ? '4px' : '16px',
                        borderTopLeftRadius: msg.role === 'assistant' ? '4px' : '16px',
                        fontSize: '15px', lineHeight: '1.5'
                      }}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {isTyping && <div style={{ color: 'var(--text-secondary)', fontSize: '13px', fontStyle: 'italic' }}>AI is typing...</div>}
                </div>
                <form onSubmit={handleSend} style={{ padding: '16px', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '12px', backgroundColor: 'rgba(0,0,0,0.2)' }}>
                  <input 
                    type="text" value={input} onChange={e => setInput(e.target.value)}
                    placeholder="Type whatever you're feeling..."
                    style={{ flex: 1, backgroundColor: 'transparent', border: 'none', color: 'white', outline: 'none', fontSize: '15px' }}
                  />
                  <button type="submit" className="btn-icon" style={{ background: 'transparent', border: 'none', color: input.trim() ? '#3b82f6' : 'var(--text-secondary)' }}>
                    <Send size={20} />
                  </button>
                </form>
              </div>
            )}
          </motion.div>

        </div>

        {/* Right Column: Human Mentorship */}
        <div className="responsive-sidebar" style={{ width: '350px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <Shield size={20} color="#10b981" />
              <h3 style={{ fontSize: '18px', fontWeight: '600' }}>Human Support</h3>
            </div>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: '1.5' }}>
              Sometimes you just need a real human to talk to. Connect with trained peer listeners or campus professionals.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {EXPERTS.map((expert, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', backgroundColor: 'var(--bg-tertiary)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ position: 'relative' }}>
                      <img src={expert.avatar} alt={expert.name} style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--bg-secondary)' }} />
                      <div style={{ position: 'absolute', bottom: -2, right: -2, width: '12px', height: '12px', borderRadius: '50%', border: '2px solid var(--bg-tertiary)', backgroundColor: expert.status === 'Available' ? '#10b981' : '#f59e0b' }} />
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '600' }}>{expert.name}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{expert.title}</div>
                    </div>
                  </div>
                  {expert.status === 'Available' ? (
                    <button className="btn-icon" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981', border: 'none' }}>
                      <MessageCircle size={16} />
                    </button>
                  ) : (
                    <span style={{ fontSize: '11px', color: '#f59e0b', fontWeight: '500' }}>Busy</span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="glass-panel" style={{ padding: '24px', background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1))' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', color: 'var(--accent-primary)' }}>Daily Motivation</h3>
            <p style={{ fontSize: '15px', lineHeight: '1.6', fontStyle: 'italic', opacity: 0.9 }}>
              "You don't have to have it all figured out to move forward. Just take the next step."
            </p>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
