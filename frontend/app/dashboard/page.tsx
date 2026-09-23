import { Workout, Stats } from "@/types/workouts";
import DashboardClient from "./DashboardClient";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

async function loadDashboardData(): Promise<{
  workouts: Workout[];
  stats: Stats | null;
}> {
  try {
    const [workoutsRes, statsRes] = await Promise.all([
      fetch(`${API_URL}/workouts`, { cache: "no-store" }),
      fetch(`${API_URL}/stats`, { cache: "no-store" }),
    ]);
    const workouts = (await workoutsRes.json()) as Workout[];
    const stats = (await statsRes.json()) as Stats;
    return { workouts, stats };
  } catch (error) {
    console.error("Błąd pobierania danych:", error);
    return { workouts: [], stats: null };
  }
}

export default async function DashboardPage() {
  const { workouts, stats } = await loadDashboardData();

  return <DashboardClient initialWorkouts={workouts} initialStats={stats} />;
}
