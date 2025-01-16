import { RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Toaster } from "@/components/ui/sonner";

import "@/global.css";

import { AppContextProvider } from "@/context/index";
import { router } from "@/routes/index";

createRoot(document.getElementById("root")).render(
  <AppContextProvider>
    <RouterProvider router={router} />
    <Toaster />
  </AppContextProvider>
);
