import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PenTool, Sparkles, BookHeart, ChevronLeft, Save, Feather, Wand2 } from 'lucide-react';

const COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#ec4899', '#f59e0b'];

const INITIAL_ENTRIES = [
  { id: 1, date: 'April 20, 2026', text: "Today was a solid day. Finally finished the React project I've been working on for weeks. It felt amazing to see everything come together. Still need to study for physics tomorrow, but feeling pretty good overall.", type: 'manual', color: '#3b82f6' },
  { id: 2, date: 'April 19, 2026', text: "A challenging day. The algorithms assignment was much harder than I expected. However, I managed to get help from Sarah in the library, which made a huge difference. I'm grateful for good friends. Note to self: start assignments earlier next time.", type: 'auto', color: '#ec4899' }
];

export default function Diary() {
  const [entries, setEntries] = useState(INITIAL_ENTRIES);
  const [mode, setMode] = useState(null); // 'manual' or 'auto'
  
  const [manualText, setManualText] = useState('');
  const [creativeText, setCreativeText] = useState('');
  const [creativeSubject, setCreativeSubject] = useState('');
  
  const [form, setForm] = useState({
    rating: '7',
    highlight: '',
    challenge: '',
    gratitude: '',
    learned: '',
    better: '',
    tomorrow: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);

  const saveCreative = () => {
    if (!creativeText.trim()) return;
    const newEntry = {
      id: Date.now(),
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      subject: creativeSubject,
      text: creativeText,
      type: 'creative',
      color: selectedColor
    };
    setEntries([newEntry, ...entries]);
    setMode(null);
    setCreativeText('');
    setCreativeSubject('');
  };

  const enhanceCreative = async () => {
    if (!creativeText.trim()) return;
    setIsGenerating(true);
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) throw new Error("API key missing");
      const prompt = `You are a brilliant creative writing assistant. Take the following draft of a story or poem and enhance it. Make it more descriptive, poetic, and engaging, but keep the original meaning and tone.\n\nDraft:\n${creativeText}`;
      
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ role: 'user', parts: [{ text: prompt }] }] })
      });
      const data = await res.json();
      const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (aiText) setCreativeText(aiText);
    } catch(err) {
      alert("Failed to enhance text.");
    } finally {
      setIsGenerating(false);
    }
  };

  const saveManual = () => {
    if (!manualText.trim()) return;
    const newEntry = {
      id: Date.now(),
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      text: manualText,
      type: 'manual',
      color: selectedColor
    };
    setEntries([newEntry, ...entries]);
    setMode(null);
    setManualText('');
  };

  const generateAuto = async () => {
    if (!form.highlight || !form.challenge) return;
    setIsGenerating(true);
    
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) throw new Error("API key missing");

      const prompt = `Write a first-person, reflective, beautifully written diary entry (1 paragraph) for a student based on these inputs:
      Overall Day Rating (1-10): ${form.rating}
      Highlight of the day: ${form.highlight}
      Biggest challenge: ${form.challenge}
      Something they are grateful for: ${form.gratitude}
      What they learned: ${form.learned}
      What could have been better: ${form.better}
      Feeling about tomorrow: ${form.tomorrow}
      Keep it sounding natural, personal, and like a real human wrote it.`;

      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ role: 'user', parts: [{ text: prompt }] }] })
      });
      
      const data = await res.json();
      const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Today was an interesting day...";
      
      const newEntry = {
        id: Date.now(),
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        text: aiText,
        type: 'auto',
        color: selectedColor
      };
      
      setEntries([newEntry, ...entries]);
      setMode(null);
      setForm({ rating: '7', highlight: '', challenge: '', gratitude: '', learned: '', better: '', tomorrow: '' });
    } catch (err) {
      alert("Failed to generate diary entry. Check console or API key.");
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="responsive-padding" style={{ padding: '32px', height: '100%', display: 'flex', flexDirection: 'column', maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '32px' }}>
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="responsive-title" style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>
            My<span className="gradient-text">Diary</span> 📖
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
            Reflect on your day, manually or with AI assistance.
          </p>
        </motion.div>
        
        {mode === null && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            <button onClick={() => setMode('manual')} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: 'linear-gradient(135deg, #3b82f6, #2dd4bf)', border: 'none', color: 'white' }}>
              <PenTool size={16} />
              <span>Write Manually</span>
            </button>
            <button onClick={() => setMode('auto')} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, #8b5cf6, #ec4899)' }}>
              <Sparkles size={16} />
              <span>Auto-Fill with AI</span>
            </button>
            <button onClick={() => setMode('creative')} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: 'linear-gradient(135deg, #a855f7, #ec4899)', border: 'none', color: 'white' }}>
              <Feather size={16} />
              <span>Creative Corner</span>
            </button>
          </div>
        )}
      </div>

      <div style={{ flex: 1, overflowY: 'auto', paddingRight: '8px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        <AnimatePresence mode="wait">
          {mode === 'manual' && (
            <motion.div key="manual" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
                <button onClick={() => setMode(null)} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', display: 'flex', alignItems: 'center' }}><ChevronLeft size={20} /> Back</button>
                <span>•</span>
                <span>Manual Entry</span>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Theme Color:</span>
                {COLORS.map(c => (
                  <div key={c} onClick={() => setSelectedColor(c)} style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: c, cursor: 'pointer', border: selectedColor === c ? '2px solid white' : '2px solid transparent', transform: selectedColor === c ? 'scale(1.1)' : 'scale(1)', transition: 'all 0.2s' }} />
                ))}
              </div>
              <textarea 
                value={manualText} onChange={e => setManualText(e.target.value)}
                placeholder="Dear Diary..."
                style={{ width: '100%', minHeight: '200px', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)', color: 'white', outline: 'none', fontSize: '16px', lineHeight: '1.6', fontFamily: 'inherit', resize: 'vertical' }}
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button onClick={saveManual} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Save size={16} /> Save Entry</button>
              </div>
            </motion.div>
          )}

          {mode === 'auto' && (
            <motion.div key="auto" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ec4899' }}>
                <button onClick={() => setMode(null)} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', display: 'flex', alignItems: 'center' }}><ChevronLeft size={20} /> Back</button>
                <span>•</span>
                <Sparkles size={16} />
                <span style={{ fontWeight: '500' }}>AI Assistant</span>
              </div>
              <p style={{ color: 'var(--text-secondary)' }}>Just answer a few quick questions, and I'll write a beautiful reflection for you.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>How would you rate today? (1-10)</label>
                  <input type="range" min="1" max="10" value={form.rating} onChange={e => setForm({...form, rating: e.target.value})} style={{ width: '100%' }} />
                  <div style={{ textAlign: 'center', marginTop: '8px', fontWeight: 'bold' }}>{form.rating}/10</div>
                </div>
                
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>What was the highlight of your day?</label>
                  <input type="text" value={form.highlight} onChange={e => setForm({...form, highlight: e.target.value})} placeholder="e.g., Nailed my presentation" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)', color: 'white', outline: 'none' }} />
                </div>
                
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>What was the biggest challenge?</label>
                  <input type="text" value={form.challenge} onChange={e => setForm({...form, challenge: e.target.value})} placeholder="e.g., Waking up early, feeling stressed about exams" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)', color: 'white', outline: 'none' }} />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>What are you grateful for today?</label>
                  <input type="text" value={form.gratitude} onChange={e => setForm({...form, gratitude: e.target.value})} placeholder="e.g., Coffee, my friends" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)', color: 'white', outline: 'none' }} />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>What did you learn today?</label>
                  <input type="text" value={form.learned} onChange={e => setForm({...form, learned: e.target.value})} placeholder="e.g., A new React hook" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)', color: 'white', outline: 'none' }} />
                </div>
                
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>What could you have done better?</label>
                  <input type="text" value={form.better} onChange={e => setForm({...form, better: e.target.value})} placeholder="e.g., Less scrolling" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)', color: 'white', outline: 'none' }} />
                </div>
                
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>How are you feeling about tomorrow?</label>
                  <input type="text" value={form.tomorrow} onChange={e => setForm({...form, tomorrow: e.target.value})} placeholder="e.g., Anxious but ready" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)', color: 'white', outline: 'none' }} />
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginTop: '8px' }}>
                  <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Theme Color:</span>
                  {COLORS.map(c => (
                    <div key={c} onClick={() => setSelectedColor(c)} style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: c, cursor: 'pointer', border: selectedColor === c ? '2px solid white' : '2px solid transparent', transform: selectedColor === c ? 'scale(1.1)' : 'scale(1)', transition: 'all 0.2s' }} />
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
                <button onClick={generateAuto} disabled={isGenerating || !form.highlight || !form.challenge} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, #8b5cf6, #ec4899)', opacity: (isGenerating || !form.highlight || !form.challenge) ? 0.5 : 1 }}>
                  <Sparkles size={16} /> 
                  {isGenerating ? 'Generating...' : 'Generate & Save Entry'}
                </button>
              </div>
            </motion.div>
          )}

          {mode === 'creative' && (
            <motion.div key="creative" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#8b5cf6' }}>
                <button onClick={() => setMode(null)} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', display: 'flex', alignItems: 'center' }}><ChevronLeft size={20} /> Back</button>
                <span>•</span>
                <Feather size={16} />
                <span style={{ fontWeight: '500' }}>Creative Corner</span>
              </div>
              <p style={{ color: 'var(--text-secondary)' }}>Write a story, a poem, or just let your thoughts flow. Use the AI wand to magically enhance your draft.</p>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Theme Color:</span>
                {COLORS.map(c => (
                  <div key={c} onClick={() => setSelectedColor(c)} style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: c, cursor: 'pointer', border: selectedColor === c ? '2px solid white' : '2px solid transparent', transform: selectedColor === c ? 'scale(1.1)' : 'scale(1)', transition: 'all 0.2s' }} />
                ))}
              </div>
              <input 
                type="text" value={creativeSubject} onChange={e => setCreativeSubject(e.target.value)}
                placeholder="Title or Subject of your masterpiece..."
                style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)', color: 'white', outline: 'none', fontSize: '16px', fontWeight: '500', fontFamily: 'inherit' }}
              />
              <textarea 
                value={creativeText} onChange={e => setCreativeText(e.target.value)}
                placeholder="Once upon a time..."
                style={{ width: '100%', minHeight: '250px', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)', color: 'white', outline: 'none', fontSize: '16px', lineHeight: '1.6', fontFamily: 'inherit', resize: 'vertical' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                <button onClick={enhanceCreative} disabled={isGenerating || !creativeText.trim()} className="btn-icon" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#8b5cf6', background: 'rgba(139, 92, 246, 0.1)', padding: '10px 20px', borderRadius: '8px', opacity: (isGenerating || !creativeText.trim()) ? 0.5 : 1 }}>
                  <Wand2 size={16} /> {isGenerating ? 'Enhancing...' : 'Enhance Draft (AI)'}
                </button>
                <button onClick={saveCreative} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)' }}><Save size={16} /> Save Masterpiece</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
            <BookHeart size={20} /> Past Entries
          </h2>
          
          <AnimatePresence>
            {entries.map((entry, i) => (
              <motion.div 
                key={entry.id}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-panel" style={{ padding: '24px', borderLeft: `4px solid ${entry.color || 'var(--border-color)'}` }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
                  <div>
                    {entry.subject && <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '4px' }}>{entry.subject}</h3>}
                    <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{entry.date}</div>
                  </div>
                  <div style={{ fontSize: '12px', padding: '4px 10px', borderRadius: '100px', backgroundColor: entry.type === 'auto' ? 'rgba(236, 72, 153, 0.1)' : entry.type === 'creative' ? 'rgba(139, 92, 246, 0.1)' : 'var(--bg-tertiary)', color: entry.type === 'auto' ? '#ec4899' : entry.type === 'creative' ? '#8b5cf6' : 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {entry.type === 'auto' ? <Sparkles size={12} /> : entry.type === 'creative' ? <Feather size={12} /> : <PenTool size={12} />}
                    {entry.type === 'auto' ? 'AI Generated' : entry.type === 'creative' ? 'Creative Story' : 'Manual'}
                  </div>
                </div>
                <p style={{ fontSize: '15px', lineHeight: '1.6', color: 'var(--text-secondary)', whiteSpace: 'pre-wrap' }}>
                  {entry.text}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
