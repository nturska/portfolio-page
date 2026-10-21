"use client";

import { Stats } from "@/types/workouts";
import { StatsCardsSkeleton } from "@/dashboard/components/skeletons/StatsCardsSkeleton";
import { useLocale } from "@/lib/hooks/useLocale";

interface StatsCardsProps {
  stats: Stats | null;
  loading: boolean;
}

export default function StatsCards({ stats, loading }: StatsCardsProps) {
  const { t } = useLocale();

  if (loading) return <StatsCardsSkeleton />;
  if (!stats) return null;

  return (
    <div className="stats shadow w-full bg-base-100">
      <div className="stat">
        <div className="stat-title">{t("dashboard.workoutsStat")}</div>
        <div className="stat-value text-primary">{stats.total_workouts}</div>
        <div className="stat-desc">{t("dashboard.workoutsStatDesc")}</div>
      </div>
      <div className="stat">
        <div className="stat-title">{t("dashboard.volumeStat")}</div>
        <div className="stat-value text-secondary">
          {stats.total_volume_kg} kg
        </div>
        <div className="stat-desc">{t("dashboard.volumeStatDesc")}</div>
      </div>
    </div>
  );
}
