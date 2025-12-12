import { useState, useEffect } from 'react'
import { useProgress } from '@/hooks/useProgress'
import { Dashboard } from '@/components/Dashboard'
import { Session } from '@/components/Session'
import { Settings } from '@/components/Settings'

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
    }
    handleBack()
  }

  // Check for day advancement after evening completion
  useEffect(() => {
    if (progress.isDayComplete()) {
      progress.advanceDay()
    }
  }, [progress.todaySession])

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

  if (view === 'settings') {
    return (
      <Settings
        currentDay={progress.currentDay}
        currentPhase={progress.currentPhase}
        settings={progress.settings}
        onUpdateSettings={progress.updateSettings}
        onSetDay={progress.setDay}
        onReset={progress.resetProgress}
        onBack={handleBack}
      />
    )
  }

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

export default App
