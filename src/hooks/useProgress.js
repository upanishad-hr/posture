import { useState, useEffect, useCallback } from 'react'
import { loadProgress, saveProgress, getTodayDate } from '@/lib/storage'
import { getPhaseForDay, REQUIRED_MICROBREAKS, TOTAL_DAYS } from '@/data/program'

export function useProgress() {
  const [state, setState] = useState(loadProgress)

  // Save to localStorage whenever state changes
  useEffect(() => {
    saveProgress(state)
  }, [state])

  // Initialize today's session if needed
  useEffect(() => {
    const today = getTodayDate()
    if (!state.todaySession || state.todaySession.date !== today) {
      setState(prev => ({
        ...prev,
        todaySession: {
          date: today,
          morning: { completed: false, time: null },
          microbreaks: [],
          evening: { completed: false, time: null }
        }
      }))
    }
  }, [])

  const completeMorning = useCallback(() => {
    setState(prev => ({
      ...prev,
      todaySession: {
        ...prev.todaySession,
        morning: {
          completed: true,
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        }
      }
    }))
  }, [])

  const completeMicrobreak = useCallback(() => {
    setState(prev => ({
      ...prev,
      todaySession: {
        ...prev.todaySession,
        microbreaks: [
          ...prev.todaySession.microbreaks,
          {
            completed: true,
            time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
          }
        ]
      }
    }))
  }, [])

  const completeEvening = useCallback(() => {
    setState(prev => ({
      ...prev,
      todaySession: {
        ...prev.todaySession,
        evening: {
          completed: true,
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        }
      }
    }))
  }, [])

  const isDayComplete = useCallback(() => {
    if (!state.todaySession) return false
    const { morning, microbreaks, evening } = state.todaySession
    return (
      morning.completed &&
      microbreaks.length >= REQUIRED_MICROBREAKS &&
      evening.completed
    )
  }, [state.todaySession])

  const advanceDay = useCallback(() => {
    if (isDayComplete() && state.currentDay < TOTAL_DAYS) {
      setState(prev => ({
        ...prev,
        currentDay: prev.currentDay + 1
      }))
    }
  }, [isDayComplete, state.currentDay])

  const setDay = useCallback((day) => {
    const clampedDay = Math.max(1, Math.min(TOTAL_DAYS, day))
    setState(prev => ({
      ...prev,
      currentDay: clampedDay
    }))
  }, [])

  const resetProgress = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentDay: 1,
      todaySession: {
        date: getTodayDate(),
        morning: { completed: false, time: null },
        microbreaks: [],
        evening: { completed: false, time: null }
      }
    }))
  }, [])

  const updateSettings = useCallback((newSettings) => {
    setState(prev => ({
      ...prev,
      settings: { ...prev.settings, ...newSettings }
    }))
  }, [])

  return {
    currentDay: state.currentDay,
    currentPhase: getPhaseForDay(state.currentDay),
    todaySession: state.todaySession,
    settings: state.settings,
    completeMorning,
    completeMicrobreak,
    completeEvening,
    isDayComplete,
    advanceDay,
    setDay,
    resetProgress,
    updateSettings
  }
}
