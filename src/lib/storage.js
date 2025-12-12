const STORAGE_KEY = 'posture-progress'

const defaultState = {
  currentDay: 1,
  todaySession: null,
  settings: {
    notifications: {
      browser: false,
      tabIndicator: true,
      sound: false
    },
    microbreakInterval: 45,
    reminderEnabled: false
  }
}

export function loadProgress() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return defaultState
    return { ...defaultState, ...JSON.parse(stored) }
  } catch {
    return defaultState
  }
}

export function saveProgress(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch (e) {
    console.error('Failed to save progress:', e)
  }
}

export function getTodayDate() {
  return new Date().toISOString().split('T')[0]
}

export function generateShareCode(day, phase) {
  return `POSTURE-D${day}-P${phase}`
}

export function parseShareCode(code) {
  const match = code.match(/^POSTURE-D(\d+)-P(\d+)$/i)
  if (!match) return null
  return {
    day: parseInt(match[1], 10),
    phase: parseInt(match[2], 10)
  }
}
