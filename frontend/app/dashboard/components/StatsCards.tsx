import { Stats } from "@/types/workouts";
import { StatsCardsSkeleton } from "@/dashboard/components/skeletons/StatsCardsSkeleton";

interface StatsCardsProps {
  stats: Stats | null;
  loading: boolean;
}

export default function StatsCards({ stats, loading }: StatsCardsProps) {
  if (loading) return <StatsCardsSkeleton />;
  if (!stats) return null;

  return (
    <div className="stats shadow w-full bg-base-100">
      <div className="stat">
        <div className="stat-title">Odbyte treningi</div>
        <div className="stat-value text-primary">{stats.total_workouts}</div>
        <div className="stat-desc">Zsynchronizowane z bazą SQLite</div>
      </div>
      <div className="stat">
        <div className="stat-title">Łączna objętość (Volume)</div>
        <div className="stat-value text-secondary">
          {stats.total_volume_kg} kg
        </div>
        <div className="stat-desc">Ciężar × powtórzenia</div>
      </div>
    </div>
  );
}
