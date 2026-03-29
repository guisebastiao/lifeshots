import { SessionProvider } from "@/app/providers/session-provider";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/app/providers/query-client";
import { RouterProvider } from "react-router-dom";
import { router } from "@/app/routers";
import { Toaster } from "sonner";

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <RouterProvider router={router} />
        <Toaster />
      </SessionProvider>
    </QueryClientProvider>
  );
};
