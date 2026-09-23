export interface Exercise {
  id: number;
  name: string;
  category: "abs" | "legs" | "back" | "arms" | "chest" | string;
}

export interface ExerciseSet {
  id?: number;
  reps: number;
  weight_kg: number;
  exercise: Exercise;
}

export interface Workout {
  id: number;
  title: string;
  date: string;
  notes?: string;
  exercises: ExerciseSet[];
}

export interface Stats {
  total_workouts: number;
  total_volume_kg: number;
}
