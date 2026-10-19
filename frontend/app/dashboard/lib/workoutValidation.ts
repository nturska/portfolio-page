export type SetRow = {
  reps: number;
  weight_kg: number;
};

export type ExerciseBlock = {
  exercise_id: number;
  sets: SetRow[];
};

export type SetErrors = {
  reps?: string;
  weight_kg?: string;
};

export type BlockErrors = {
  exercise?: string;
  sets: SetErrors[];
};

export type WorkoutFormErrors = {
  title?: string;
  blocks: BlockErrors[];
};

const EXERCISE_NAME_MIN_LENGTH = 2;

export const validateExerciseName = (name: string): string | undefined => {
  const trimmed = name.trim();
  if (!trimmed) return "Podaj nazwę ćwiczenia.";
  if (trimmed.length < EXERCISE_NAME_MIN_LENGTH) {
    return `Nazwa musi mieć co najmniej ${EXERCISE_NAME_MIN_LENGTH} znaki.`;
  }
  return undefined;
};

const validateSet = (set: SetRow): SetErrors => ({
  reps:
    !Number.isInteger(set.reps) || set.reps < 1
      ? "Podaj liczbę powtórzeń (min. 1)."
      : undefined,
  weight_kg: set.weight_kg < 0 ? "Ciężar nie może być ujemny." : undefined,
});

export const validateWorkout = (
  title: string,
  blocks: ExerciseBlock[],
): WorkoutFormErrors => ({
  title: title.trim() ? undefined : "Podaj nazwę sesji.",
  blocks: blocks.map((block) => ({
    exercise: block.exercise_id > 0 ? undefined : "Wybierz ćwiczenie z listy.",
    sets: block.sets.map(validateSet),
  })),
});

export const hasWorkoutErrors = (errors: WorkoutFormErrors): boolean =>
  Boolean(errors.title) ||
  errors.blocks.some(
    (block) =>
      Boolean(block.exercise) ||
      block.sets.some((set) => Boolean(set.reps || set.weight_kg)),
  );
