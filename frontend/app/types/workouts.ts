export interface ExerciseSet {
  id?: number;
  exercise_name: string;
  reps: number;
  weight_kg: number;
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
