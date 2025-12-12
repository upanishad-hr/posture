# Posture App Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a PWA for 12-week posture correction with daily exercise tracking and configurable notifications.

**Architecture:** Single-page React app with three views (Dashboard, Session, Settings). All data in LocalStorage. PWA manifest + service worker for installability.

**Tech Stack:** Vite, React, Tailwind CSS, shadcn/ui, vite-plugin-pwa

---

## Task 1: Project Scaffold

**Files:**
- Create: `package.json`
- Create: `vite.config.js`
- Create: `tailwind.config.js`
- Create: `postcss.config.js`
- Create: `index.html`
- Create: `src/main.jsx`
- Create: `src/App.jsx`
- Create: `src/index.css`

**Step 1: Initialize Vite React project**

Run:
```bash
cd /Users/impect/Documents/upanishad.hr/posture
npm create vite@latest . -- --template react
```

Select: Overwrite existing files if prompted

**Step 2: Install dependencies**

Run:
```bash
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**Step 3: Configure Tailwind**

Replace `tailwind.config.js`:
```js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

**Step 4: Add Tailwind directives**

Replace `src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**Step 5: Verify dev server works**

Run: `npm run dev`
Expected: Opens at localhost:5173, shows Vite React page

**Step 6: Commit**

```bash
git add -A
git commit -m "scaffold: vite + react + tailwind"
```

---

## Task 2: Install shadcn/ui

**Files:**
- Modify: `package.json`
- Create: `components.json`
- Create: `src/lib/utils.js`
- Modify: `tailwind.config.js`

**Step 1: Install shadcn dependencies**

Run:
```bash
npm install class-variance-authority clsx tailwind-merge lucide-react
npm install -D @types/node
```

**Step 2: Create utils file**

Create `src/lib/utils.js`:
```js
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
```

**Step 3: Update vite.config.js for path aliases**

Replace `vite.config.js`:
```js
import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```

**Step 4: Update tailwind.config.js for shadcn**

Replace `tailwind.config.js`:
```js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
}
```

**Step 5: Add CSS variables**

Replace `src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --primary: 142 76% 36%;
    --primary-foreground: 355 100% 100%;
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 142 76% 36%;
    --radius: 0.5rem;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

**Step 6: Commit**

```bash
git add -A
git commit -m "setup: shadcn/ui base configuration"
```

---

## Task 3: Add shadcn/ui Components

**Files:**
- Create: `src/components/ui/button.jsx`
- Create: `src/components/ui/card.jsx`
- Create: `src/components/ui/progress.jsx`
- Create: `src/components/ui/switch.jsx`
- Create: `src/components/ui/input.jsx`
- Create: `src/components/ui/select.jsx`

**Step 1: Create Button component**

Create `src/components/ui/button.jsx`:
```jsx
import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, ...props }, ref) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button, buttonVariants }
```

**Step 2: Create Card component**

Create `src/components/ui/card.jsx`:
```jsx
import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("rounded-xl border bg-card text-card-foreground shadow", className)}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn("font-semibold leading-none tracking-tight", className)} {...props} />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

export { Card, CardHeader, CardTitle, CardDescription, CardContent }
```

**Step 3: Create Progress component**

Create `src/components/ui/progress.jsx`:
```jsx
import * as React from "react"
import { cn } from "@/lib/utils"

const Progress = React.forwardRef(({ className, value, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("relative h-2 w-full overflow-hidden rounded-full bg-primary/20", className)}
    {...props}
  >
    <div
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </div>
))
Progress.displayName = "Progress"

export { Progress }
```

**Step 4: Create Switch component**

Create `src/components/ui/switch.jsx`:
```jsx
import * as React from "react"
import { cn } from "@/lib/utils"

const Switch = React.forwardRef(({ className, checked, onCheckedChange, ...props }, ref) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    ref={ref}
    onClick={() => onCheckedChange?.(!checked)}
    className={cn(
      "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
      checked ? "bg-primary" : "bg-input",
      className
    )}
    {...props}
  >
    <span
      className={cn(
        "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform",
        checked ? "translate-x-4" : "translate-x-0"
      )}
    />
  </button>
))
Switch.displayName = "Switch"

export { Switch }
```

