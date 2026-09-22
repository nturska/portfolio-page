"use client";

import { useState } from "react";
import Link from "next/link";
import { Workout, Stats } from "@/types/workouts";
import StatsCards from "@/dashboard/components/StatsCards";
import WorkoutForm from "@/dashboard/components/WorkoutForm";
import WorkoutList from "@/dashboard/components/WorkoutList";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

type DashboardClientProps = {
  initialWorkouts: Workout[];
  initialStats: Stats | null;
};

export default function DashboardClient({
  initialWorkouts,
  initialStats,
}: DashboardClientProps) {
  const [workouts, setWorkouts] = useState<Workout[]>(initialWorkouts);
  const [stats, setStats] = useState<Stats | null>(initialStats);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [workoutsRes, statsRes] = await Promise.all([
        fetch(`${API_URL}/workouts`),
        fetch(`${API_URL}/stats`),
      ]);
      const workoutsData = await workoutsRes.json();
      const statsData = await statsRes.json();
      setWorkouts(workoutsData);
      setStats(statsData);
    } catch (error) {
      console.error("Błąd pobierania danych:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddWorkout = async (data: {
    title: string;
    exerciseName: string;
    reps: number;
    weightKg: number;
  }) => {
    const payload = {
      title: data.title,
      date: new Date().toISOString().split("T")[0],
      notes: "Dodano z panelu Web",
      exercises: [
        {
          exercise_name: data.exerciseName,
          reps: data.reps,
          weight_kg: data.weightKg,
        },
      ],
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
    } catch (error) {
      console.error("Błąd zapisu treningu:", error);
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
    } catch (error) {
      console.error("Błąd usuwania:", error);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex justify-between items-center bg-base-100 p-4 rounded-box shadow-sm">
          <div>
            <h1 className="text-2xl font-bold">Workout Analytics Dashboard</h1>
            <p className="text-sm text-base-content/70">
              Next.js connected to FastAPI
            </p>
          </div>
          <Link href="/" className="btn btn-ghost btn-sm">
            ← Powrót do Portfolio
          </Link>
        </div>

        <StatsCards stats={stats} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <WorkoutForm onSubmit={handleAddWorkout} />
          <div className="lg:col-span-2">
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
