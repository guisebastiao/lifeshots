import { createBrowserRouter } from "react-router-dom";
import { PublicRoutes } from "@/routes/publicRoutes";
import { PublicRoutes } from "@/routes/publicRoutes";

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
