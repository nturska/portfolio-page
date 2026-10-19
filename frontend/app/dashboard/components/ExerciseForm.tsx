"use client";

import { useId, useState } from "react";
import type { Exercise } from "@/types/workouts";
import { FieldError } from "@/components/ui/FieldError";
import { useTouchedFields } from "@/lib/hooks/useTouchedFields";
import { validateExerciseName } from "@/dashboard/lib/workoutValidation";

const CATEGORIES = [
  { id: "chest", label: "Klatka" },
  { id: "back", label: "Plecy" },
  { id: "legs", label: "Nogi" },
  { id: "arms", label: "Ręce / Ramiona" },
  { id: "abs", label: "Brzuch" },
] as const;

type ExerciseFormProps = {
  onCreateExercise: (
    name: string,
    category: string,
  ) => Promise<Exercise | null>;
};

export default function ExerciseForm({ onCreateExercise }: ExerciseFormProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState<string>(CATEGORIES[0].id);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { touch, shouldShowError, markSubmitted, reset } = useTouchedFields();
  const fieldId = useId();

  const nameError = validateExerciseName(name);
  const visibleNameError = shouldShowError("name") ? nameError : undefined;
  const nameErrorId = `${fieldId}-name-error`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    markSubmitted();
    if (nameError) return;

    try {
      setIsSubmitting(true);
      const created = await onCreateExercise(name.trim(), category);
      if (created) {
        setName("");
        setCategory(CATEGORIES[0].id);
        reset();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card bg-base-100 shadow-sm border border-base-200">
      <div className="card-body p-5">
        <h2 className="card-title text-lg font-bold">Nowe ćwiczenie</h2>
        <p className="text-xs text-base-content/60 -mt-1">
          Dodaj ćwiczenie do bazy, potem użyj go w sesji treningowej.
        </p>

        <form onSubmit={handleSubmit} noValidate className="space-y-3 mt-2">
          <div>
            <label
              htmlFor={`${fieldId}-name`}
              className="text-xs font-semibold text-base-content/70"
            >
              Nazwa ćwiczenia
            </label>
            <input
              id={`${fieldId}-name`}
              type="text"
              placeholder="np. Przysiad"
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
              Kategoria
            </label>
            <select
              id={`${fieldId}-category`}
              className="select select-bordered select-s w-full mt-1"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
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
            {isSubmitting ? "Zapisywanie..." : "Dodaj ćwiczenie"}
          </button>
        </form>
      </div>
    </div>
  );
}
