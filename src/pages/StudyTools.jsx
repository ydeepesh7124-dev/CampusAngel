import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Timer, Play, Pause, Square, Bell, BellRing, Calculator } from 'lucide-react';

export default function StudyTools() {
  const [activeTab, setActiveTab] = useState('stopwatch');

  // Stopwatch state
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // Alarm state
  const [alarmTime, setAlarmTime] = useState('');
  const [isAlarmSet, setIsAlarmSet] = useState(false);
  const [alarmRinging, setAlarmRinging] = useState(false);

  // Calculator state
  const [calcInput, setCalcInput] = useState('');
  const [calcResult, setCalcResult] = useState('');

  // Stopwatch effect
  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => setTime((t) => t + 10), 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);

  // Alarm effect
  useEffect(() => {
    let intervalId;
    if (isAlarmSet && alarmTime) {
      intervalId = setInterval(() => {
        const now = new Date();
        const currentHours = String(now.getHours()).padStart(2, '0');
        const currentMinutes = String(now.getMinutes()).padStart(2, '0');
        const currentTimeString = `${currentHours}:${currentMinutes}`;
        
        if (currentTimeString === alarmTime) {
          setAlarmRinging(true);
          setIsAlarmSet(false);
          // Try to play a sound if possible
          try {
            const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
            audio.play();
          } catch(e) {}
        }
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isAlarmSet, alarmTime]);

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
  };

  const handleCalcClick = (val) => {
    if (val === '=') {
      try {
        let expression = calcInput
          .replace(/sin/g, 'Math.sin')
          .replace(/cos/g, 'Math.cos')
          .replace(/tan/g, 'Math.tan')
          .replace(/log/g, 'Math.log10')
          .replace(/sqrt/g, 'Math.sqrt')
          .replace(/\^/g, '**')
          .replace(/pi/g, 'Math.PI')
          .replace(/e/g, 'Math.E');
        
        // Using new Function is generally not recommended for production, but suitable for this basic frontend demo
        const result = new Function('return ' + expression)();
        if (result === undefined || isNaN(result)) throw new Error('Invalid');
        
        // Format result beautifully
        let formattedResult = Number(result).toPrecision(8);
        if (formattedResult.includes('.')) {
          formattedResult = formattedResult.replace(/\.?0+$/, ''); // Remove trailing zeros
        }
        setCalcResult(formattedResult);
      } catch (e) {
        setCalcResult('Error');
      }
    } else if (val === 'AC') {
      setCalcInput('');
      setCalcResult('');
    } else if (val === 'DEL') {
      setCalcInput(prev => prev.slice(0, -1));
      setCalcResult('');
    } else {
      setCalcInput(prev => prev + val);
      setCalcResult('');
    }
  };

  const calcButtons = [
    { label: 'sin', val: 'sin(' }, { label: 'cos', val: 'cos(' }, { label: 'tan', val: 'tan(' }, { label: 'DEL', val: 'DEL', color: '#ef4444' }, { label: 'AC', val: 'AC', color: '#ef4444' },
    { label: 'log', val: 'log(' }, { label: '√', val: 'sqrt(' }, { label: '^', val: '^' }, { label: '(', val: '(' }, { label: ')', val: ')' },
    { label: '7', val: '7', color: 'white' }, { label: '8', val: '8', color: 'white' }, { label: '9', val: '9', color: 'white' }, { label: '÷', val: '/' }, { label: '×', val: '*' },
    { label: '4', val: '4', color: 'white' }, { label: '5', val: '5', color: 'white' }, { label: '6', val: '6', color: 'white' }, { label: '+', val: '+' }, { label: '-', val: '-' },
    { label: '1', val: '1', color: 'white' }, { label: '2', val: '2', color: 'white' }, { label: '3', val: '3', color: 'white' }, { label: 'π', val: 'pi' }, { label: 'e', val: 'e' },
    { label: '0', val: '0', color: 'white', span: 2 }, { label: '.', val: '.', color: 'white' }, { label: '=', val: '=', color: '#22c55e', span: 2 }
  ];

  return (
    <div className="responsive-padding" style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 className="responsive-title" style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>Study Tools</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Manage your study time and perform calculations.</p>
      </div>

      <div style={{ display: 'flex', gap: '16px', marginBottom: '32px', flexWrap: 'wrap' }}>
        <button
          onClick={() => setActiveTab('stopwatch')}
          className="glass-panel"
          style={{
            padding: '12px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: activeTab === 'stopwatch' ? 'var(--accent-gradient)' : 'var(--glass-bg)',
            color: activeTab === 'stopwatch' ? 'white' : 'var(--text-primary)',
            border: activeTab === 'stopwatch' ? 'none' : '1px solid var(--glass-border)',
            borderRadius: '12px',
            cursor: 'pointer'
          }}
        >
          <Timer size={20} /> Stopwatch
        </button>
        <button
          onClick={() => setActiveTab('alarm')}
          className="glass-panel"
          style={{
            padding: '12px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: activeTab === 'alarm' ? 'var(--accent-gradient)' : 'var(--glass-bg)',
            color: activeTab === 'alarm' ? 'white' : 'var(--text-primary)',
            border: activeTab === 'alarm' ? 'none' : '1px solid var(--glass-border)',
            borderRadius: '12px',
            cursor: 'pointer'
          }}
        >
          <Clock size={20} /> Alarm
        </button>
        <button
          onClick={() => setActiveTab('calculator')}
          className="glass-panel"
          style={{
            padding: '12px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: activeTab === 'calculator' ? 'var(--accent-gradient)' : 'var(--glass-bg)',
            color: activeTab === 'calculator' ? 'white' : 'var(--text-primary)',
            border: activeTab === 'calculator' ? 'none' : '1px solid var(--glass-border)',
            borderRadius: '12px',
            cursor: 'pointer'
          }}
        >
          <Calculator size={20} /> Scientific Calc
        </button>
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'stopwatch' && (
          <div className="glass-panel" style={{ padding: '48px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div className="responsive-title" style={{ fontSize: '72px', fontWeight: 'bold', fontFamily: 'monospace', marginBottom: '32px', letterSpacing: '4px' }}>
              {formatTime(time)}
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <button
                onClick={() => setIsRunning(!isRunning)}
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: isRunning ? 'rgba(239, 68, 68, 0.2)' : 'rgba(34, 197, 94, 0.2)',
                  color: isRunning ? '#ef4444' : '#22c55e',
                  border: `2px solid ${isRunning ? '#ef4444' : '#22c55e'}`,
                  cursor: 'pointer'
                }}
              >
                {isRunning ? <Pause size={24} /> : <Play size={24} style={{ marginLeft: '4px' }} />}
              </button>
              <button
                onClick={() => { setIsRunning(false); setTime(0); }}
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'var(--bg-tertiary)',
                  color: 'var(--text-secondary)',
                  border: '1px solid var(--glass-border)',
                  cursor: 'pointer'
                }}
              >
                <Square size={24} />
              </button>
            </div>
          </div>
        )}

        {activeTab === 'alarm' && (
          <div className="glass-panel" style={{ padding: '48px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            {alarmRinging ? (
              <div style={{ textAlign: 'center' }}>
                <motion.div
                  animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 0.5 }}
                  style={{ display: 'inline-block', color: '#ef4444', marginBottom: '24px' }}
                >
                  <BellRing size={64} />
                </motion.div>
                <h2 style={{ fontSize: '32px', marginBottom: '24px', color: '#ef4444' }}>Time's up!</h2>
                <button
                  className="btn-primary"
                  onClick={() => setAlarmRinging(false)}
                >
                  Stop Alarm
                </button>
              </div>
            ) : (
              <>
                <Bell size={48} color="var(--accent-primary)" style={{ marginBottom: '24px' }} />
                <h2 style={{ fontSize: '24px', marginBottom: '24px' }}>Set an Alarm</h2>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '32px' }}>
                  <input
                    type="time"
                    value={alarmTime}
                    onChange={(e) => setAlarmTime(e.target.value)}
                    disabled={isAlarmSet}
                    style={{
                      padding: '16px',
                      fontSize: '24px',
                      borderRadius: '12px',
                      background: 'var(--bg-tertiary)',
                      border: '1px solid var(--glass-border)',
                      color: 'white',
                      fontFamily: 'monospace'
                    }}
                  />
                </div>
                <button
                  className="btn-primary"
                  onClick={() => setIsAlarmSet(!isAlarmSet)}
                  disabled={!alarmTime}
                  style={{
                    background: isAlarmSet ? 'rgba(239, 68, 68, 0.2)' : 'var(--accent-gradient)',
                    color: isAlarmSet ? '#ef4444' : 'white',
                    border: isAlarmSet ? '1px solid rgba(239, 68, 68, 0.5)' : 'none',
                    opacity: !alarmTime ? 0.5 : 1
                  }}
                >
                  {isAlarmSet ? 'Cancel Alarm' : 'Set Alarm'}
                </button>
                {isAlarmSet && (
                  <p style={{ marginTop: '16px', color: 'var(--text-secondary)' }}>
                    Alarm set for {alarmTime}
                  </p>
                )}
              </>
            )}
          </div>
        )}

        {activeTab === 'calculator' && (
          <div className="glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '400px', margin: '0 auto' }}>
            <div style={{ 
              width: '100%', 
              background: 'var(--bg-primary)', 
              borderRadius: '12px', 
              padding: '24px 16px', 
              marginBottom: '24px', 
              textAlign: 'right', 
              border: '1px solid var(--glass-border)',
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100px',
              justifyContent: 'flex-end'
            }}>
              <div style={{ color: 'var(--text-secondary)', fontSize: '18px', marginBottom: '8px', minHeight: '24px', wordBreak: 'break-all' }}>
                {calcInput}
              </div>
              <div style={{ color: calcResult === 'Error' ? '#ef4444' : 'white', fontSize: '32px', fontWeight: 'bold', minHeight: '38px', wordBreak: 'break-all' }}>
                {calcResult}
              </div>
            </div>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(5, 1fr)', 
              gap: '12px', 
              width: '100%' 
            }}>
              {calcButtons.map((btn, idx) => (
                <button
                  key={idx}
                  onClick={() => handleCalcClick(btn.val)}
                  style={{
                    gridColumn: btn.span ? `span ${btn.span}` : 'span 1',
                    padding: '16px 8px',
                    borderRadius: '12px',
                    background: btn.color ? (btn.color === 'white' ? 'var(--bg-tertiary)' : `rgba(${btn.color === '#ef4444' ? '239,68,68' : '34,197,94'}, 0.2)`) : 'var(--glass-bg)',
                    color: btn.color || 'var(--accent-primary)',
                    border: '1px solid var(--glass-border)',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.1s ease',
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
