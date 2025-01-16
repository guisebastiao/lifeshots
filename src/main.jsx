import { RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";

import { AppContextProvider } from "@/context/index";
import { router } from "@/routes/index";

createRoot(document.getElementById("root")).render(
  <AppContextProvider>
    <RouterProvider router={router} />
  </AppContextProvider>
);
