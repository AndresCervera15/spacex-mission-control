import { useQuery } from "@tanstack/react-query";
import { fetchLaunches } from "@/lib/api/spacex";

//  Hook to fetch all launches with React Query

export function useLaunches() {
  return useQuery({
    queryKey: ["launches"],
    queryFn: fetchLaunches,
    staleTime: 5 * 60 * 1000, // 5
    gcTime: 10 * 60 * 1000, // 10
    refetchOnWindowFocus: false,
    retry: 2,
  });
}
