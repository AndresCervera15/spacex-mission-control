"use client";

import { LaunchCard } from "./LaunchCard";
import { EmptyState } from "@/components/states/EmptyState";
import type { Launch } from "@/types/launch";

interface LaunchListProps {
  launches: Launch[];
  selectedId?: string | null;
  onSelect: (id: string) => void;
  onResetFilters?: () => void;
}

export function LaunchList({
  launches,
  selectedId,
  onSelect,
  onResetFilters,
}: LaunchListProps) {
  if (launches.length === 0) {
    return <EmptyState onReset={onResetFilters} />;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {launches.map((launch) => (
        <LaunchCard
          key={launch.id}
          launch={launch}
          onClick={onSelect}
          selected={selectedId === launch.id}
        />
      ))}
    </div>
  );
}
