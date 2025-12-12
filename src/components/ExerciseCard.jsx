import { Card, CardContent } from '@/components/ui/card'
import { AlertCircle } from 'lucide-react'

export function ExerciseCard({ exercise }) {
  return (
    <Card className="mb-4">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">{exercise.name}</h2>

        <div className="space-y-4">
          <div>
            <p className="text-muted-foreground">{exercise.action}</p>
          </div>

          <div className="bg-primary/10 rounded-lg p-3">
            <p className="font-medium text-primary">{exercise.dose}</p>
          </div>

          {exercise.mistakes && exercise.mistakes.length > 0 && (
            <div className="border-t pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <AlertCircle className="h-4 w-4" />
                <span>Watch out for:</span>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                {exercise.mistakes.map((mistake, i) => (
                  <li key={i}>• {mistake}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
