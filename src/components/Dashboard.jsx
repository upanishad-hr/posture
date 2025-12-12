import { Settings, CheckCircle2, Circle, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { phases, TOTAL_DAYS, REQUIRED_MICROBREAKS, getWeekForDay } from '@/data/program'

export function Dashboard({
  currentDay,
  currentPhase,
  todaySession,
  onStartSession,
  onOpenSettings
}) {
  const phase = phases.find(p => p.id === currentPhase)
  const week = getWeekForDay(currentDay)
  const progressPercent = Math.round((currentDay / TOTAL_DAYS) * 100)

  const sessionItems = [
    {
      id: 'morning',
      label: 'Morning Routine',
      completed: todaySession?.morning?.completed,
      time: todaySession?.morning?.time
    },
    ...Array.from({ length: REQUIRED_MICROBREAKS }, (_, i) => ({
      id: `microbreak-${i}`,
      label: `Microbreak #${i + 1}`,
      completed: todaySession?.microbreaks?.[i]?.completed,
      time: todaySession?.microbreaks?.[i]?.time
    })),
    {
      id: 'evening',
      label: 'Evening Wind-down',
      completed: todaySession?.evening?.completed,
      time: todaySession?.evening?.time
    }
  ]

  const getNextSession = () => {
    if (!todaySession?.morning?.completed) return 'morning'
    if (todaySession.microbreaks.length < REQUIRED_MICROBREAKS) return 'microbreak'
    if (!todaySession?.evening?.completed) return 'evening'
    return null
  }

  const nextSession = getNextSession()

  return (
    <div className="min-h-screen bg-background p-4 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-primary">POSTURE</h1>
        <Button variant="ghost" size="icon" onClick={onOpenSettings}>
          <Settings className="h-5 w-5" />
        </Button>
      </div>

      {/* Progress Card */}
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Day {currentDay} of {TOTAL_DAYS}</CardTitle>
          <p className="text-sm text-muted-foreground">
            Phase {currentPhase}: {phase?.name} (Week {week})
          </p>
        </CardHeader>
        <CardContent>
          <Progress value={progressPercent} className="h-2" />
          <p className="text-xs text-muted-foreground mt-1 text-right">{progressPercent}%</p>
        </CardContent>
      </Card>

      {/* Today's Progress */}
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Today's Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {sessionItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {item.completed ? (
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                ) : (
                  <Circle className="h-5 w-5 text-muted-foreground" />
                )}
                <span className={item.completed ? 'text-foreground' : 'text-muted-foreground'}>
                  {item.label}
                </span>
              </div>
              <span className="text-sm text-muted-foreground">
                {item.time || '--:--'}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Start Session Button */}
      {nextSession && (
        <Button
          className="w-full h-12 text-lg"
          onClick={() => onStartSession(nextSession)}
        >
          <Play className="mr-2 h-5 w-5" />
          Start {nextSession === 'morning' ? 'Morning Routine' :
                 nextSession === 'microbreak' ? 'Microbreak' :
                 'Evening Wind-down'}
        </Button>
      )}

      {!nextSession && (
        <Card className="bg-primary/10 border-primary">
          <CardContent className="p-4 text-center">
            <CheckCircle2 className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="font-medium text-primary">Day Complete!</p>
            <p className="text-sm text-muted-foreground">Great work. See you tomorrow.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
