import { createBrowserRouter } from "react-router-dom";
import { PrivateRoutes } from "@/app/routers/private-routes";
import { PublicRoutes } from "@/app/routers/public-routes";
import { RootLayout } from "@/app/routers/root-layout";

import { NotFound } from "@/features/not-found/pages/not-found";
import { Register } from "@/features/auth/pages/register";
import { Login } from "@/features/auth/pages/login";
import { Feed } from "@/features/feed/pages";
import { OauthSuccess } from "@/features/auth/pages/auth-success";
import { OauthError } from "@/features/auth/pages/auth-error";
import { Me } from "@/features/profile/pages/me";
import { Profile } from "@/features/profile/pages/profile";
import { Notification } from "@/features/notification/pages";
import { Setting } from "@/features/setting/pages";
import { Search } from "@/features/search/pages";
import { Publish } from "@/features/publish/pages";
import { UpdatePost } from "@/features/update-post/pages";

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
        ],
      },
      {
        element: <PrivateRoutes />,
        children: [
          {
            path: "/",
            element: <Feed />,
          },
          {
            path: "/me",
            element: <Me />,
          },
          {
            path: "/profile/:handle",
            element: <Profile />,
          },
          {
            path: "/update-post/:postId",
            element: <UpdatePost />,
          },
          {
            path: "/publish",
            element: <Publish />,
          },
          {
            path: "/search",
            element: <Search />,
          },
          {
            path: "/notifications",
            element: <Notification />,
          },
          {
            path: "/settings",
            element: <Setting />,
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