**Step 5: Create Input component**

Create `src/components/ui/input.jsx`:
```jsx
import * as React from "react"
import { cn } from "@/lib/utils"

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = "Input"

export { Input }
```

**Step 6: Commit**

```bash
git add -A
git commit -m "components: add shadcn/ui base components"
```

---

## Task 4: Exercise Program Data

**Files:**
- Create: `src/data/program.js`

**Step 1: Create program data file**

Create `src/data/program.js`:
```js
export const exercises = {
  // Phase 1: Release
  "foam-roller-thoracic": {
    id: "foam-roller-thoracic",
    name: "Foam Roller Thoracic Extension",
    action: "Lie with roller perpendicular to spine (mid-back). Hands behind head. Lean back over roller, moving up and down.",
    dose: "2 minutes total",
    duration: 120,
    equipment: "foam-roller",
    phase: 1,
    mistakes: ["Rolling too fast", "Not breathing and relaxing into it"]
  },
  "foam-roller-pec-angel": {
    id: "foam-roller-pec-angel",
    name: "Foam Roller Pec Angel",
    action: "Lie with roller parallel along spine (head to tailbone). Open arms to T or W shape to stretch chest. Let gravity do the work.",
    dose: "2-3 minutes hold",
    duration: 150,
    equipment: "foam-roller",
    phase: 1,
    mistakes: ["Forcing the stretch", "Not relaxing shoulders"]
  },
  "upper-trap-stretch": {
    id: "upper-trap-stretch",
    name: "Upper Trap/Levator Stretch",
    action: "Anchor hand behind back. Tilt ear to opposite shoulder. For levator, look down toward armpit.",
    dose: "2 x 30s each side",
    duration: 120,
    equipment: null,
    phase: 1,
    mistakes: ["Raising the shoulder", "Forcing the stretch"]
  },
  "doorway-pec-stretch": {
    id: "doorway-pec-stretch",
    name: "Doorway Pec Stretch",
    action: "Place forearms on doorframe at 90 degrees. Lean through the doorway until you feel a stretch across the chest.",
    dose: "3 x 30s",
    duration: 90,
    equipment: null,
    phase: 1,
    mistakes: ["Shrugging shoulders", "Arching lower back"]
  },

  // Phase 2: Activate
  "chin-tucks": {
    id: "chin-tucks",
    name: "Chin Tucks",
    action: "Pull chin straight back like making a double chin. Do not look down. Hold for 5 seconds.",
    dose: "3 x 10 reps (5s hold)",
    duration: 180,
    equipment: null,
    phase: 2,
    mistakes: ["Looking down", "Jutting chin forward"]
  },
  "band-pull-aparts": {
    id: "band-pull-aparts",
    name: "Band Pull-Aparts",
    action: "Arms straight in front, palms up. Squeeze shoulder blades FIRST, then pull band to chest. Keep shoulders DOWN.",
    dose: "3 x 15 reps",
    duration: 120,
    equipment: "band",
    phase: 2,
    mistakes: ["Shrugging shoulders up", "Leading with arms instead of shoulder blades"]
  },
  "prone-cobra": {
    id: "prone-cobra",
    name: "Prone Cobra",
    action: "Lie face down. Lift chest and hands off floor, thumbs pointing to ceiling. Squeeze shoulder blades back and down.",
    dose: "3 x 10 reps (3s hold)",
    duration: 120,
    equipment: null,
    phase: 2,
    mistakes: ["Hyperextending neck", "Using momentum"]
  },
  "band-external-rotation": {
    id: "band-external-rotation",
    name: "Band External Rotation",
    action: "Elbows pinned to ribs at 90 degrees. Rotate forearms out against band tension.",
    dose: "3 x 15 reps",
    duration: 90,
    equipment: "band",
    phase: 2,
    mistakes: ["Elbows drifting away from body", "Using too heavy resistance"]
  },

  // Phase 3: Strengthen
  "band-face-pulls": {
    id: "band-face-pulls",
    name: "Band Face Pulls",
    action: "Anchor band high. Pull towards face, separating hands and rotating externally (thumbs back). The KING of posture exercises.",
    dose: "4 x 15 reps",
    duration: 180,
    equipment: "band",
    phase: 3,
    mistakes: ["Not rotating externally", "Shrugging shoulders"]
  },
  "wall-angels": {
    id: "wall-angels",
    name: "Wall Angels",
    action: "Back against wall. Arms in W position. Slide up to Y keeping elbows and wrists touching wall. Very hard if done right.",
    dose: "3 x 10 reps (slow)",
    duration: 150,
    equipment: null,
    phase: 3,
    mistakes: ["Lower back arching off wall", "Elbows/wrists leaving wall"]
  },
  "seated-band-rows": {
    id: "seated-band-rows",
    name: "Seated Band Rows",
    action: "Legs straight, band around feet. Row with focus on driving elbows back, not shrugging.",
    dose: "4 x 15 reps",
    duration: 180,
    equipment: "band",
    phase: 3,
    mistakes: ["Shrugging shoulders", "Rounding back"]
  },
  "serratus-wall-slides": {
    id: "serratus-wall-slides",
    name: "Serratus Wall Slides",
    action: "Forearms on wall with band loop around wrists. Slide arms up wall while pushing out against band.",
    dose: "3 x 10 reps",
    duration: 120,
    equipment: "band",
    phase: 3,
    mistakes: ["Not maintaining outward pressure", "Shrugging"]
  },

  // Phase 4: Integrate
  "band-pallof-press": {
    id: "band-pallof-press",
    name: "Band Pallof Press",
    action: "Stand sideways to anchored band. Hold at chest, press straight out. Resist rotation. Core and posture integration.",
    dose: "3 x 12 reps per side",
    duration: 180,
    equipment: "band",
    phase: 4,
    mistakes: ["Rotating torso", "Holding breath"]
  },
  "band-deadlift-retraction": {
    id: "band-deadlift-retraction",
    name: "Band Deadlift with Scapular Retraction",
    action: "Stand on band. Hinge hips. Stand tall and squeeze glutes + shoulder blades simultaneously at the top.",
    dose: "4 x 15 reps",
    duration: 180,
    equipment: "band",
    phase: 4,
    mistakes: ["Rounding back", "Not squeezing at top"]
  },

  // Micro-break exercises
  "bruggers-relief": {
    id: "bruggers-relief",
    name: "Brugger's Relief Position",
    action: "Sit at edge of chair, open legs, turn palms out, extend fingers, lift chest, tuck chin. The perfect desk reset.",
    dose: "Hold 10s x 3",
    duration: 30,
    equipment: null,
    phase: 0,
    mistakes: ["Not fully opening chest", "Forgetting chin tuck"]
  },
  "seated-thoracic-extension": {
    id: "seated-thoracic-extension",
    name: "Seated Thoracic Extension",
    action: "Hands behind head. Arch upper back over chair backrest. Open up the chest.",
    dose: "10 reps",
    duration: 30,
    equipment: null,
    phase: 0,
    mistakes: ["Arching lower back instead", "Not breathing"]
  },
  "arm-circles": {
    id: "arm-circles",
    name: "Arm Circles",
    action: "Large backward arm circles. Focus on opening the chest and squeezing shoulder blades.",
    dose: "10 circles backward",
    duration: 30,
    equipment: null,
    phase: 0,
    mistakes: ["Going too fast", "Small circles"]
  }
}

export const phases = [
  {
    id: 1,
    name: "Release",
    weeks: [1, 2, 3],
    description: "Loosen tight muscles and restore range of motion",
    color: "blue"
  },
  {
    id: 2,
    name: "Activate",
    weeks: [4, 5, 6],
    description: "Wake up weak, inhibited muscles",
    color: "yellow"
  },
  {
    id: 3,
    name: "Strengthen",
    weeks: [7, 8, 9],
    description: "Build endurance in postural stabilizers",
    color: "orange"
  },
  {
    id: 4,
    name: "Integrate",
    weeks: [10, 11, 12],
    description: "Functional patterns and maintenance habits",
    color: "green"
  }
]

export const dailyRoutines = {
  morning: {
    name: "Morning Activation",
    duration: 5,
    exercises: ["chin-tucks", "band-pull-aparts", "arm-circles"]
  },
  microbreak: {
    name: "Micro-break",
    duration: 2,
    exercises: ["bruggers-relief", "seated-thoracic-extension", "doorway-pec-stretch"]
  },
  evening: {
    1: {
      name: "Evening Release",
      duration: 10,
      exercises: ["foam-roller-thoracic", "foam-roller-pec-angel", "upper-trap-stretch", "doorway-pec-stretch"]
    },
    2: {
      name: "Evening Activation",
      duration: 10,
      exercises: ["foam-roller-thoracic", "chin-tucks", "band-pull-aparts", "prone-cobra", "band-external-rotation"]
    },
    3: {
      name: "Evening Strength",
      duration: 10,
      exercises: ["foam-roller-thoracic", "band-face-pulls", "wall-angels", "seated-band-rows", "serratus-wall-slides"]
    },
    4: {
      name: "Evening Integration",
      duration: 10,
      exercises: ["foam-roller-thoracic", "band-face-pulls", "band-pallof-press", "band-deadlift-retraction"]
    }
  }
}

export function getPhaseForDay(day) {
  const week = Math.ceil(day / 7)
  if (week <= 3) return 1
  if (week <= 6) return 2
  if (week <= 9) return 3
  return 4
}

export function getWeekForDay(day) {
  return Math.ceil(day / 7)
}

export const TOTAL_DAYS = 84 // 12 weeks
export const REQUIRED_MICROBREAKS = 3
```

