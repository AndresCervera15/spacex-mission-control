"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="text-center space-y-6">
        <div className="text-6xl">💥</div>

        <h1 className="text-3xl font-bold text-nebula-100">Mission Critical Error</h1>

        <p className="max-w-md text-nebula-300">
          {error.message || "An unexpected error occurred during the mission."}
        </p>

        <Button onClick={reset} variant="primary">
          Restart Mission
        </Button>
      </div>
    </div>
  );
}
