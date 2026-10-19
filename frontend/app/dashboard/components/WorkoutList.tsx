"use client";

import { useState } from "react";
import type { ExerciseSet, Workout } from "@/types/workouts";
import { WorkoutCardSkeleton } from "@/dashboard/components/skeletons/WorkoutCardSkeleton";

const SKELETON_COUNT = 3;

type WorkoutListProps = {
  workouts: Workout[];
  loading: boolean;
  onDelete: (id: number) => Promise<void>;
};

type GroupedExercise = {
  exerciseId: number;
  name: string;
  category: string;
  setCount: number;
  sets: ExerciseSet[];
};

function groupSetsByExercise(sets: ExerciseSet[]): GroupedExercise[] {
  const groups = new Map<number, GroupedExercise>();

  for (const set of sets) {
    const exerciseId = set.exercise.id;
    const existing = groups.get(exerciseId);

    if (existing) {
      existing.setCount += 1;
      existing.sets.push(set);
    } else {
      groups.set(exerciseId, {
        exerciseId,
        name: set.exercise.name,
        category: set.exercise.category,
        setCount: 1,
        sets: [set],
      });
    }
  }

  return Array.from(groups.values());
}

function formatLoadSummary(sets: ExerciseSet[]): string {
  const unique = new Set(sets.map((s) => `${s.reps}×${s.weight_kg}`));

  if (unique.size === 1) {
    const first = sets[0];
    return `${first.reps} powt. × ${first.weight_kg} kg`;
  }

  return sets.map((s) => `${s.reps}×${s.weight_kg}kg`).join(", ");
}

function setCountLabel(count: number): string {
  if (count === 1) return "1 seria";
  if (count >= 2 && count <= 4) return `${count} serie`;
  return `${count} serii`;
}

export default function WorkoutList({
  workouts,
  loading,
  onDelete,
}: WorkoutListProps) {
  const [deletingIds, setDeletingIds] = useState<ReadonlySet<number>>(
    () => new Set(),
  );

  const handleDelete = async (id: number) => {
    setDeletingIds((prev) => new Set(prev).add(id));
    try {
      await onDelete(id);
    } finally {
      setDeletingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Historia sesji</h2>

      {loading ? (
        <div className="space-y-4" aria-busy="true">
          <span className="sr-only">Ładowanie treningów…</span>
          {Array.from({ length: SKELETON_COUNT }, (_, i) => (
            <WorkoutCardSkeleton key={i} rows={i === 0 ? 3 : 2} />
          ))}
        </div>
      ) : workouts.length === 0 ? (
        <div className="card bg-base-100 p-8 text-center text-base-content/60 border border-base-200">
          Brak zapisanych treningów. Skomponuj pierwszy zestaw po lewej stronie!
        </div>
      ) : (
        workouts.map((w) => {
          const isDeleting = deletingIds.has(w.id);

          return (
            <div
              key={w.id}
              aria-busy={isDeleting}
              className={`card bg-base-100 shadow-sm border border-base-200 transition-[opacity,filter] duration-300 ${
                isDeleting ? "opacity-50 grayscale pointer-events-none" : ""
              }`}
            >
              <div className="card-body p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg">{w.title}</h3>
                    <span className="text-xs text-base-content/60">
                      {w.date}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDelete(w.id)}
                    disabled={isDeleting}
                    className="btn btn-ghost btn-xs text-error"
                  >
                    {isDeleting && (
                      <span className="loading loading-spinner loading-xs" />
                    )}
                    {isDeleting ? "Usuwanie..." : "Usuń"}
                  </button>
                </div>

                <div className="divider my-1"></div>

                <div className="space-y-1">
                  {groupSetsByExercise(w.exercises).map((group) => (
                    <div
                      key={group.exerciseId}
                      className="flex justify-between items-center text-sm py-1.5 bg-base-200/50 px-3 rounded gap-2"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="font-medium truncate">
                          {group.name}
                        </span>
                        <span className="badge badge-outline badge-xs uppercase font-mono shrink-0">
                          {group.category}
                        </span>
                        <span className="badge badge-ghost badge-xs shrink-0">
                          {setCountLabel(group.setCount)}
                        </span>
                      </div>
                      <span className="badge badge-sm badge-neutral shrink-0 max-w-[50%] truncate">
                        {formatLoadSummary(group.sets)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