**Step 2: Commit**

```bash
git add -A
git commit -m "data: add exercise program with all phases"
```

---

## Task 5: LocalStorage Hook

**Files:**
- Create: `src/hooks/useProgress.js`
- Create: `src/lib/storage.js`

**Step 1: Create storage utility**

Create `src/lib/storage.js`:
```js
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
```

**Step 2: Create useProgress hook**

Create `src/hooks/useProgress.js`:
```js
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
```

**Step 3: Commit**

```bash
git add -A
git commit -m "hooks: add useProgress for localStorage state management"
```

---

## Task 6: Dashboard Component

**Files:**
- Create: `src/components/Dashboard.jsx`
- Modify: `src/App.jsx`

**Step 1: Create Dashboard component**

Create `src/components/Dashboard.jsx`:
```jsx
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
```

**Step 2: Update App.jsx**

Replace `src/App.jsx`:
```jsx
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
```

**Step 3: Verify it works**

Run: `npm run dev`
Expected: Dashboard shows with day 1, progress bar, session checklist

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: add Dashboard component with progress tracking"
```

---

## Task 7: Session Component

**Files:**
- Create: `src/components/Session.jsx`
- Create: `src/components/ExerciseCard.jsx`
- Modify: `src/App.jsx`

**Step 1: Create ExerciseCard component**

Create `src/components/ExerciseCard.jsx`:
```jsx
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
```

**Step 2: Create Session component**

Create `src/components/Session.jsx`:
```jsx
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
```

**Step 3: Update App.jsx to include Session**

Replace `src/App.jsx`:
```jsx
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
```

**Step 4: Verify session flow works**

Run: `npm run dev`
Expected: Can start morning session, see exercises, complete and return to dashboard with checkmark

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: add Session and ExerciseCard components"
```

