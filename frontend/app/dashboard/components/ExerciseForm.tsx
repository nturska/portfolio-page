"use client";

import { useId, useState } from "react";
import type { Exercise } from "@/types/workouts";
import { FieldError } from "@/components/ui/FieldError";
import { useLocale } from "@/lib/hooks/useLocale";
import { useTouchedFields } from "@/lib/hooks/useTouchedFields";
import {
  EXERCISE_NAME_MIN_LENGTH,
  validateExerciseName,
} from "@/dashboard/lib/workoutValidation";

const CATEGORY_IDS = ["chest", "back", "legs", "arms", "abs"] as const;

type ExerciseFormProps = {
  onCreateExercise: (
    name: string,
    category: string,
  ) => Promise<Exercise | null>;
};

export default function ExerciseForm({ onCreateExercise }: ExerciseFormProps) {
  const { t } = useLocale();
  const [name, setName] = useState("");
  const [category, setCategory] = useState<string>(CATEGORY_IDS[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { touch, shouldShowError, markSubmitted, reset } = useTouchedFields();
  const fieldId = useId();

  const nameErrorCode = validateExerciseName(name);
  const nameError =
    nameErrorCode === "exerciseNameMin"
      ? t("validation.exerciseNameMin", { min: EXERCISE_NAME_MIN_LENGTH })
      : nameErrorCode
        ? t(`validation.${nameErrorCode}`)
        : undefined;
  const visibleNameError = shouldShowError("name") ? nameError : undefined;
  const nameErrorId = `${fieldId}-name-error`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    markSubmitted();
    if (nameErrorCode) return;

    try {
      setIsSubmitting(true);
      const created = await onCreateExercise(name.trim(), category);
      if (created) {
        setName("");
        setCategory(CATEGORY_IDS[0]);
        reset();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card bg-base-100 shadow-sm border border-base-200">
      <div className="card-body p-5">
        <h2 className="card-title text-lg font-bold">
          {t("dashboard.newExercise")}
        </h2>
        <p className="text-xs text-base-content/60 -mt-1">
          {t("dashboard.newExerciseHint")}
        </p>

        <form onSubmit={handleSubmit} noValidate className="space-y-3 mt-2">
          <div>
            <label
              htmlFor={`${fieldId}-name`}
              className="text-xs font-semibold text-base-content/70"
            >
              {t("dashboard.exerciseName")}
            </label>
            <input
              id={`${fieldId}-name`}
              type="text"
              placeholder={t("dashboard.exerciseNamePlaceholder")}
              className={`input input-bordered w-full input-s mt-1 ${visibleNameError ? "input-error" : ""}`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => touch("name")}
              aria-invalid={Boolean(visibleNameError)}
              aria-describedby={visibleNameError ? nameErrorId : undefined}
              required
            />
            <FieldError id={nameErrorId} message={visibleNameError} />
          </div>

          <div>
            <label
              htmlFor={`${fieldId}-category`}
              className="text-xs font-semibold text-base-content/70"
            >
              {t("dashboard.category")}
            </label>
            <select
              id={`${fieldId}-category`}
              className="select select-bordered select-s w-full mt-1"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {CATEGORY_IDS.map((id) => (
                <option key={id} value={id}>
                  {t(`dashboard.categories.${id}`)}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-outline btn-s w-full"
            disabled={isSubmitting}
          >
            {isSubmitting && (
              <span className="loading loading-spinner loading-xs" />
            )}
            {isSubmitting ? t("dashboard.saving") : t("dashboard.addExercise")}
          </button>
        </form>
      </div>
    </div>
  );
}
