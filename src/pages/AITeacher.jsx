import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Paperclip, Sparkles, BookOpen, Clock, Zap, FileText, ChevronRight, Target, UploadCloud, X, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';

const SUGGESTED_TOPICS = [
  { id: 'upload', icon: FileText, title: 'Upload Notes', desc: 'Convert to flashcards' },
  { id: 'explain', icon: Zap, title: 'Explain Concept', desc: 'Like I am 5 years old' },
  { id: 'plan', icon: BookOpen, title: 'Study Plan', desc: 'Create a schedule' },
  { id: 'exam', icon: Clock, title: 'Mock Exam', desc: 'Test my knowledge' },
];

const INITIAL_MESSAGES = [
  {
    role: 'assistant',
    content: "Hi Deepesh! I'm your AI Teacher. We have a Data Structures exam coming up in 3 days. Would you like to review Binary Trees, or upload some new notes to create flashcards?",
    time: '10:00 AM'
  }
];

const MOCK_FLASHCARDS = [
  { q: "What is a Binary Search Tree (BST)?", a: "A tree data structure where each node has at most two children, and the left child is always less than the parent, while the right is greater." },
  { q: "What is the time complexity of searching in a balanced BST?", a: "O(log n) because you eliminate half the remaining tree at each step." },
  { q: "What is the difference between a Tree and a Graph?", a: "A tree is a special type of graph with no cycles (loops) and is fully connected." }
];

