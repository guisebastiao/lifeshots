import { createBrowserRouter } from "react-router-dom";
import { PrivateRoutes } from "@/routes/PrivateRoutes";
import { PublicRoutes } from "@/routes/PublicRoutes";

export const router = createBrowserRouter([
  {
    element: <PublicRoutes />,
    children: [],
  },
  {
    element: <PrivateRoutes />,
    children: [],
  },
]);
