"use client";

import { useState } from "react";

interface WorkoutFormProps {
  onSubmit: (data: {
    title: string;
    exerciseName: string;
    reps: number;
    weightKg: number;
  }) => Promise<void>;
}

export default function WorkoutForm({ onSubmit }: WorkoutFormProps) {
  const [title, setTitle] = useState("");
  const [exerciseName, setExerciseName] = useState("");
  const [reps, setReps] = useState(10);
  const [weightKg, setWeightKg] = useState(50);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !exerciseName) return;

    try {
      setIsSubmitting(true);
      await onSubmit({ title, exerciseName, reps, weightKg });
      setTitle("");
      setExerciseName("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card bg-base-100 shadow-sm h-fit">
      <div className="card-body">
        <h2 className="card-title text-lg mb-2">Dodaj szybki trening</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Nazwa sesji (np. Klatka + Tric)"
            className="input input-bordered w-full input-sm"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Ćwiczenie (np. Wyciskanie)"
            className="input input-bordered w-full input-sm"
            value={exerciseName}
            onChange={(e) => setExerciseName(e.target.value)}
            required
          />
          <div className="flex gap-2">
            <div className="w-1/2">
              <label className="text-xs text-base-content/70">
                Powtórzenia
              </label>
              <input
                type="number"
                className="input input-bordered w-full input-sm"
                value={reps}
                onChange={(e) => setReps(Number(e.target.value))}
              />
            </div>
            <div className="w-1/2">
              <label className="text-xs text-base-content/70">
                Ciężar (kg)
              </label>
              <input
                type="number"
                step="2.5"
                className="input input-bordered w-full input-sm"
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value))}
              />
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-sm w-full mt-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Zapisywanie..." : "Zapisz trening"}
          </button>
        </form>
      </div>
    </div>
  );
}
