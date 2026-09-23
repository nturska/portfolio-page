"use client";

import { useState } from "react";
import type { Exercise } from "@/types/workouts";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      setIsSubmitting(true);
      const created = await onCreateExercise(name.trim(), category);
      if (created) {
        setName("");
        setCategory(CATEGORIES[0].id);
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

        <form onSubmit={handleSubmit} className="space-y-3 mt-2">
          <div>
            <label className="text-xs font-semibold text-base-content/70">
              Nazwa ćwiczenia
            </label>
            <input
              type="text"
              placeholder="np. Hip thrust"
              className="input input-bordered w-full input-s mt-1"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-base-content/70">
              Kategoria
            </label>
            <select
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
            disabled={isSubmitting || !name.trim()}
          >
            {isSubmitting ? "Zapisywanie..." : "Dodaj ćwiczenie"}
          </button>
        </form>
      </div>
    </div>
  );
}
