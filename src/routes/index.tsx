import { createBrowserRouter } from "react-router-dom";
import { PrivateRoutes } from "@/routes/private-routes";
import { PublicRoutes } from "@/routes/public-routes";
import { RootLayout } from "@/routes/root-layout";
import { NotFound } from "@/pages/not-found";
import { Register } from "@/pages/register";
import { Login } from "@/pages/login";
import { Home } from "@/pages/home";
import { OauthSuccess } from "@/pages/oauth-success";
import { OauthError } from "@/pages/oauth-error";
import { ForgotPassword } from "@/pages/forgot-password";
import { RecoverPassword } from "@/pages/recover-password";

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
          {
            path: "/register",
            element: <Register />,
          },
          {
            path: "/forgot-password",
            element: <ForgotPassword />,
          },
          {
            path: "/recover-password",
            element: <RecoverPassword />,
          },
        ],
      },
      {
        element: <PrivateRoutes />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
        ],
      },
      {
        path: "/oauth/success",
        element: <OauthSuccess />,
      },
      {
        path: "/oauth/error",
        element: <OauthError />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
