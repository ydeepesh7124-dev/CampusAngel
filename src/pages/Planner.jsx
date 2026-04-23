import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon, CheckCircle2, Circle, Plus, FileEdit, ChevronLeft, ChevronRight, Trash2, Sparkles, CalendarDays } from 'lucide-react';

const todayDate = new Date();
const todayKey = `${todayDate.getFullYear()}-${todayDate.getMonth() + 1}-${todayDate.getDate()}`;

const inTwoDays = new Date(todayDate);
inTwoDays.setDate(todayDate.getDate() + 2);
const inTwoDaysKey = `${inTwoDays.getFullYear()}-${inTwoDays.getMonth() + 1}-${inTwoDays.getDate()}`;

const inEightDays = new Date(todayDate);
inEightDays.setDate(todayDate.getDate() + 8);
const inEightDaysKey = `${inEightDays.getFullYear()}-${inEightDays.getMonth() + 1}-${inEightDays.getDate()}`;

const INITIAL_TASKS = {
  [todayKey]: [
    { id: 1, text: 'Review Data Structures Flashcards', completed: false, tag: 'Study' },
    { id: 2, text: 'Submit Calculus Assignment', completed: true, tag: 'Homework' },
  ],
  [inTwoDaysKey]: [
    { id: 3, text: 'Apply for Google Summer Internship', completed: false, tag: 'Career' },
  ],
  [inEightDaysKey]: [
    { id: 4, text: 'Data Structures Midterm', completed: false, tag: 'Exam' }
  ]
};

