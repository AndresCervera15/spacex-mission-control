import { useQuery } from "@tanstack/react-query";
import { fetchLaunchById } from "@/lib/api/spacex";

// Hook to fetch a single launch by ID

export function useLaunchDetail(id: string | null) {
  return useQuery({
    queryKey: ["launch", id],
    queryFn: () => {
      if (!id) {
        throw new Error("Launch ID is required");
      }
      return fetchLaunchById(id);
    },
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10
    gcTime: 30 * 60 * 1000, // 30
    retry: 2,
  });
}
