import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Hash, Search, Plus, Send, MoreVertical, MessageSquare, Image as ImageIcon, Smile, Pin, Users as UsersIcon } from 'lucide-react';

const CHANNELS = [
  { id: 'general', name: 'general-chat', unread: 0 },
  { id: 'cs2026', name: 'cs-batch-2026', unread: 3 },
  { id: 'startups', name: 'startup-ideas', unread: 12 },
  { id: 'events', name: 'campus-events', unread: 0 },
  { id: 'gaming', name: 'gaming-lounge', unread: 5 },
];

const MOCK_MESSAGES = [
  { id: 1, user: 'Alex D.', avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Alex', time: '10:23 AM', text: 'Does anyone have the syllabus for Physics 101?' },
  { id: 2, user: 'Priya S.', avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Priya', time: '10:25 AM', text: 'Yeah, I uploaded it to the AI Teacher shared files yesterday! Check there.' },
  { id: 3, user: 'Rahul K.', avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Rahul', time: '10:30 AM', text: 'Is the Hackathon still happening this weekend?' },
  { id: 4, user: 'Deepesh', avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=deepesh', time: '10:32 AM', text: 'Yes! Registrations close tonight though, so hurry up.', isMe: true },
];

const ONLINE_USERS = [
  { name: 'Prof. Sharma', role: 'Mentor', status: 'online', avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Sharma' },
  { name: 'Sarah M.', role: 'Student', status: 'online', avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Sarah' },
  { name: 'Kiran R.', role: 'Student', status: 'idle', avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Kiran' },
  { name: 'Ananya V.', role: 'Student', status: 'offline', avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Ananya' },
];

export default function Community() {
  const [activeChannel, setActiveChannel] = useState('cs2026');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState(MOCK_MESSAGES);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setMessages([...messages, {
      id: Date.now(),
      user: 'Deepesh',
      avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=deepesh',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: input,
      isMe: true
    }]);
    setInput('');
  };

  return (
    <div className="responsive-flex" style={{ display: 'flex', height: '100%', width: '100%' }}>
      
      {/* Channels Sidebar */}
      <div className="hide-on-mobile-flex responsive-sidebar" style={{ width: '260px', backgroundColor: 'var(--bg-secondary)', borderRight: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '24px 20px', borderBottom: '1px solid var(--border-color)' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', letterSpacing: '-0.5px' }}>Stanford Hub 🎓</h2>
        </div>

        <div style={{ padding: '20px', flex: 1, overflowY: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Channels</span>
            <button className="btn-icon" style={{ width: '24px', height: '24px', background: 'transparent', border: 'none' }}><Plus size={14} /></button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {CHANNELS.map(channel => {
              const isActive = activeChannel === channel.id;
              return (
                <button
                  key={channel.id}
                  onClick={() => setActiveChannel(channel.id)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '10px 12px', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.1s',
                    backgroundColor: isActive ? 'rgba(139, 92, 246, 0.15)' : 'transparent',
                    color: isActive ? 'white' : 'var(--text-secondary)',
                    fontWeight: isActive ? '500' : '400', border: 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Hash size={16} color={isActive ? 'var(--accent-primary)' : 'var(--text-secondary)'} />
                    <span>{channel.name}</span>
                  </div>
                  {channel.unread > 0 && !isActive && (
                    <div style={{ backgroundColor: 'var(--accent-primary)', color: 'white', fontSize: '11px', fontWeight: '700', padding: '2px 6px', borderRadius: '10px' }}>
                      {channel.unread}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-primary)', position: 'relative' }}>
        
        {/* Chat Header */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--bg-secondary)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Hash size={24} color="var(--text-secondary)" />
            <h3 style={{ fontSize: '18px', fontWeight: '600' }}>{CHANNELS.find(c => c.id === activeChannel)?.name}</h3>
          </div>
          <div style={{ display: 'flex', gap: '16px', color: 'var(--text-secondary)' }}>
            <Pin size={20} cursor="pointer" />
            <UsersIcon size={20} cursor="pointer" />
            <Search size={20} cursor="pointer" />
          </div>
        </div>

        {/* Mobile Channels Bar */}
        <div className="show-on-mobile" style={{ display: 'none', gap: '8px', overflowX: 'auto', padding: '12px 16px', backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', whiteSpace: 'nowrap' }}>
          {CHANNELS.map(channel => (
            <button 
              key={channel.id}
              onClick={() => setActiveChannel(channel.id)}
              style={{ padding: '6px 12px', borderRadius: '100px', backgroundColor: activeChannel === channel.id ? 'var(--accent-primary)' : 'var(--bg-tertiary)', color: 'white', border: 'none', fontSize: '12px', fontWeight: '500' }}
            >
              # {channel.name}
              {channel.unread > 0 && <span style={{ marginLeft: '6px', background: 'white', color: 'var(--accent-primary)', padding: '2px 6px', borderRadius: '10px', fontSize: '10px' }}>{channel.unread}</span>}
            </button>
          ))}
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {messages.map((msg, i) => (
            <motion.div 
              key={msg.id}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              style={{ display: 'flex', gap: '16px', flexDirection: msg.isMe ? 'row-reverse' : 'row' }}
            >
              <img src={msg.avatar} alt={msg.user} style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--bg-tertiary)', flexShrink: 0 }} />
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: msg.isMe ? 'flex-end' : 'flex-start', maxWidth: '70%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexDirection: msg.isMe ? 'row-reverse' : 'row' }}>
                  <span style={{ fontSize: '14px', fontWeight: '600' }}>{msg.user}</span>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{msg.time}</span>
                </div>
                <div style={{ 
                  padding: '12px 16px', 
                  borderRadius: '16px', 
                  borderTopLeftRadius: msg.isMe ? '16px' : '4px',
                  borderTopRightRadius: msg.isMe ? '4px' : '16px',
                  backgroundColor: msg.isMe ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
                  color: 'white',
                  fontSize: '15px',
                  lineHeight: '1.5'
                }}>
                  {msg.text}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Input Bar */}
        <div style={{ padding: '24px', backgroundColor: 'var(--bg-primary)' }}>
          <form onSubmit={handleSend} style={{ display: 'flex', alignItems: 'center', backgroundColor: 'var(--bg-tertiary)', borderRadius: '12px', border: '1px solid var(--border-color)', padding: '8px 16px' }}>
            <button type="button" className="btn-icon" style={{ background: 'transparent', border: 'none' }}><Plus size={20} /></button>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Message #${CHANNELS.find(c => c.id === activeChannel)?.name}`}
              style={{ flex: 1, backgroundColor: 'transparent', border: 'none', color: 'white', padding: '0 16px', outline: 'none', fontSize: '15px' }}
            />
            <button type="button" className="btn-icon" style={{ background: 'transparent', border: 'none' }}><Smile size={20} /></button>
            <button type="submit" className="btn-icon" style={{ background: 'transparent', border: 'none', color: input.trim() ? 'var(--accent-primary)' : 'var(--text-secondary)' }}><Send size={20} /></button>
          </form>
        </div>
      </div>

      {/* Online Users Sidebar */}
      <div className="hide-on-mobile-flex responsive-sidebar" style={{ width: '260px', backgroundColor: 'var(--bg-secondary)', borderLeft: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '24px 20px', borderBottom: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '600' }}>Members — 1,024</h3>
        </div>
        <div style={{ padding: '20px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Mentors & Faculty</div>
          {ONLINE_USERS.filter(u => u.role === 'Mentor').map((user, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
              <div style={{ position: 'relative' }}>
                <img src={user.avatar} alt={user.name} style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--bg-tertiary)' }} />
                <div style={{ position: 'absolute', bottom: 0, right: 0, width: '10px', height: '10px', borderRadius: '50%', border: '2px solid var(--bg-secondary)', backgroundColor: '#10b981' }} />
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: '500', color: 'var(--accent-secondary)' }}>{user.name}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Available to chat</div>
              </div>
            </div>
          ))}

          <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '8px' }}>Online Students</div>
          {ONLINE_USERS.filter(u => u.role === 'Student').map((user, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', opacity: user.status === 'offline' ? 0.5 : 1 }}>
              <div style={{ position: 'relative' }}>
                <img src={user.avatar} alt={user.name} style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--bg-tertiary)' }} />
                {user.status !== 'offline' && (
                  <div style={{ position: 'absolute', bottom: 0, right: 0, width: '10px', height: '10px', borderRadius: '50%', border: '2px solid var(--bg-secondary)', backgroundColor: user.status === 'online' ? '#10b981' : '#f59e0b' }} />
                )}
              </div>
              <div style={{ fontSize: '14px', fontWeight: '500' }}>{user.name}</div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}
