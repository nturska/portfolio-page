const STAT_COUNT = 2;

export const StatsCardsSkeleton = () => {
  return (
    <div className="stats shadow w-full bg-base-100" aria-hidden="true">
      {Array.from({ length: STAT_COUNT }, (_, i) => (
        <div key={i} className="stat space-y-2">
          <div className="skeleton h-4 w-28" />
          <div className="skeleton h-9 w-24" />
          <div className="skeleton h-3 w-40" />
        </div>
      ))}
    </div>
  );
};
