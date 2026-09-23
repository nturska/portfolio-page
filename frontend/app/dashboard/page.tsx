import { Workout, Stats, Exercise } from "@/types/workouts";
import DashboardClient from "./DashboardClient";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

async function loadDashboardData(): Promise<{
  workouts: Workout[];
  stats: Stats | null;
  exercises: Exercise[];
}> {
  try {
    const [workoutsRes, statsRes, exercisesRes] = await Promise.all([
      fetch(`${API_URL}/workouts`, { cache: "no-store" }),
      fetch(`${API_URL}/stats`, { cache: "no-store" }),
      fetch(`${API_URL}/exercises`, { cache: "no-store" }),
    ]);

    if (!workoutsRes.ok || !statsRes.ok || !exercisesRes.ok) {
      throw new Error(
        `API error: workouts=${workoutsRes.status} stats=${statsRes.status} exercises=${exercisesRes.status}`,
      );
    }

    const workouts = (await workoutsRes.json()) as Workout[];
    const stats = (await statsRes.json()) as Stats;
    const exercises = (await exercisesRes.json()) as Exercise[];
    return { workouts, stats, exercises };
  } catch (error) {
    console.error("Błąd pobierania danych:", error);
    return { workouts: [], stats: null, exercises: [] };
  }
}

export default async function DashboardPage() {
  const { workouts, stats, exercises } = await loadDashboardData();

  return (
    <DashboardClient
      initialWorkouts={workouts}
      initialStats={stats}
      initialExercises={exercises}
    />
  );
}
