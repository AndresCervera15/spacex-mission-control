"use client";

import { Card } from "@/components/ui/Card";
import type { LaunchStats, FilterOption, SortOption } from "@/types/launch";
import { cn } from "@/lib/utils/cn";
import { FC } from "react";

interface SidebarProps {
  stats: LaunchStats;
  currentFilter: FilterOption;
  currentSort: SortOption;
  onFilterChange: (filter: FilterOption) => void;
  onSortChange: (sort: SortOption) => void;
}

export const Sidebar: FC<SidebarProps> = ({
  stats,
  currentFilter,
  currentSort,
  onFilterChange,
  onSortChange,
}) => {
  const filters: { value: FilterOption; label: string }[] = [
    { value: "all", label: "All Launches" },
    { value: "success", label: "Successful" },
    { value: "failure", label: "Failed" },
    { value: "upcoming", label: "Upcoming" },
  ];

  const sorts: { value: SortOption; label: string }[] = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "flight-number", label: "Flight Number" },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-nebula-100 font-display">🚀 SpaceX</h1>
        <p className="text-sm text-nebula-300">Mission Control</p>
      </div>

      <div className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-nebula-500">
          Statistics
        </h2>

        <Card className="bg-space-900">
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-rocket-500">{stats.total}</div>
              <div className="text-sm text-nebula-300">Total Launches</div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-space-700 pt-4">
              <div className="text-center">
                <div className="text-2xl font-semibold text-success-500">
                  {stats.successful}
                </div>
                <div className="text-xs text-nebula-300">Successful</div>
              </div>

              <div className="text-center">
                <div className="text-2xl font-semibold text-failure-500">
                  {stats.failed}
                </div>
                <div className="text-xs text-nebula-300">Failed</div>
              </div>
            </div>

            <div className="border-t border-space-700 pt-4 text-center">
              <div className="text-2xl font-semibold text-nebula-100">
                {stats.successRate.toFixed(1)}%
              </div>
              <div className="text-xs text-nebula-300">Success Rate</div>
            </div>
          </div>
        </Card>
      </div>

      <div className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-nebula-500">
          Filter
        </h2>
        <div className="space-y-2">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => onFilterChange(filter.value)}
              className={cn(
                "w-full rounded-lg px-4 py-2 text-left text-sm transition-all",
                currentFilter === filter.value
                  ? "bg-rocket-500 text-space-900 font-semibold"
                  : "bg-space-800 text-nebula-300 hover:bg-space-700"
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-nebula-500">
          Sort By
        </h2>
        <div className="space-y-2">
          {sorts.map((sort) => (
            <button
              key={sort.value}
              onClick={() => onSortChange(sort.value)}
              className={cn(
                "w-full rounded-lg px-4 py-2 text-left text-sm transition-all",
                currentSort === sort.value
                  ? "bg-space-700 text-nebula-100 font-medium"
                  : "bg-space-800 text-nebula-300 hover:bg-space-700"
              )}
            >
              {sort.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