export default function AITeacher() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // UI States
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('idle'); // idle, uploading, done
  const [showFlashcards, setShowFlashcards] = useState(false);
  const [activeCard, setActiveCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isGoalExpanded, setIsGoalExpanded] = useState(true);

  const generateAIResponse = async (userText) => {
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) return "API key is missing! Please check your .env file.";

      // To guarantee no API role sequence errors, we send just the current prompt + system instructions
      const prompt = `You are CampusAngel, a brilliant, friendly, and highly motivating AI Teacher for a student named Deepesh. Keep responses concise, clear, and educational. Use markdown.\n\nStudent asks: ${userText}`;

      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }]
        })
      });
      
      const data = await res.json();
      if (data.candidates && data.candidates[0].content.parts[0].text) {
        return data.candidates[0].content.parts[0].text;
      }
      console.error("Gemini API Error:", data);
      return `API Error: ${data.error?.message || JSON.stringify(data)}`;
    } catch (err) {
      console.error(err);
      return `Connection Error: ${err.message}`;
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;
    
    const userText = input;
    const userMsg = { role: 'user', content: userText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');
    setIsTyping(true);
    
    // Call Gemini!
    const aiResponseText = await generateAIResponse(userText);
    
    setMessages(prev => [...prev, {
      role: 'assistant',
      content: aiResponseText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    setIsTyping(false);
  };

  const handleActionClick = (id) => {
    if (id === 'upload') {
      setShowUploadModal(true);
    } else {
      setInput(`I want to ${SUGGESTED_TOPICS.find(t => t.id === id).title.toLowerCase()}`);
    }
  };

  const simulateUpload = () => {
    setUploadStatus('uploading');
    setTimeout(() => {
      setUploadStatus('done');
      setTimeout(() => {
        setShowUploadModal(false);
        setUploadStatus('idle');
        setMessages(prev => [...prev, 
          { role: 'user', content: "Uploaded: 'Data_Structures_Ch3.pdf'", time: new Date().toLocaleTimeString() },
          { role: 'assistant', content: "I've analyzed 'Data_Structures_Ch3.pdf' and generated 3 flashcards for you to review. Want to try them now?", time: new Date().toLocaleTimeString() }
        ]);
        setShowFlashcards(true);
      }, 1500);
    }, 2000);
  };

  return (
    <div className="responsive-padding" style={{ padding: '32px', height: '100%', display: 'flex', flexDirection: 'column', maxWidth: '1200px', margin: '0 auto', width: '100%', position: 'relative' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="responsive-title" style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>
            Good Morning, Deepesh <span className="gradient-text">✨</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
            What are we focusing on today?
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="glass-panel" style={{ padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '12px' }}
        >
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981', boxShadow: '0 0 10px #10b981' }} />
          <span style={{ fontSize: '14px', fontWeight: '500' }}>AI Online</span>
        </motion.div>
      </div>

      <div className="responsive-flex" style={{ display: 'flex', gap: '24px', flex: 1, minHeight: 0 }}>
        
        {/* Main Chat Area */}
        <div className="glass-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
          
          {/* Flashcards Overlay */}
          <AnimatePresence>
            {showFlashcards && (
              <motion.div 
                initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }}
                style={{ position: 'absolute', inset: 0, backgroundColor: 'var(--bg-secondary)', zIndex: 10, display: 'flex', flexDirection: 'column', padding: '32px' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <h2 style={{ fontSize: '20px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Sparkles color="var(--accent-primary)" /> Flashcards: Data Structures Ch 3
                  </h2>
                  <button className="btn-icon" onClick={() => setShowFlashcards(false)}><X size={18} /></button>
                </div>

                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', perspective: '1000px' }}>
                  <motion.div 
                    animate={{ rotateX: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6, type: 'spring' }}
                    onClick={() => setIsFlipped(!isFlipped)}
                    style={{ 
                      width: '100%', maxWidth: '500px', height: '300px', cursor: 'pointer', position: 'relative',
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    {/* Front of Card */}
                    <div style={{ 
                      position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
                      backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--accent-primary)', borderRadius: '24px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px', textAlign: 'center',
                      boxShadow: '0 10px 30px rgba(139,92,246,0.1)'
                    }}>
                      <p style={{ fontSize: '24px', fontWeight: '500' }}>{MOCK_FLASHCARDS[activeCard].q}</p>
                      <span style={{ position: 'absolute', bottom: '20px', fontSize: '12px', color: 'var(--text-secondary)' }}>Click to flip</span>
                    </div>

                    {/* Back of Card */}
                    <div style={{ 
                      position: 'absolute', inset: 0, backfaceVisibility: 'hidden', transform: 'rotateX(180deg)',
                      background: 'var(--accent-gradient)', borderRadius: '24px', color: 'white',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px', textAlign: 'center',
                      boxShadow: '0 10px 30px rgba(139,92,246,0.3)'
                    }}>
                      <p style={{ fontSize: '20px', lineHeight: '1.6' }}>{MOCK_FLASHCARDS[activeCard].a}</p>
                    </div>
                  </motion.div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '24px' }}>
                  <button 
                    disabled={activeCard === 0} 
                    onClick={() => { setActiveCard(p => p - 1); setIsFlipped(false); }}
                    className="btn-primary" style={{ background: 'var(--bg-tertiary)', color: 'white', opacity: activeCard === 0 ? 0.5 : 1 }}
                  >
                    Previous
                  </button>
                  <span style={{ display: 'flex', alignItems: 'center', fontSize: '14px', fontWeight: '500' }}>
                    {activeCard + 1} / {MOCK_FLASHCARDS.length}
                  </span>
                  <button 
                    disabled={activeCard === MOCK_FLASHCARDS.length - 1} 
                    onClick={() => { setActiveCard(p => p + 1); setIsFlipped(false); }}
                    className="btn-primary" style={{ opacity: activeCard === MOCK_FLASHCARDS.length - 1 ? 0.5 : 1 }}
                  >
                    Next
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {messages.map((msg, i) => (
              <motion.div 
                key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start' }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', flexDirection: msg.role === 'user' ? 'row-reverse' : 'row', maxWidth: '80%' }}>
                  <div style={{ 
                    width: '36px', height: '36px', borderRadius: '12px', 
                    background: msg.role === 'user' ? 'var(--bg-tertiary)' : 'var(--accent-gradient)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                  }}>
                    {msg.role === 'user' ? 
                      <img src="https://api.dicebear.com/7.x/notionists/svg?seed=deepesh" alt="user" style={{ width: '24px' }}/> : 
                      <Sparkles color="white" size={18} />
                    }
                  </div>
                  <div style={{
                    padding: '16px 20px', borderRadius: '16px',
                    backgroundColor: msg.role === 'user' ? 'var(--bg-tertiary)' : 'rgba(139, 92, 246, 0.1)',
                    border: msg.role === 'user' ? '1px solid var(--border-color)' : '1px solid rgba(139, 92, 246, 0.2)',
                    color: 'var(--text-primary)', lineHeight: '1.6', fontSize: '15px'
                  }}>
                    {msg.content}
                  </div>
                </div>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '8px', margin: msg.role === 'user' ? '0 48px 0 0' : '0 0 0 48px' }}>
                  {msg.time}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Input Area */}
          <div style={{ padding: '20px', borderTop: '1px solid var(--glass-border)', backgroundColor: 'rgba(0,0,0,0.2)' }}>
            
            {/* Persistent Suggested Topics */}
            <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '4px', whiteSpace: 'nowrap' }}>
              {SUGGESTED_TOPICS.map((topic) => (
                <button 
                  key={topic.id}
                  onClick={() => handleActionClick(topic.id)}
                  style={{ 
                    display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', 
                    backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', 
                    borderRadius: '100px', color: 'var(--text-secondary)',
                    transition: 'all 0.2s', fontSize: '13px', fontWeight: '500', cursor: 'pointer'
                  }}
                  onMouseOver={e => { e.currentTarget.style.borderColor = 'var(--accent-primary)'; e.currentTarget.style.color = 'white'; }}
                  onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                >
                  <topic.icon size={14} color="var(--accent-primary)" />
                  {topic.title}
                </button>
              ))}
            </div>

            <form onSubmit={handleSend} style={{ display: 'flex', gap: '12px' }}>
              <button type="button" className="btn-icon" onClick={() => setShowUploadModal(true)}>
                <Paperclip size={18} />
              </button>
              <input 
                type="text" value={input} onChange={(e) => setInput(e.target.value)}
                placeholder="Ask your AI teacher anything..." 
                style={{ 
                  flex: 1, backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', 
                  borderRadius: '12px', padding: '0 20px', color: 'white', outline: 'none', fontSize: '15px'
                }}
              />
              <button type="submit" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>Send</span>
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="responsive-sidebar" style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass-panel" style={{ padding: '20px' }}>
            <h3 
              onClick={() => setIsGoalExpanded(!isGoalExpanded)}
              style={{ fontSize: '16px', marginBottom: isGoalExpanded ? '16px' : '0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', userSelect: 'none' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Target size={18} color="var(--accent-primary)" /> Current Goal
              </div>
              {isGoalExpanded ? <ChevronUp size={16} color="var(--text-secondary)" /> : <ChevronDown size={16} color="var(--text-secondary)" />}
            </h3>
            
            <AnimatePresence>
              {isGoalExpanded && (
                <motion.div 
                  initial={{ height: 0, opacity: 0, marginTop: 0 }} 
                  animate={{ height: 'auto', opacity: 1, marginTop: '16px' }} 
                  exit={{ height: 0, opacity: 0, marginTop: 0 }} 
                  style={{ overflow: 'hidden' }}
                >
                  <div style={{ padding: '12px', backgroundColor: 'var(--bg-tertiary)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                    <div style={{ fontWeight: '500', marginBottom: '4px' }}>Data Structures Midterm</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '12px' }}>In 3 days</div>
                    <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--bg-secondary)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ width: '65%', height: '100%', background: 'var(--accent-gradient)' }} />
                    </div>
                    <div style={{ fontSize: '11px', textAlign: 'right', marginTop: '6px', color: 'var(--text-secondary)' }}>65% Prepared</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="glass-panel" style={{ padding: '20px', flex: 1 }}>
            <h3 style={{ fontSize: '16px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BookOpen size={18} color="var(--accent-secondary)" /> Recent Files
            </h3>
            {['Physics_Ch4_Notes.pdf', 'Math_Assignment_2.docx', 'CS_Syllabus.pdf'].map((file, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: i !== 2 ? '1px solid var(--border-color)' : 'none', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ padding: '8px', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
                    <FileText size={16} color="var(--text-secondary)" />
                  </div>
                  <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{file}</span>
                </div>
                <ChevronRight size={14} color="var(--text-secondary)" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Upload Modal Overlay */}
      <AnimatePresence>
        {showUploadModal && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onClick={() => uploadStatus === 'idle' && setShowUploadModal(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="glass-panel" style={{ width: '400px', padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'var(--bg-secondary)' }}
            >
              {uploadStatus === 'idle' && (
                <>
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'rgba(139, 92, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                    <UploadCloud size={32} color="var(--accent-primary)" />
                  </div>
                  <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px' }}>Upload your Notes</h3>
                  <p style={{ color: 'var(--text-secondary)', textAlign: 'center', fontSize: '14px', marginBottom: '32px' }}>
                    Upload your class notes or PDF to automatically generate study flashcards and summaries.
                  </p>
                  
                  <div 
                    style={{ width: '100%', padding: '40px', border: '2px dashed var(--border-color)', borderRadius: '16px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s' }}
                    onMouseOver={e => e.currentTarget.style.borderColor = 'var(--accent-primary)'}
                    onMouseOut={e => e.currentTarget.style.borderColor = 'var(--border-color)'}
                    onClick={simulateUpload}
                  >
                    <p style={{ fontSize: '14px', color: 'var(--accent-primary)', fontWeight: '500' }}>Click to browse files</p>
                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>PDF, DOCX, TXT up to 50MB</p>
                  </div>
                </>
              )}

              {uploadStatus === 'uploading' && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 0' }}>
                  <motion.div 
                    animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    style={{ width: '48px', height: '48px', borderRadius: '50%', border: '4px solid var(--border-color)', borderTopColor: 'var(--accent-primary)', marginBottom: '24px' }}
                  />
                  <h3 style={{ fontSize: '18px', fontWeight: '500', marginBottom: '8px' }}>AI is analyzing notes...</h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Extracting key concepts</p>
                </div>
              )}

              {uploadStatus === 'done' && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 0' }}>
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ marginBottom: '24px' }}>
                    <CheckCircle2 size={48} color="#10b981" />
                  </motion.div>
                  <h3 style={{ fontSize: '18px', fontWeight: '500', marginBottom: '8px' }}>Done!</h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Flashcards generated.</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

