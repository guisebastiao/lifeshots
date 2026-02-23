import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";

const SCALE_TIME = 1000 * 60 * 5;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: SCALE_TIME,
    },
  },
});

export const QueryProvider = ({ children }: PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
