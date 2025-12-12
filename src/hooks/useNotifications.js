import { useEffect, useRef, useCallback } from 'react'

export function useNotifications({
  enabled,
  interval,
  browserEnabled,
  tabIndicatorEnabled,
  soundEnabled,
  onReminder
}) {
  const timerRef = useRef(null)
  const originalTitle = useRef(document.title)

  // Request notification permission
  useEffect(() => {
    if (browserEnabled && 'Notification' in window) {
      Notification.requestPermission()
    }
  }, [browserEnabled])

  // Tab title indicator
  const flashTitle = useCallback((message) => {
    if (!tabIndicatorEnabled) return

    let isOriginal = true
    const flash = setInterval(() => {
      document.title = isOriginal ? `⏰ ${message}` : originalTitle.current
      isOriginal = !isOriginal
    }, 1000)

    // Stop after 10 seconds
    setTimeout(() => {
      clearInterval(flash)
      document.title = originalTitle.current
    }, 10000)
  }, [tabIndicatorEnabled])

  // Browser notification
  const showBrowserNotification = useCallback((title, body) => {
    if (!browserEnabled || !('Notification' in window)) return
    if (Notification.permission !== 'granted') return

    new Notification(title, {
      body,
      icon: '/icons/icon-192.png',
      tag: 'posture-reminder'
    })
  }, [browserEnabled])

  // Sound alert
  const playSound = useCallback(() => {
    if (!soundEnabled) return

    // Simple beep using Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.frequency.value = 440
    oscillator.type = 'sine'
    gainNode.gain.value = 0.1

    oscillator.start()
    oscillator.stop(audioContext.currentTime + 0.2)
  }, [soundEnabled])

  // Trigger reminder
  const triggerReminder = useCallback(() => {
    flashTitle('Time for a break!')
    showBrowserNotification('Posture Check', 'Time for a micro-break!')
    playSound()
    onReminder?.()
  }, [flashTitle, showBrowserNotification, playSound, onReminder])

  // Set up interval timer
  useEffect(() => {
    if (!enabled || !interval) {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
      return
    }

    timerRef.current = setInterval(() => {
      triggerReminder()
    }, interval * 60 * 1000) // Convert minutes to ms

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [enabled, interval, triggerReminder])

  // Reset title on unmount
  useEffect(() => {
    return () => {
      document.title = originalTitle.current
    }
  }, [])

  return { triggerReminder }
}
