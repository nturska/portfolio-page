export type SetRow = {
  reps: number;
  weight_kg: number;
};

export type ExerciseBlock = {
  exercise_id: number;
  sets: SetRow[];
};

export type ValidationCode =
  | "exerciseNameRequired"
  | "exerciseNameMin"
  | "sessionTitleRequired"
  | "exerciseRequired"
  | "repsMin"
  | "weightNegative";

export type SetErrors = {
  reps?: ValidationCode;
  weight_kg?: ValidationCode;
};

export type BlockErrors = {
  exercise?: ValidationCode;
  sets: SetErrors[];
};

export type WorkoutFormErrors = {
  title?: ValidationCode;
  blocks: BlockErrors[];
};

export const EXERCISE_NAME_MIN_LENGTH = 2;

export const validateExerciseName = (
  name: string,
): ValidationCode | undefined => {
  const trimmed = name.trim();
  if (!trimmed) return "exerciseNameRequired";
  if (trimmed.length < EXERCISE_NAME_MIN_LENGTH) return "exerciseNameMin";
  return undefined;
};

const validateSet = (set: SetRow): SetErrors => ({
  reps: !Number.isInteger(set.reps) || set.reps < 1 ? "repsMin" : undefined,
  weight_kg: set.weight_kg < 0 ? "weightNegative" : undefined,
});

export const validateWorkout = (
  title: string,
  blocks: ExerciseBlock[],
): WorkoutFormErrors => ({
  title: title.trim() ? undefined : "sessionTitleRequired",
  blocks: blocks.map((block) => ({
    exercise: block.exercise_id > 0 ? undefined : "exerciseRequired",
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
