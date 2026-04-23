import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, FileText, BrainCircuit, ListChecks, HelpCircle, Save, Loader2 } from 'lucide-react';

const FORMATS = [
  { id: 'flashcards', name: 'Flashcards', icon: FileText, desc: 'Key terms and definitions' },
  { id: 'quiz', name: 'Multiple Choice Quiz', icon: ListChecks, desc: 'Test your knowledge' },
  { id: 'mindmap', name: 'Mind Map', icon: BrainCircuit, desc: 'Conceptual breakdown' },
  { id: 'practice-paper', name: 'Practice Paper', icon: HelpCircle, desc: 'Long-form questions' }
];

export default function PracticeHub() {
  const [topic, setTopic] = useState('');
  const [sourceText, setSourceText] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('flashcards');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState(null);

  const handleGenerate = async () => {
    if (!topic && !sourceText) return;
    setIsGenerating(true);
    setResult(null);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) throw new Error("API key missing");

      const inputContext = sourceText ? `Source Text: ${sourceText}` : `Topic: ${topic}`;
      
      let prompt = `You are an expert tutor creating study materials. Based on the following input, generate a ${selectedFormat}.\n\n${inputContext}\n\n`;
      
      if (selectedFormat === 'flashcards') {
        prompt += 'Format the output as a list of Flashcards. Each flashcard should have a "Q:" (Question/Term) and an "A:" (Answer/Definition). Keep them concise.';
      } else if (selectedFormat === 'quiz') {
        prompt += 'Format the output as a Multiple Choice Quiz with 5 questions. Provide 4 options (A, B, C, D) for each question, and clearly indicate the correct answer at the end of each question.';
      } else if (selectedFormat === 'mindmap') {
        prompt += 'Format the output as a textual Mind Map using markdown bullet points and indentation to show hierarchical relationships between concepts. Start with a central main topic.';
      } else if (selectedFormat === 'practice-paper') {
        prompt += 'Format the output as a Practice Paper with 3 short-answer questions and 2 long-essay questions. Provide a brief grading rubric or key points expected in the answers at the end.';
      }

      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ role: 'user', parts: [{ text: prompt }] }] })
      });
      
      const data = await res.json();
      const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (aiText) {
        setResult(aiText);
      } else {
        throw new Error('No response from AI');
      }
    } catch (err) {
      alert('Failed to generate practice material. ' + err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="responsive-padding" style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 className="responsive-title" style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Target color="var(--accent-primary)" size={32} />
          Practice <span className="gradient-text">Hub</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>Generate custom study materials, quizzes, and flashcards in seconds using AI.</p>
      </div>

      <div className="responsive-flex" style={{ display: 'flex', gap: '32px', flex: 1, alignItems: 'flex-start' }}>
        
        {/* Left Column: Input Form */}
        <div className="glass-panel" style={{ flex: 1, padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div>
            <label style={{ display: 'block', fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>What do you want to practice?</label>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '16px' }}>Provide a topic OR paste your source notes/text.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <input 
                  type="text" 
                  value={topic}
                  onChange={e => { setTopic(e.target.value); if(e.target.value) setSourceText(''); }}
                  placeholder="Enter a topic (e.g. Photosynthesis, Machine Learning)"
                  style={{ width: '100%', padding: '16px', borderRadius: '12px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'white', outline: 'none' }}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }} />
                <span style={{ color: 'var(--text-secondary)', fontSize: '12px', fontWeight: 'bold' }}>OR</span>
                <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }} />
              </div>
              <div>
                <textarea 
                  value={sourceText}
                  onChange={e => { setSourceText(e.target.value); if(e.target.value) setTopic(''); }}
                  placeholder="Paste your notes or source text here..."
                  style={{ width: '100%', minHeight: '150px', padding: '16px', borderRadius: '12px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'white', outline: 'none', resize: 'vertical' }}
                />
              </div>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>Select Output Format</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
              {FORMATS.map(fmt => (
                <div 
                  key={fmt.id}
                  onClick={() => setSelectedFormat(fmt.id)}
                  style={{ 
                    padding: '16px', 
                    borderRadius: '12px', 
                    background: selectedFormat === fmt.id ? 'rgba(139, 92, 246, 0.15)' : 'var(--bg-tertiary)', 
                    border: selectedFormat === fmt.id ? '2px solid var(--accent-primary)' : '2px solid transparent',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: selectedFormat === fmt.id ? 'var(--accent-primary)' : 'var(--text-primary)' }}>
                    <fmt.icon size={20} />
                    <span style={{ fontWeight: '600' }}>{fmt.name}</span>
                  </div>
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{fmt.desc}</span>
                </div>
              ))}
            </div>
          </div>

          <button 
            className="btn-primary" 
            onClick={handleGenerate}
            disabled={isGenerating || (!topic && !sourceText)}
            style={{ padding: '16px', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', opacity: (isGenerating || (!topic && !sourceText)) ? 0.5 : 1 }}
          >
            {isGenerating ? (
              <>
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                  <Loader2 size={20} />
                </motion.div>
                Generating...
              </>
            ) : (
              <><Target size={20} /> Generate Material</>
            )}
          </button>
        </div>

        {/* Right Column: Results */}
        <div className="glass-panel responsive-sidebar" style={{ flex: 1, padding: '24px', display: 'flex', flexDirection: 'column', minHeight: '500px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>Generated Result</h2>
            {result && (
              <button className="btn-icon" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }} title="Save to Notebook">
                <Save size={18} />
              </button>
            )}
          </div>

          <div style={{ flex: 1, overflowY: 'auto', background: 'var(--bg-tertiary)', borderRadius: '12px', padding: '24px', border: '1px solid var(--border-color)' }}>
            {!result && !isGenerating ? (
              <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', textAlign: 'center' }}>
                <BrainCircuit size={48} opacity={0.2} style={{ marginBottom: '16px' }} />
                <p>Select a format and click generate to create your custom study material.</p>
              </div>
            ) : isGenerating ? (
              <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)', textAlign: 'center' }}>
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                  <Loader2 size={48} style={{ marginBottom: '16px' }} />
                </motion.div>
                <p>AI is crafting your material... This takes a few seconds.</p>
              </div>
            ) : (
              <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6', fontSize: '15px' }}>
                {result}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
