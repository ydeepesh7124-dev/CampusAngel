import { Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Sidebar from './components/Sidebar'
import logo from './assets/logo.png'
import AITeacher from './pages/AITeacher'
import Planner from './pages/Planner'
import CampusJobs from './pages/CampusJobs'
import Community from './pages/Community'
import MentalHealth from './pages/MentalHealth'
import BookBazaar from './pages/BookBazaar'
import Finance from './pages/Finance'
import Diary from './pages/Diary'
import Profile from './pages/Profile'
import StudyTools from './pages/StudyTools'
import CareerGuidance from './pages/CareerGuidance'
import Skillverse from './pages/Skillverse'
import Leaderboard from './pages/Leaderboard'
import PracticeHub from './pages/PracticeHub'
import CampusLife from './pages/CampusLife'
import Login from './pages/Login'
import GlobalHeader from './components/GlobalHeader'

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="app-container">
      <div className="mobile-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img src={logo} alt="CampusAngel Logo" style={{ width: '32px', height: '32px', objectFit: 'contain', borderRadius: '6px' }} />
          <h1 style={{ fontSize: '20px', fontWeight: '700', letterSpacing: '-0.5px' }}>
            Campus<span className="gradient-text">Angel</span>
          </h1>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="btn-icon">
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <main className="main-content" onClick={() => isSidebarOpen && setIsSidebarOpen(false)}>
        <GlobalHeader />
        <Routes>
          <Route path="/" element={<Navigate to="/ai-teacher" replace />} />
          <Route path="/ai-teacher" element={<AITeacher />} />
          <Route path="/planner" element={<Planner />} />
          <Route path="/jobs" element={<CampusJobs />} />
          <Route path="/community" element={<Community />} />
          <Route path="/health" element={<MentalHealth />} />
          <Route path="/books" element={<BookBazaar />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/diary" element={<Diary />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/tools" element={<StudyTools />} />
          <Route path="/career" element={<CareerGuidance />} />
          <Route path="/skillverse" element={<Skillverse />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/practice" element={<PracticeHub />} />
          <Route path="/campus-life" element={<CampusLife />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
