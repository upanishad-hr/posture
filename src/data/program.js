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