---

## Task 8: Settings Component

**Files:**
- Create: `src/components/Settings.jsx`
- Modify: `src/App.jsx`

**Step 1: Create Settings component**

Create `src/components/Settings.jsx`:
```jsx
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
```

**Step 2: Update App.jsx with Settings**

Replace `src/App.jsx`:
```jsx
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
```

**Step 3: Verify settings work**

Run: `npm run dev`
Expected: Can open settings, toggle switches, change day, copy share code

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: add Settings component with share/restore"
```

---

## Task 9: Notification System

**Files:**
- Create: `src/hooks/useNotifications.js`
- Modify: `src/App.jsx`

**Step 1: Create useNotifications hook**

Create `src/hooks/useNotifications.js`:
```jsx
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
```

**Step 2: Add notifications to App.jsx**

Add to `src/App.jsx` after the useProgress hook:
```jsx
import { useNotifications } from '@/hooks/useNotifications'

// Inside App function, after useProgress:
useNotifications({
  enabled: progress.settings.reminderEnabled,
  interval: progress.settings.microbreakInterval,
  browserEnabled: progress.settings.notifications.browser,
  tabIndicatorEnabled: progress.settings.notifications.tabIndicator,
  soundEnabled: progress.settings.notifications.sound,
  onReminder: () => {
    // Could show a toast or highlight the microbreak button
    console.log('Reminder triggered!')
  }
})
```

**Step 3: Test notifications**

Run: `npm run dev`
Set reminder interval to 1 minute in settings, enable notifications, wait for reminder.

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: add notification system with browser/tab/sound alerts"
```

