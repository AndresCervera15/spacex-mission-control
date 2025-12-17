import { QueryClient } from "@tanstack/react-query";

// QueryClient instance
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5
    },
  },
});
