import { useState } from 'react'
import { useProgress } from '@/hooks/useProgress'
import { Dashboard } from '@/components/Dashboard'
import { Session } from '@/components/Session'

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

  const handleSessionComplete = () => {
    if (activeSession === 'morning') {
      progress.completeMorning()
    } else if (activeSession === 'microbreak') {
      progress.completeMicrobreak()
    } else if (activeSession === 'evening') {
      progress.completeEvening()
      // Check if day is complete and advance
      if (progress.isDayComplete()) {
        progress.advanceDay()
      }
    }
    handleBack()
  }

  if (view === 'session' && activeSession) {
    return (
      <Session
        sessionType={activeSession}
        currentPhase={progress.currentPhase}
        onComplete={handleSessionComplete}
        onBack={handleBack}
      />
    )
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

  // Settings placeholder
  return (
    <div className="min-h-screen bg-background p-4 max-w-md mx-auto">
      <button onClick={handleBack}>← Back</button>
      <p>Settings coming next...</p>
    </div>
  )
}

export default App
