"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/config/queryClient";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  // Create a client instance per request (Next.js best practice)
  const [client] = useState(() => queryClient);

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
