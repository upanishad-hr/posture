# Posture App Design

**Date:** 2025-12-12
**Deploy URL:** posture.upanishad.hr

## Overview

PWA for fixing hunched shoulders (Upper Crossed Syndrome) through a 12-week progressive program. Tracks daily exercises during 8-hour workday with configurable notifications.

## Core Features

- **12-week progressive program** (Release → Activate → Strengthen → Integrate)
- **Daily structure:** Morning routine + flexible micro-breaks + evening wind-down
- **Manual session trigger** with optional timed reminders
- **Progress tracking:** Day counter (must complete day to advance)
- **Share/Continue:** Simple code format for sharing progress

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Vite + React |
| Styling | Tailwind CSS |
| Components | shadcn/ui |
| Data | LocalStorage |
| PWA | vite-plugin-pwa |
| Deploy | Netlify static |

## Data Model

### LocalStorage Structure

```js
{
  "currentDay": 11,
  "workDaysCompleted": 11,

  "todaySession": {
    "date": "2024-12-12",
    "morning": { "completed": true, "time": "09:15" },
    "microbreaks": [
      { "completed": true, "time": "10:30" },
      { "completed": true, "time": "11:45" }
    ],
    "evening": { "completed": false }
  },

  "settings": {
    "notifications": {
      "browser": true,
      "tabIndicator": true,
      "sound": false
    },
    "microbreakInterval": 45,
    "reminderEnabled": true
  }
}
```

### Day Completion Logic

- Day complete when: morning ✓ + at least 3 microbreaks ✓ + evening ✓
- If not complete → stay on same day tomorrow
- Restore: set `currentDay` to any number (1-84)

### Share Code Format

`POSTURE-D{day}-P{phase}` (e.g., `POSTURE-D11-P2`)

## UI Screens

### 1. Dashboard (Main View)

- Current day/phase display with progress bar
- Today's session checklist (morning, microbreaks, evening)
- "Start Next Session" button
- Next reminder countdown (if enabled)

### 2. Active Session

- Exercise card with name, instructions, dose
- Optional timer for holds
- "Done → Next Exercise" progression
- Back button to exit session

### 3. Settings

- Notification toggles (browser, tab indicator, sound)
- Reminder interval selector
- Current day manual input
- Reset to Day 1 button
- Share progress (copy/WhatsApp)
- Continue from code input

## Exercise Program

### Phase 1: Release (Weeks 1-3)

**Goal:** Restore range of motion, decrease tone in overactive muscles

| Exercise | Dose |
|----------|------|
| Foam Roller Thoracic Extension | 2 min |
| Foam Roller Pec Angel | 2-3 min hold |
| Upper Trap/Levator Stretch | 2×30s each side |
| Doorway Pec Stretch | 3×30s |

### Phase 2: Activate (Weeks 4-6)

**Goal:** Neuromuscular wake-up for inhibited muscles

| Exercise | Dose |
|----------|------|
| Chin Tucks | 3×10 (5s hold) |
| Band Pull-Aparts | 3×15 |
| Prone Cobra | 3×10 (3s hold) |
| Band External Rotation | 3×15 |

### Phase 3: Strengthen (Weeks 7-9)

**Goal:** Build endurance in postural stabilizers

| Exercise | Dose |
|----------|------|
| Band Face Pulls | 4×15 |
| Wall Angels | 3×10 (slow) |
| Seated Band Rows | 4×15 |
| Serratus Wall Slides | 3×10 |

### Phase 4: Integrate (Weeks 10-12)

**Goal:** Functional patterns and subconscious maintenance

| Exercise | Dose |
|----------|------|
| Band Pallof Press | 3×12 per side |
| Band Deadlift + Scapular Retraction | 4×15 |
| Maintenance selection | Ongoing |

### Daily Structure

**Morning (5 min):** Chin Tucks (10) + Band Pull-Aparts (20) + Arm Circles (10)

**Micro-breaks (every 45-60 min, 2 min):**
- Brugger's Relief Position (10s × 3)
- Seated Thoracic Extension
- Doorway Pec Stretch

**Evening (10 min):** Foam roller work + current phase exercises

### Common Mistakes to Avoid

1. **The Shrug** - lifting shoulders during pulls (cue: shoulders DOWN)
2. **Forward Head Jut** - chin poking forward during rows
3. **Rib Flare** - arching lower back to fake mobility
4. **Rushing Release** - rolling too fast (breathe and relax)

## Equipment Required

- Foam roller
- Resistance band

## File Structure

```
posture/
├── index.html
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── components/
│   │   ├── Dashboard.jsx
│   │   ├── Session.jsx
│   │   ├── Settings.jsx
│   │   ├── ExerciseCard.jsx
│   │   └── ProgressBar.jsx
│   ├── hooks/
│   │   ├── useProgress.js
│   │   ├── useNotifications.js
│   │   └── useTimer.js
│   ├── data/
│   │   └── program.js
│   └── lib/
│       └── storage.js
├── public/
│   ├── manifest.json
│   └── icons/
├── package.json
├── vite.config.js
├── tailwind.config.js
└── docs/
    └── plans/
```
