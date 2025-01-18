import { createBrowserRouter } from "react-router-dom";
import { PrivateRoutes } from "@/routes/PrivateRoutes";
import { PublicRoutes } from "@/routes/PublicRoutes";

import { NotFound } from "@/pages/NotFound";
import { Login } from "@/pages/Login";
import { Register } from "@/pages/Register";
import { ActiveLogin } from "@/pages/ActiveLogin";
import { ActiveAccount } from "@/pages/ActiveAccount";
import { Feed } from "@/pages/Feed";

export const router = createBrowserRouter([
  {
    element: <PublicRoutes />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/active-login/:token",
        element: <ActiveLogin />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/active-account/:activeToken",
        element: <ActiveAccount />,
      },
    ],
  },
  {
    element: <PrivateRoutes />,
    children: [
      {
        path: "/",
        element: <Feed />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
