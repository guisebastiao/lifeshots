import { createBrowserRouter } from "react-router-dom";
import { PrivateRoutes } from "@/routes/private-routes";
import { PublicRoutes } from "@/routes/public-routes";
import { RootLayout } from "@/routes/root-layout";
import { NotFound } from "@/pages/not-found";
import { Login } from "@/pages/login";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        element: <PublicRoutes />,
        children: [
          {
            path: "/login",
            element: <Login />,
          },
        ],
      },
      {
        element: <PrivateRoutes />,
        children: [],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
