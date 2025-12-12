import { useState } from 'react'
import { ArrowLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ExerciseCard } from '@/components/ExerciseCard'
import { exercises, dailyRoutines } from '@/data/program'

export function Session({
  sessionType,
  currentPhase,
  onComplete,
  onBack
}) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Get exercises for this session
  const getSessionExercises = () => {
    if (sessionType === 'morning') {
      return dailyRoutines.morning.exercises.map(id => exercises[id])
    }
    if (sessionType === 'microbreak') {
      return dailyRoutines.microbreak.exercises.map(id => exercises[id])
    }
    if (sessionType === 'evening') {
      const phaseRoutine = dailyRoutines.evening[currentPhase]
      return phaseRoutine.exercises.map(id => exercises[id])
    }
    return []
  }

  const sessionExercises = getSessionExercises()
  const currentExercise = sessionExercises[currentIndex]
  const isLastExercise = currentIndex === sessionExercises.length - 1

  const getSessionTitle = () => {
    if (sessionType === 'morning') return dailyRoutines.morning.name
    if (sessionType === 'microbreak') return dailyRoutines.microbreak.name
    if (sessionType === 'evening') return dailyRoutines.evening[currentPhase].name
    return 'Session'
  }

  const handleNext = () => {
    if (isLastExercise) {
      onComplete()
    } else {
      setCurrentIndex(prev => prev + 1)
    }
  }

  return (
    <div className="min-h-screen bg-background p-4 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <span className="text-sm font-medium uppercase text-muted-foreground">
          {getSessionTitle()}
        </span>
      </div>

      {/* Progress indicator */}
      <div className="text-center mb-4">
        <span className="text-sm text-muted-foreground">
          Exercise {currentIndex + 1} of {sessionExercises.length}
        </span>
      </div>

      {/* Exercise Card */}
      {currentExercise && (
        <ExerciseCard exercise={currentExercise} />
      )}

      {/* Next Button */}
      <Button
        className="w-full h-12 text-lg"
        onClick={handleNext}
      >
        {isLastExercise ? 'Complete Session' : 'Next Exercise'}
        <ChevronRight className="ml-2 h-5 w-5" />
      </Button>
    </div>
  )
}
