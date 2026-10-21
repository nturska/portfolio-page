import type { pl } from "./pl";

type StringTree<T> = {
  [K in keyof T]: T[K] extends string ? string : StringTree<T[K]>;
};

export const en: StringTree<typeof pl> = {
  language: {
    switchTo: "Przełącz na polski",
  },
  theme: {
    light: "Switch to light theme",
    dark: "Switch to dark theme",
  },
  nav: {
    timeline: "Path",
    recommendations: "Recommendations",
    certificates: "Certificates",
    projects: "Projects",
    contact: "Contact",
    downloadCv: "Download CV",
  },
  hero: {
    badge: "Frontend Developer",
    titleBefore: "I build web apps with",
    titleAccent: "React.js and Next.js",
    subtitle:
      "I specialise in the React ecosystem. I create consistent, performant interfaces.",
    seeProjects: "See projects",
    contact: "Get in touch",
  },
  timeline: {
    title: "My path",
    subtitle: "Education, work and projects that shaped me.",
    kind: {
      education: "Education",
      work: "Work",
      project: "Project",
    },
  },
  recommendations: {
    title: "Recommendations",
    subtitle: "LinkedIn notes from people I have worked with.",
    linkedInProfile: "LinkedIn profile: {name}",
    tab: "Recommendation: {name}",
  },
  certificates: {
    title: "Certificates",
    subtitle: "Drag the cards with a mouse or finger, or use the arrow keys.",
    viewPdf: "View PDF",
    prev: "Previous certificate",
    next: "Next certificate",
    bullet: "Go to certificate {{index}}",
  },
  projects: {
    title: "Selected projects",
    featured: "Featured",
    demo: "Demo",
  },
  contact: {
    title: "Let's talk",
    subtitle:
      "I am looking for Frontend Developer roles on React and Next.js projects.",
    email: "Send email",
  },
  dashboard: {
    title: "Habit tracking ecosystem",
    subtitle: "Next.js connected to FastAPI",
    noticeLabel: "Note:",
    notice:
      "The app runs on free Render hosting, so the first start may take about a minute.",
    back: "← Back to portfolio",
    error:
      "Could not reach the API (Render cold start?). On free Render the first start may take about a minute.",
    retry: "Try again",
    workoutsStat: "Workouts completed",
    workoutsStatDesc: "Synced with the SQLite database",
    volumeStat: "Total volume",
    volumeStatDesc: "Weight × reps",
    newExercise: "New exercise",
    newExerciseHint:
      "Add an exercise to the library, then use it in a session.",
    exerciseName: "Exercise name",
    exerciseNamePlaceholder: "e.g. Squat",
    category: "Category",
    addExercise: "Add exercise",
    saving: "Saving...",
    newSession: "New workout session",
    sessionName: "Session name",
    sessionNamePlaceholder: "e.g. Leg day",
    exercisesAndSets: "Exercises and sets",
    chooseExercise: "Choose an exercise…",
    exerciseN: "Exercise {n}",
    removeExercise: "Remove exercise",
    setN: "Set {n}",
    repsPlaceholder: "Reps",
    repsAria: "Reps, set {n}",
    weightAria: "Weight in kg, set {n}",
    removeSet: "Remove set",
    addSet: "+ Add a set to this exercise",
    addExerciseBlock: "+ Add another exercise",
    saveWorkout: "Save workout",
    history: "Session history",
    loadingWorkouts: "Loading workouts…",
    emptyHistory: "No workouts yet. Build your first set on the left!",
    delete: "Delete",
    deleting: "Deleting...",
    loadSame: "{reps} reps × {kg} kg",
    setsOne: "1 set",
    setsFew: "{count} sets",
    setsMany: "{count} sets",
    categories: {
      chest: "Chest",
      back: "Back",
      legs: "Legs",
      arms: "Arms / Shoulders",
      abs: "Core",
    },
  },
  validation: {
    exerciseNameRequired: "Enter an exercise name.",
    exerciseNameMin: "The name must be at least {min} characters.",
    sessionTitleRequired: "Enter a session name.",
    exerciseRequired: "Choose an exercise from the list.",
    noExercises: "Add an exercise in the form above first.",
    repsMin: "Enter the number of reps (min. 1).",
    weightNegative: "Weight cannot be negative.",
  },
};
