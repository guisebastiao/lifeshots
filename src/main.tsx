import { SessionProvider } from "@/context/session-context";
import { QueryProvider } from "@/context/query-context";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { router } from "@/routes";
import "@/global.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <SessionProvider>
        <RouterProvider router={router} />
        <Toaster />
      </SessionProvider>
    </QueryProvider>
  </StrictMode>,
);
