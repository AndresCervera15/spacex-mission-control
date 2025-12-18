"use client";

import { useState, useMemo } from "react";
import { useLaunches } from "@/lib/hooks/useLaunches";
import { useLaunchDetail } from "@/lib/hooks/useLaunchDetail";
import { Sidebar } from "@/components/layout/Sidebar";
import { calculateLaunchStats } from "@/lib/api/spacex";
import { LaunchDetail } from "@/components/launches/LaunchDetails";
import { LaunchList } from "@/components/launches/LaunchList";
import { LoadingState } from "@/components/states/LoadingState";
import { ErrorState } from "@/components/states/ErrorState";
import { Modal } from "@/components/ui/Modal";
import type { FilterOption, SortOption, Launch } from "@/types/launch";
import { useIsMobile } from "@/lib/hooks/useMediaQuery";

export default function HomePage() {
  const { data: launches, isLoading, error, refetch } = useLaunches();
  const [selectedLaunchId, setSelectedLaunchId] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterOption>("success");
  const [sort, setSort] = useState<SortOption>("newest");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isMobile = useIsMobile();

  const { data: selectedLaunch } = useLaunchDetail(selectedLaunchId);

  const filteredAndSortedLaunches = useMemo(() => {
    if (!launches) return [];

    let filtered = [...launches];

    switch (filter) {
      case "success":
        filtered = filtered.filter((l) => l.status === "success");
        break;
      case "failure":
        filtered = filtered.filter((l) => l.status === "failure");
        break;
      case "upcoming":
        filtered = filtered.filter((l) => l.status === "upcoming");
        break;
      default:
        break;
    }

    switch (sort) {
      case "newest":
        filtered.sort((a, b) => b.date.getTime() - a.date.getTime());
        break;
      case "oldest":
        filtered.sort((a, b) => a.date.getTime() - b.date.getTime());
        break;
      case "flight-number":
        filtered.sort((a, b) => b.flightNumber - a.flightNumber);
        break;
    }

    return filtered;
  }, [launches, filter, sort]);

  // Calculate stats memoized
  const stats = useMemo(() => {
    if (!launches) {
      return {
        total: 0,
        successful: 0,
        failed: 0,
        upcoming: 0,
        successRate: 0,
      };
    }
    return calculateLaunchStats(launches);
  }, [launches]);

  const handleSelectLaunch = (id: string) => {
    setSelectedLaunchId(id);
  };

  const handleCloseModal = () => {
    setSelectedLaunchId(null);
  };

  const handleResetFilters = () => {
    setFilter("all");
    setSort("newest");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen p-6">
        <div className="mx-auto max-w-7xl">
          <LoadingState />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-6">
        <div className="mx-auto max-w-7xl">
          <ErrorState error={error as Error} onRetry={() => refetch()} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="flex">
        {!isMobile && (
          <aside className="sticky top-0 h-screen w-80 shrink-0 overflow-y-auto border-r border-space-700 bg-space-800 p-6 scrollbar-custom">
            <Sidebar
              stats={stats}
              currentFilter={filter}
              currentSort={sort}
              onFilterChange={setFilter}
              onSortChange={setSort}
            />
          </aside>
        )}

        <main className="flex-1 overflow-y-auto p-6 scrollbar-custom">
          <div className="mx-auto max-w-7xl">
            {isMobile && (
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold font-display">
                    🚀 SpaceX Mission Control
                  </h1>
                  <p className="text-sm text-nebula-300">
                    {filteredAndSortedLaunches.length} launches
                  </p>
                </div>
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="rounded-lg bg-space-800 p-2 text-nebula-100 hover:bg-space-700"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            )}

            <LaunchList
              launches={filteredAndSortedLaunches}
              selectedId={selectedLaunchId}
              onSelect={handleSelectLaunch}
              onResetFilters={handleResetFilters}
            />
          </div>
        </main>
      </div>

      <Modal
        isOpen={!!selectedLaunch}
        onClose={handleCloseModal}
        title="Mission Details"
      >
        {selectedLaunch && <LaunchDetail launch={selectedLaunch} />}
      </Modal>

      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/70"
          onClick={() => setIsSidebarOpen(false)}
        >
          <div
            className="absolute left-0 top-0 h-full w-80 overflow-y-auto bg-space-800 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex justify-end">
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="text-nebula-300 hover:text-nebula-100"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <Sidebar
              stats={stats}
              currentFilter={filter}
              currentSort={sort}
              onFilterChange={(f) => {
                setFilter(f);
                setIsSidebarOpen(false);
              }}
              onSortChange={(s) => {
                setSort(s);
                setIsSidebarOpen(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
