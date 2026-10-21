"use client";

import { useId, useState } from "react";
import type { Exercise } from "@/types/workouts";
import { FieldError } from "@/components/ui/FieldError";
import { useLocale } from "@/lib/hooks/useLocale";
import { useTouchedFields } from "@/lib/hooks/useTouchedFields";
import {
  hasWorkoutErrors,
  validateWorkout,
  type ExerciseBlock,
  type SetRow,
  type ValidationCode,
} from "@/dashboard/lib/workoutValidation";

type FlatSet = {
  exercise_id: number;
  reps: number;
  weight_kg: number;
};

type WorkoutFormProps = {
  exercises?: Exercise[];
  onSubmitWorkout: (data: { title: string; sets: FlatSet[] }) => Promise<void>;
};

const emptySet = (): SetRow => ({ reps: 0, weight_kg: 0 });

const emptyExerciseBlock = (): ExerciseBlock => ({
  exercise_id: 0,
  sets: [emptySet()],
});

export default function WorkoutForm({
  exercises = [],
  onSubmitWorkout,
}: WorkoutFormProps) {
  const [title, setTitle] = useState("");
  const [blocks, setBlocks] = useState<ExerciseBlock[]>([emptyExerciseBlock()]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useLocale();
  const { touch, shouldShowError, markSubmitted, reset } = useTouchedFields();
  const fieldId = useId();

  const errors = validateWorkout(title, blocks);
  const translateCode = (code?: ValidationCode): string | undefined =>
    code ? t(`validation.${code}`) : undefined;
  const visibleError = (key: string, message?: string): string | undefined =>
    shouldShowError(key) ? message : undefined;
  const errorId = (key: string): string => `${fieldId}-${key}-error`;
  const titleError = visibleError("title", translateCode(errors.title));

  const handleAddExercise = () => {
    setBlocks((prev) => [...prev, emptyExerciseBlock()]);
  };

  const handleAddSet = (blockIndex: number) => {
    setBlocks((prev) =>
      prev.map((block, i) => {
        if (i !== blockIndex) return block;
        const lastSet = block.sets[block.sets.length - 1] ?? emptySet();
        return {
          ...block,
          sets: [...block.sets, { ...lastSet }],
        };
      }),
    );
  };

  const handleRemoveExercise = (blockIndex: number) => {
    if (blocks.length === 1) return;
    setBlocks((prev) => prev.filter((_, i) => i !== blockIndex));
  };

  const handleRemoveSet = (blockIndex: number, setIndex: number) => {
    setBlocks((prev) =>
      prev.map((block, i) => {
        if (i !== blockIndex) return block;
        if (block.sets.length === 1) return block;
        return {
          ...block,
          sets: block.sets.filter((_, si) => si !== setIndex),
        };
      }),
    );
  };

  const handleExerciseChange = (blockIndex: number, exerciseId: number) => {
    setBlocks((prev) =>
      prev.map((block, i) =>
        i === blockIndex ? { ...block, exercise_id: exerciseId } : block,
      ),
    );
  };

  const handleSetChange = (
    blockIndex: number,
    setIndex: number,
    field: keyof SetRow,
    value: number,
  ) => {
    setBlocks((prev) =>
      prev.map((block, i) => {
        if (i !== blockIndex) return block;
        return {
          ...block,
          sets: block.sets.map((set, si) =>
            si === setIndex ? { ...set, [field]: value } : set,
          ),
        };
      }),
    );
  };

  const flattenSets = (items: ExerciseBlock[]): FlatSet[] =>
    items.flatMap((block) =>
      block.sets.map((set) => ({
        exercise_id: block.exercise_id,
        reps: set.reps,
        weight_kg: set.weight_kg,
      })),
    );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    markSubmitted();
    if (hasWorkoutErrors(errors)) return;

    try {
      setIsSubmitting(true);
      await onSubmitWorkout({ title, sets: flattenSets(blocks) });
      setTitle("");
      setBlocks([emptyExerciseBlock()]);
      reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card bg-base-100 shadow-sm border border-base-200">
      <div className="card-body p-5">
        <h2 className="card-title text-lg font-bold">
          {t("dashboard.newSession")}
        </h2>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <label
              htmlFor={`${fieldId}-title`}
              className="text-xs font-semibold text-base-content/70"
            >
              {t("dashboard.sessionName")}
            </label>
            <input
              id={`${fieldId}-title`}
              type="text"
              placeholder={t("dashboard.sessionNamePlaceholder")}
              className={`input input-bordered w-full input-sm mt-1 ${titleError ? "input-error" : ""}`}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={() => touch("title")}
              aria-invalid={Boolean(titleError)}
              aria-describedby={titleError ? errorId("title") : undefined}
              required
            />
            <FieldError id={errorId("title")} message={titleError} />
          </div>

          <div className="space-y-4">
            <label className="text-xs font-semibold text-base-content/70">
              {t("dashboard.exercisesAndSets")}
            </label>

            {blocks.map((block, blockIndex) => {
              const blockErrors = errors.blocks[blockIndex];
              const exerciseKey = `b${blockIndex}-exercise`;
              const exerciseError = visibleError(
                exerciseKey,
                exercises.length === 0
                  ? t("validation.noExercises")
                  : translateCode(blockErrors.exercise),
              );

              return (
                <div
                  key={blockIndex}
                  className="space-y-2 rounded-lg border border-base-200 bg-base-200/40 p-3"
                >
                  <div>
                    <div className="flex gap-2 items-center">
                      <select
                        className={`select select-bordered select-sm flex-1 ${exerciseError ? "select-error" : ""}`}
                        value={block.exercise_id || ""}
                        onChange={(e) =>
                          handleExerciseChange(
                            blockIndex,
                            Number(e.target.value),
                          )
                        }
                        onBlur={() => touch(exerciseKey)}
                        aria-label={t("dashboard.exerciseN", {
                          n: blockIndex + 1,
                        })}
                        aria-invalid={Boolean(exerciseError)}
                        aria-describedby={
                          exerciseError ? errorId(exerciseKey) : undefined
                        }
                        required
                      >
                        <option value="" disabled>
                          {t("dashboard.chooseExercise")}
                        </option>
                        {exercises.map((ex) => (
                          <option key={ex.id} value={ex.id}>
                            {ex.name} ({ex.category})
                          </option>
                        ))}
                      </select>

                      <button
                        type="button"
                        onClick={() => handleRemoveExercise(blockIndex)}
                        disabled={blocks.length === 1}
                        className="btn btn-ghost btn-xs text-error px-1"
                        title={t("dashboard.removeExercise")}
                      >
                        ✕
                      </button>
                    </div>
                    <FieldError
                      id={errorId(exerciseKey)}
                      message={exerciseError}
                    />
                  </div>

                  {block.sets.map((set, setIndex) => {
                    const setErrors = blockErrors.sets[setIndex];
                    const repsKey = `b${blockIndex}-s${setIndex}-reps`;
                    const weightKey = `b${blockIndex}-s${setIndex}-weight`;
                    const repsError = visibleError(
                      repsKey,
                      translateCode(setErrors.reps),
                    );
                    const weightError = visibleError(
                      weightKey,
                      translateCode(setErrors.weight_kg),
                    );

                    return (
                      <div key={setIndex}>
                        <div className="flex gap-2 items-center pl-1">
                          <span className="text-xs text-base-content/50 w-10 shrink-0">
                            {t("dashboard.setN", { n: setIndex + 1 })}
                          </span>
                          <div className="w-16">
                            <input
                              type="number"
                              min="1"
                              className={`input input-bordered input-xs w-full text-center ${repsError ? "input-error" : ""}`}
                              placeholder={t("dashboard.repsPlaceholder")}
                              value={set.reps || ""}
                              onChange={(e) =>
                                handleSetChange(
                                  blockIndex,
                                  setIndex,
                                  "reps",
                                  Number(e.target.value),
                                )
                              }
                              onBlur={() => touch(repsKey)}
                              aria-label={t("dashboard.repsAria", {
                                n: setIndex + 1,
                              })}
                              aria-invalid={Boolean(repsError)}
                              aria-describedby={
                                repsError ? errorId(repsKey) : undefined
                              }
                              required
                            />
                          </div>
                          <div className="w-20">
                            <input
                              type="number"
                              step="0.5"
                              min="0"
                              className={`input input-bordered input-xs w-full text-center ${weightError ? "input-error" : ""}`}
                              placeholder="kg"
                              value={set.weight_kg || ""}
                              onChange={(e) =>
                                handleSetChange(
                                  blockIndex,
                                  setIndex,
                                  "weight_kg",
                                  Number(e.target.value),
                                )
                              }
                              onBlur={() => touch(weightKey)}
                              aria-label={t("dashboard.weightAria", {
                                n: setIndex + 1,
                              })}
                              aria-invalid={Boolean(weightError)}
                              aria-describedby={
                                weightError ? errorId(weightKey) : undefined
                              }
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              handleRemoveSet(blockIndex, setIndex)
                            }
                            disabled={block.sets.length === 1}
                            className="btn btn-ghost btn-xs text-error px-1"
                            title={t("dashboard.removeSet")}
                          >
                            ✕
                          </button>
                        </div>
                        <div className="pl-13">
                          <FieldError
                            id={errorId(repsKey)}
                            message={repsError}
                          />
                          <FieldError
                            id={errorId(weightKey)}
                            message={weightError}
                          />
                        </div>
                      </div>
                    );
                  })}

                  <button
                    type="button"
                    onClick={() => handleAddSet(blockIndex)}
                    disabled={!block.exercise_id}
                    className="btn btn-outline btn-xs w-full border-dashed"
                  >
                    {t("dashboard.addSet")}
                  </button>
                </div>
              );
            })}

            <button
              type="button"
              onClick={handleAddExercise}
              className="btn btn-outline btn-sm w-full"
            >
              {t("dashboard.addExerciseBlock")}
            </button>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-sm w-full mt-4"
            disabled={isSubmitting}
          >
            {isSubmitting && (
              <span className="loading loading-spinner loading-xs" />
            )}
            {isSubmitting
              ? t("dashboard.saving")
              : t("dashboard.saveWorkout")}
          </button>
        </form>
      </div>
    </div>
  );
}
