import { LoadingState } from "@/components/states/LoadingState";

export default function Loading() {
  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto max-w-7xl">
        <LoadingState />
      </div>
    </div>
  );
}
