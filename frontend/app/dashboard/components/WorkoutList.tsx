import { Workout } from "@/types/workouts";

interface WorkoutListProps {
  workouts: Workout[];
  loading: boolean;
  onDelete: (id: number) => void;
}

export default function WorkoutList({
  workouts,
  loading,
  onDelete,
}: WorkoutListProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Historia sesji</h2>

      {loading ? (
        <div className="flex justify-center p-8">
          <span className="loading loading-spinner loading-md"></span>
        </div>
      ) : workouts.length === 0 ? (
        <div className="card bg-base-100 p-8 text-center text-base-content/60 border border-base-200">
          Brak zapisanych treningów. Skomponuj pierwszy zestaw po lewej stronie!
        </div>
      ) : (
        workouts.map((w) => (
          <div
            key={w.id}
            className="card bg-base-100 shadow-sm border border-base-200"
          >
            <div className="card-body p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg">{w.title}</h3>
                  <span className="text-xs text-base-content/60">{w.date}</span>
                </div>
                <button
                  onClick={() => onDelete(w.id)}
                  className="btn btn-ghost btn-xs text-error"
                >
                  Usuń
                </button>
              </div>

              <div className="divider my-1"></div>

              <div className="space-y-1">
                {w.exercises.map((s, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center text-sm py-1.5 bg-base-200/50 px-3 rounded"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{s.exercise.name}</span>
                      <span className="badge badge-outline badge-xs uppercase font-mono">
                        {s.exercise.category}
                      </span>
                    </div>
                    <span className="badge badge-sm badge-neutral">
                      {s.reps} powt. × {s.weight_kg} kg
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
