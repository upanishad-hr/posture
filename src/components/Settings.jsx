import { useState } from 'react'
import { ArrowLeft, Copy, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
import { generateShareCode, parseShareCode } from '@/lib/storage'
import { TOTAL_DAYS } from '@/data/program'

export function Settings({
  currentDay,
  currentPhase,
  settings,
  onUpdateSettings,
  onSetDay,
  onReset,
  onBack
}) {
  const [dayInput, setDayInput] = useState(currentDay.toString())
  const [codeInput, setCodeInput] = useState('')
  const [copied, setCopied] = useState(false)

  const shareCode = generateShareCode(currentDay, currentPhase)

  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(shareCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShareWhatsApp = () => {
    const message = encodeURIComponent(
      `I'm on Day ${currentDay} of the posture fix program! Join me: posture.upanishad.hr (use code ${shareCode} to sync up)`
    )
    window.open(`https://wa.me/?text=${message}`, '_blank')
  }

  const handleRestoreCode = () => {
    const parsed = parseShareCode(codeInput)
    if (parsed) {
      onSetDay(parsed.day)
      setCodeInput('')
      setDayInput(parsed.day.toString())
    }
  }

  const handleDayChange = () => {
    const day = parseInt(dayInput, 10)
    if (day >= 1 && day <= TOTAL_DAYS) {
      onSetDay(day)
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
          Settings
        </span>
      </div>

      {/* Notifications */}
      <Card className="mb-4">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm">Browser notifications</span>
            <Switch
              checked={settings.notifications.browser}
              onCheckedChange={(checked) =>
                onUpdateSettings({
                  notifications: { ...settings.notifications, browser: checked }
                })
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Tab title indicator</span>
            <Switch
              checked={settings.notifications.tabIndicator}
              onCheckedChange={(checked) =>
                onUpdateSettings({
                  notifications: { ...settings.notifications, tabIndicator: checked }
                })
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Sound alert</span>
            <Switch
              checked={settings.notifications.sound}
              onCheckedChange={(checked) =>
                onUpdateSettings({
                  notifications: { ...settings.notifications, sound: checked }
                })
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Reminders */}
      <Card className="mb-4">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Reminders</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm">Enable reminders</span>
            <Switch
              checked={settings.reminderEnabled}
              onCheckedChange={(checked) =>
                onUpdateSettings({ reminderEnabled: checked })
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Interval (minutes)</span>
            <Input
              type="number"
              className="w-20 text-center"
              value={settings.microbreakInterval}
              onChange={(e) =>
                onUpdateSettings({ microbreakInterval: parseInt(e.target.value, 10) || 45 })
              }
              min={15}
              max={120}
            />
          </div>
        </CardContent>
      </Card>

      {/* Progress */}
      <Card className="mb-4">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm">Current day</span>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                className="w-20 text-center"
                value={dayInput}
                onChange={(e) => setDayInput(e.target.value)}
                min={1}
                max={TOTAL_DAYS}
              />
              <Button size="sm" variant="outline" onClick={handleDayChange}>
                Set
              </Button>
            </div>
          </div>
          <Button variant="destructive" className="w-full" onClick={onReset}>
            Reset to Day 1
          </Button>
        </CardContent>
      </Card>

      {/* Share */}
      <Card className="mb-4">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Share Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted rounded-lg p-3 text-center">
            <p className="text-sm text-muted-foreground mb-1">Your code</p>
            <p className="font-mono font-bold text-lg">{shareCode}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={handleCopyCode}>
              <Copy className="h-4 w-4 mr-2" />
              {copied ? 'Copied!' : 'Copy'}
            </Button>
            <Button variant="outline" className="flex-1" onClick={handleShareWhatsApp}>
              <Share2 className="h-4 w-4 mr-2" />
              WhatsApp
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Continue from code */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Continue from Code</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="POSTURE-D11-P2"
            value={codeInput}
            onChange={(e) => setCodeInput(e.target.value.toUpperCase())}
          />
          <Button
            variant="outline"
            className="w-full"
            onClick={handleRestoreCode}
            disabled={!codeInput}
          >
            Restore Progress
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
