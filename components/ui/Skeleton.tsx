import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  width?: string;
  height?: string;
}

export function Skeleton({ className, width, height, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-shimmer rounded-lg bg-gradient-to-r from-space-800 via-space-700 to-space-800 bg-[length:1000px_100%]",
        className
      )}
      style={{
        width,
        height,
      }}
      {...props}
    />
  );
}

export function LaunchCardSkeleton() {
  return (
    <div className="rounded-lg border border-space-700 bg-space-800 p-6 shadow-card">
      <div className="flex gap-4">
        <Skeleton className="h-20 w-20 shrink-0 rounded-lg" />

        <div className="flex-1 space-y-3">
          <Skeleton className="h-6 w-3/4" />

          <Skeleton className="h-5 w-20" />

          <div className="space-y-2">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      </div>
    </div>
  );
}