export default function Planner() {
  const [tasksByDate, setTasksByDate] = useState(INITIAL_TASKS);
  const [currentMonth, setCurrentMonth] = useState(new Date(todayDate.getFullYear(), todayDate.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [newTask, setNewTask] = useState('');
  const [notes, setNotes] = useState('My AI Teacher recommended focusing on Binary Search Trees today.\n\nIdeas for CS Project:\n- Smart dorm access system using RFID\n- Campus food delivery app');
  const [isOrganizing, setIsOrganizing] = useState(false);

  const getFormatDateKey = (date) => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  const selectedDateKey = getFormatDateKey(selectedDate);
  const activeTasks = tasksByDate[selectedDateKey] || [];

  const handleAIOrganize = async () => {
    if (!notes.trim()) return;
    setIsOrganizing(true);
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        alert("Please set VITE_GEMINI_API_KEY in your .env file");
        setIsOrganizing(false);
        return;
      }

      const prompt = `You are an AI study assistant. The user has written some quick notes. 
Today's date is ${new Date().toDateString()}.
Extract actionable tasks from these notes and assign them an appropriate date and tag.
Return ONLY a valid JSON array of objects, with no markdown formatting or extra text.
Each object must have:
- "date": Date string in format "YYYY-M-D" (e.g. "2026-4-25" for April 25, 2026). If no date is specified, default to today: "${todayKey}".
- "text": A concise task description.
- "tag": A short 1-2 word category (e.g., "Homework", "Project", "Study").

User's Notes:
${notes}`;

      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: "application/json",
          }
        })
      });

      const data = await res.json();
      if (data.candidates && data.candidates.length > 0) {
        const responseText = data.candidates[0].content.parts[0].text;
        const newTasks = JSON.parse(responseText);
        
        let updatedTasks = { ...tasksByDate };
        newTasks.forEach(task => {
          if (!updatedTasks[task.date]) {
            updatedTasks[task.date] = [];
          }
          updatedTasks[task.date].unshift({
            id: Date.now() + Math.random(),
            text: task.text,
            completed: false,
            tag: task.tag
          });
        });
        setTasksByDate(updatedTasks);
        setNotes(""); 
      }
    } catch (error) {
      console.error("AI Organize failed:", error);
      alert("Failed to organize tasks using AI. Please try again.");
    }
    setIsOrganizing(false);
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    const currentTasks = tasksByDate[selectedDateKey] || [];
    setTasksByDate({
      ...tasksByDate,
      [selectedDateKey]: [{ id: Date.now(), text: newTask, completed: false, tag: 'General' }, ...currentTasks]
    });
    setNewTask('');
  };

  const toggleTask = (id) => {
    const updatedTasks = activeTasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    setTasksByDate({ ...tasksByDate, [selectedDateKey]: updatedTasks });
  };

  const deleteTask = (id) => {
    const updatedTasks = activeTasks.filter(t => t.id !== id);
    setTasksByDate({ ...tasksByDate, [selectedDateKey]: updatedTasks });
  };

  const getDayName = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  const getMonthName = (date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  const blanks = Array.from({ length: firstDayOfMonth }).map((_, i) => <div key={`blank-${i}`} />);
  const days = Array.from({ length: daysInMonth }).map((_, i) => i + 1);

  return (
    <div className="responsive-padding" style={{ padding: '32px', height: '100%', display: 'flex', flexDirection: 'column', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px', marginBottom: '32px' }}>
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="responsive-title" style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>
            Study <span className="gradient-text">Planner</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
            Manage your schedule, tasks, and quick thoughts.
          </p>
        </motion.div>
        
        <button onClick={handleAIOrganize} disabled={isOrganizing} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: isOrganizing ? 0.7 : 1, cursor: isOrganizing ? 'not-allowed' : 'pointer' }}>
          <Sparkles size={16} />
          <span>{isOrganizing ? 'Organizing...' : 'AI Organize'}</span>
        </button>
      </div>

      <div className="responsive-flex" style={{ display: 'flex', gap: '24px', flex: 1, minHeight: 0 }}>
        
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', flex: 1 }}>
          {/* Calendar Widget */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-panel" style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CalendarIcon size={18} color="var(--accent-primary)" /> {getMonthName(currentMonth)}
            </h2>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <button onClick={() => { setCurrentMonth(new Date(todayDate.getFullYear(), todayDate.getMonth(), 1)); setSelectedDate(new Date()); }} style={{ fontSize: '12px', padding: '4px 8px', borderRadius: '6px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)', cursor: 'pointer', transition: '0.2s' }} onMouseOver={e => e.currentTarget.style.color = 'var(--text-primary)'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-secondary)'}>Today</button>
              <button onClick={handlePrevMonth} className="btn-icon" style={{ width: '28px', height: '28px' }}><ChevronLeft size={14} /></button>
              <button onClick={handleNextMonth} className="btn-icon" style={{ width: '28px', height: '28px' }}><ChevronRight size={14} /></button>
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', textAlign: 'center', marginBottom: '8px' }}>
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day, i) => (
              <div key={i} style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: '500' }}>{day}</div>
            ))}
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
            {blanks}
            {days.map((day) => {
              const thisDateKey = `${currentMonth.getFullYear()}-${currentMonth.getMonth() + 1}-${day}`;
              const isToday = todayKey === thisDateKey;
              const isSelected = selectedDateKey === thisDateKey;
              const hasTasks = tasksByDate[thisDateKey] && tasksByDate[thisDateKey].length > 0;
              
              return (
                <div 
                  key={day} 
                  onClick={() => setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day))}
                  style={{ 
                    height: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    borderRadius: '8px', fontSize: '13px', cursor: 'pointer', transition: 'all 0.2s',
                    backgroundColor: isSelected ? 'var(--accent-primary)' : 'transparent',
                    color: isSelected ? 'white' : (isToday ? 'var(--accent-primary)' : 'var(--text-primary)'),
                    border: isSelected ? 'none' : (isToday ? '1px solid var(--accent-secondary)' : '1px solid transparent'),
                    position: 'relative',
                    fontWeight: isToday ? 'bold' : 'normal'
                  }}
                  onMouseOver={e => !isSelected && (e.currentTarget.style.borderColor = 'var(--border-color)')}
                  onMouseOut={e => !isSelected && (e.currentTarget.style.borderColor = isToday ? 'var(--accent-secondary)' : 'transparent')}
                >
                  <span>{day}</span>
                  {hasTasks && !isSelected && <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: isToday ? 'var(--accent-primary)' : 'var(--accent-secondary)', position: 'absolute', bottom: '2px' }} />}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Quick Notes */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', minHeight: '200px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileEdit size={22} color="var(--accent-secondary)" /> Quick Notes
            </h2>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Auto-saving...</span>
          </div>
          <textarea 
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Jot down quick thoughts, ideas, or links here..."
            style={{ 
              flex: 1, width: '100%', backgroundColor: 'transparent', border: 'none', color: 'var(--text-primary)',
              fontSize: '16px', lineHeight: '1.6', outline: 'none', resize: 'none'
            }}
          />
        </motion.div>
        </div>

        {/* Dynamic To-Do List */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="glass-panel" style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CalendarDays size={20} color="#10b981" /> Tasks for {getDayName(selectedDate)}, {selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </h2>
            {selectedDateKey === todayKey && <span style={{ fontSize: '12px', padding: '4px 8px', borderRadius: '12px', backgroundColor: 'rgba(16, 185, 129, 0.2)', color: '#10b981', fontWeight: '500' }}>Today</span>}
          </div>
          
          <form onSubmit={handleAddTask} style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
            <input 
              type="text" 
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder={`Add a task for ${selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}...`} 
              style={{ 
                flex: 1, backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', 
                borderRadius: '10px', padding: '0 16px', color: 'white', outline: 'none', fontSize: '14px'
              }}
            />
            <button type="submit" className="btn-primary" style={{ padding: '10px 16px' }}>
              <Plus size={18} />
            </button>
          </form>

          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', paddingRight: '4px' }}>
            <AnimatePresence mode="popLayout">
              {activeTasks.map(task => (
                <motion.div 
                  layout
                  key={task.id} 
                  initial={{ opacity: 0, scale: 0.9, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  style={{ 
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', 
                    backgroundColor: 'var(--bg-tertiary)', borderRadius: '12px', border: '1px solid var(--border-color)',
                    opacity: task.completed ? 0.6 : 1
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer', flex: 1 }} onClick={() => toggleTask(task.id)}>
                    {task.completed ? <CheckCircle2 color="#10b981" /> : <Circle color="var(--text-secondary)" />}
                    <div>
                      <div style={{ fontSize: '15px', textDecoration: task.completed ? 'line-through' : 'none', marginBottom: '4px' }}>
                        {task.text}
                      </div>
                      <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '10px', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
                        {task.tag}
                      </span>
                    </div>
                  </div>
                  <button className="btn-icon" style={{ border: 'none', background: 'transparent', color: 'var(--text-secondary)' }} onClick={() => deleteTask(task.id)}>
                    <Trash2 size={16} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
            {activeTasks.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '40px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                <CheckCircle2 size={32} color="var(--border-color)" />
                <p>No tasks scheduled for this day.</p>
              </motion.div>
            )}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