---

## Task 10: PWA Setup

**Files:**
- Create: `public/manifest.json`
- Create: `public/icons/icon-192.png`
- Create: `public/icons/icon-512.png`
- Modify: `vite.config.js`
- Modify: `index.html`

**Step 1: Install PWA plugin**

Run:
```bash
npm install -D vite-plugin-pwa
```

**Step 2: Create manifest.json**

Create `public/manifest.json`:
```json
{
  "name": "Posture Fix",
  "short_name": "Posture",
  "description": "12-week posture correction program",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#16a34a",
  "icons": [
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

**Step 3: Create placeholder icons**

Create `public/icons/` directory and add simple placeholder icons (or generate with any tool).

For now, create simple SVG-based icons:

Create `public/icons/icon.svg`:
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#16a34a"/>
  <text x="256" y="300" font-size="200" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-weight="bold">P</text>
</svg>
```

**Step 4: Update vite.config.js for PWA**

Replace `vite.config.js`:
```js
import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { VitePWA } from "vite-plugin-pwa"

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/icon.svg'],
      manifest: {
        name: 'Posture Fix',
        short_name: 'Posture',
        description: '12-week posture correction program',
        theme_color: '#16a34a',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```

**Step 5: Update index.html**

Ensure `index.html` has proper meta tags:
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/icons/icon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta name="theme-color" content="#16a34a" />
    <meta name="description" content="12-week posture correction program" />
    <link rel="apple-touch-icon" href="/icons/icon-192.png" />
    <title>Posture Fix</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

**Step 6: Build and test PWA**

Run:
```bash
npm run build
npm run preview
```

Expected: App shows install prompt in browser, can be installed as PWA

**Step 7: Commit**

```bash
git add -A
git commit -m "feat: add PWA support with manifest and service worker"
```

---

## Task 11: Generate Icons

**Files:**
- Create: `public/icons/icon-192.png`
- Create: `public/icons/icon-512.png`

**Step 1: Create icons directory**

Run:
```bash
mkdir -p public/icons
```

**Step 2: Generate PNG icons from SVG**

Use an online tool or ImageMagick to convert the SVG to PNG at 192x192 and 512x512.

Or create a simple script with canvas (optional - can skip if deploying without icons initially).

**Step 3: Commit**

```bash
git add -A
git commit -m "assets: add PWA icons"
```

---

## Task 12: Netlify Deploy Setup

**Files:**
- Create: `netlify.toml`

**Step 1: Create Netlify config**

Create `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Step 2: Deploy to Netlify**

Run:
```bash
# If you have Netlify CLI
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

Or connect GitHub repo to Netlify dashboard and set custom domain to `posture.upanishad.hr`.

**Step 3: Commit**

```bash
git add -A
git commit -m "deploy: add Netlify configuration"
```

---

## Summary

12 tasks total:
1. Project scaffold (Vite + React)
2. shadcn/ui setup
3. UI components (Button, Card, Progress, Switch, Input)
4. Exercise program data
5. LocalStorage hook
6. Dashboard component
7. Session component
8. Settings component
9. Notification system
10. PWA setup
11. Generate icons
12. Netlify deploy

After completing all tasks, you'll have a fully functional PWA deployable to `posture.upanishad.hr`.
