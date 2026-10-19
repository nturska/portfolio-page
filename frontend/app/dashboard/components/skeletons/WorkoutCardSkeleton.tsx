type WorkoutCardSkeletonProps = {
  rows?: number;
};

export const WorkoutCardSkeleton = ({ rows = 2 }: WorkoutCardSkeletonProps) => {
  return (
    <div className="card bg-base-100 shadow-sm border border-base-200">
      <div className="card-body p-4">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1 space-y-2">
            <div className="skeleton h-5 w-1/2" />
            <div className="skeleton h-3 w-20" />
          </div>
          <div className="skeleton h-6 w-12" />
        </div>

        <div className="divider my-1"></div>

        <div className="space-y-1">
          {Array.from({ length: rows }, (_, i) => (
            <div key={i} className="skeleton h-8 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
};
