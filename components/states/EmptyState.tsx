import { Button } from "@/components/ui/Button";

interface EmptyStateProps {
  onReset?: () => void;
  message?: string;
}

export function EmptyState({ onReset, message }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="mb-6 text-6xl">🚀</div>

      <h2 className="mb-2 text-2xl font-bold text-nebula-100">No Launches Found</h2>

      <p className="mb-6 max-w-md text-nebula-300">
        {message ||
          "Try adjusting your filters or check back later for upcoming missions."}
      </p>

      {onReset && (
        <Button onClick={onReset} variant="secondary">
          Reset Filters
        </Button>
      )}
    </div>
  );
}
