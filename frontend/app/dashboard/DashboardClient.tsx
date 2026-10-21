"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Workout, Stats, Exercise } from "@/types/workouts";
import StatsCards from "@/dashboard/components/StatsCards";
import ExerciseForm from "@/dashboard/components/ExerciseForm";
import WorkoutForm from "@/dashboard/components/WorkoutForm";
import WorkoutList from "@/dashboard/components/WorkoutList";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { useLocale } from "@/lib/hooks/useLocale";

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"
).replace(/\/$/, "");

async function loadDashboard(): Promise<{
  workouts: Workout[];
  stats: Stats;
  exercises: Exercise[];
}> {
  const [workoutsRes, statsRes, exercisesRes] = await Promise.all([
    fetch(`${API_URL}/workouts`),
    fetch(`${API_URL}/stats`),
    fetch(`${API_URL}/exercises`),
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
}

export default function DashboardClient() {
  const { t } = useLocale();
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (stats === null) setLoading(true);
    setError(null);
    try {
      const data = await loadDashboard();
      setWorkouts(data.workouts);
      setStats(data.stats);
      setExercises(data.exercises);
    } catch (err) {
      console.error("Błąd pobierania danych:", err);
      setError("connect");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      try {
        const data = await loadDashboard();
        if (cancelled) return;
        setWorkouts(data.workouts);
        setStats(data.stats);
        setExercises(data.exercises);
        setError(null);
      } catch (err) {
        if (cancelled) return;
        console.error("Błąd pobierania danych:", err);
        setError("connect");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleCreateExercise = async (
    name: string,
    category: string,
  ): Promise<Exercise | null> => {
    try {
      const res = await fetch(`${API_URL}/exercises`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, category }),
      });
      if (res.ok) {
        const created: Exercise = await res.json();
        setExercises((prev) => [...prev, created]);
        return created;
      }
    } catch (err) {
      console.error("Błąd tworzenia ćwiczenia:", err);
    }
    return null;
  };

  const handleAddWorkout = async (data: {
    title: string;
    sets: { exercise_id: number; reps: number; weight_kg: number }[];
  }) => {
    const payload = {
      title: data.title,
      date: new Date().toISOString().split("T")[0],
      notes: "Dodano z panelu Web",
      sets: data.sets,
    };

    try {
      const res = await fetch(`${API_URL}/workouts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        await fetchData();
      }
    } catch (err) {
      console.error("Błąd zapisu treningu:", err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`${API_URL}/workouts/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        await fetchData();
      }
    } catch (err) {
      console.error("Błąd usuwania:", err);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex flex-col-reverse items-start gap-3 sm:flex-row sm:items-center sm:justify-between bg-base-100 p-4 rounded-box shadow-sm">
          <div>
            <h1 className="text-2xl font-bold">{t("dashboard.title")}</h1>
            <p className="text-sm text-base-content/70">
              {t("dashboard.subtitle")}
            </p>
            <p className="text-sm text-secondary/70">
              <span className="font-bold">{t("dashboard.noticeLabel")}</span>{" "}
              {t("dashboard.notice")}
            </p>
          </div>
          <div className="flex w-full items-center justify-between gap-2 sm:w-auto sm:justify-end">
            <Link href="/" className="btn btn-ghost btn-sm">
              {t("dashboard.back")}
            </Link>
            <div className="flex items-center gap-2">
              <LanguageToggle />
              <ThemeToggle />
            </div>
          </div>
        </div>

        {error && (
          <div className="alert alert-warning">
            <span>{t("dashboard.error")}</span>
            <button type="button" className="btn btn-sm" onClick={fetchData}>
              {t("dashboard.retry")}
            </button>
          </div>
        )}

        <StatsCards stats={stats} loading={loading} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="space-y-6 lg:col-span-7">
            <ExerciseForm onCreateExercise={handleCreateExercise} />
            <WorkoutForm
              exercises={exercises}
              onSubmitWorkout={handleAddWorkout}
            />
          </div>
          <div className="lg:col-span-5">
            <WorkoutList
              workouts={workouts}
              loading={loading}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
