import { useState } from 'react'
import { useProgress } from '@/hooks/useProgress'
import { Dashboard } from '@/components/Dashboard'

function App() {
  const progress = useProgress()
  const [view, setView] = useState('dashboard')
  const [activeSession, setActiveSession] = useState(null)

  const handleStartSession = (sessionType) => {
    setActiveSession(sessionType)
    setView('session')
  }

  const handleOpenSettings = () => {
    setView('settings')
  }

  const handleBack = () => {
    setView('dashboard')
    setActiveSession(null)
  }

  if (view === 'dashboard') {
    return (
      <Dashboard
        currentDay={progress.currentDay}
        currentPhase={progress.currentPhase}
        todaySession={progress.todaySession}
        onStartSession={handleStartSession}
        onOpenSettings={handleOpenSettings}
      />
    )
  }

  // Placeholder for other views
  return (
    <div className="min-h-screen bg-background p-4 max-w-md mx-auto">
      <button onClick={handleBack}>← Back</button>
      <p>View: {view}</p>
      <p>Session: {activeSession}</p>
    </div>
  )
}

export default App
