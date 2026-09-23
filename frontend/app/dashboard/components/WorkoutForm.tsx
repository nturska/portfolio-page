"use client";

import { useState } from "react";
import type { Exercise } from "@/types/workouts";

type SetRow = {
  reps: number;
  weight_kg: number;
};

type ExerciseBlock = {
  exercise_id: number;
  sets: SetRow[];
};

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

  const isValid = blocks.every(
    (block) =>
      block.exercise_id > 0 &&
      block.sets.length > 0 &&
      block.sets.every((set) => set.reps > 0),
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !isValid) return;

    try {
      setIsSubmitting(true);
      await onSubmitWorkout({ title, sets: flattenSets(blocks) });
      setTitle("");
      setBlocks([emptyExerciseBlock()]);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card bg-base-100 shadow-sm border border-base-200">
      <div className="card-body p-5">
        <h2 className="card-title text-lg font-bold">Nowa sesja treningowa</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-base-content/70">
              Nazwa sesji
            </label>
            <input
              type="text"
              placeholder="np. Push Day, Trening nóg"
              className="input input-bordered w-full input-sm mt-1"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-4">
            <label className="text-xs font-semibold text-base-content/70">
              Ćwiczenia i serie
            </label>

            {blocks.map((block, blockIndex) => (
              <div
                key={blockIndex}
                className="space-y-2 rounded-lg border border-base-200 bg-base-200/40 p-3"
              >
                <div className="flex gap-2 items-center">
                  <select
                    className="select select-bordered select-sm flex-1"
                    value={block.exercise_id || ""}
                    onChange={(e) =>
                      handleExerciseChange(blockIndex, Number(e.target.value))
                    }
                    required
                  >
                    <option value="" disabled>
                      Wybierz ćwiczenie…
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
                    title="Usuń ćwiczenie"
                  >
                    ✕
                  </button>
                </div>

                {block.sets.map((set, setIndex) => (
                  <div
                    key={setIndex}
                    className="flex gap-2 items-center pl-1"
                  >
                    <span className="text-xs text-base-content/50 w-10 shrink-0">
                      Seria {setIndex + 1}
                    </span>
                    <div className="w-16">
                      <input
                        type="number"
                        min="1"
                        className="input input-bordered input-xs w-full text-center"
                        placeholder="Powt."
                        value={set.reps || ""}
                        onChange={(e) =>
                          handleSetChange(
                            blockIndex,
                            setIndex,
                            "reps",
                            Number(e.target.value),
                          )
                        }
                        required
                      />
                    </div>
                    <div className="w-20">
                      <input
                        type="number"
                        step="0.5"
                        min="0"
                        className="input input-bordered input-xs w-full text-center"
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
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveSet(blockIndex, setIndex)}
                      disabled={block.sets.length === 1}
                      className="btn btn-ghost btn-xs text-error px-1"
                      title="Usuń serię"
                    >
                      ✕
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => handleAddSet(blockIndex)}
                  disabled={!block.exercise_id}
                  className="btn btn-outline btn-xs w-full border-dashed"
                >
                  + Dodaj serię do tego ćwiczenia
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddExercise}
              className="btn btn-outline btn-sm w-full"
            >
              + Dodaj kolejne ćwiczenie
            </button>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-sm w-full mt-4"
            disabled={isSubmitting || exercises.length === 0 || !isValid}
          >
            {isSubmitting ? "Zapisywanie..." : "Zapisz cały trening"}
          </button>
        </form>
      </div>
    </div>
  );
}
