import { Button } from "@/components/ui/Button";

interface ErrorStateProps {
  error: Error;
  onRetry?: () => void;
}

export function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="mb-6 text-6xl">🚨</div>

      <h2 className="mb-2 text-2xl font-bold text-nebula-100">
        Houston, we have a problem
      </h2>

      <p className="mb-6 max-w-md text-nebula-300">
        {error.message || "Failed to load launch data. Please try again."}
      </p>

      {onRetry && (
        <Button onClick={onRetry} variant="primary">
          Retry Launch Sequence
        </Button>
      )}
    </div>
  );
}
