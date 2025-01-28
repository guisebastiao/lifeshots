import { createBrowserRouter } from "react-router-dom";
import { PrivateRoutes } from "@/routes/PrivateRoutes";
import { PublicRoutes } from "@/routes/PublicRoutes";

import { NotFound } from "@/pages/NotFound";
import { Login } from "@/pages/Login";
import { Register } from "@/pages/Register";
import { ActiveLogin } from "@/pages/ActiveLogin";
import { ActiveAccount } from "@/pages/ActiveAccount";
import { UserPending } from "@/pages/UserPending";
import { ForgotPassword } from "@/pages/ForgotPassword";
import { ResetPassword } from "@/pages/ResetPassword";
import { Notifications } from "@/pages/Notifications";
import { Setting } from "@/pages/Setting";
import { Feed } from "@/pages/Feed";
import { Explorer } from "@/pages/Explorer";
import { SendPost } from "@/pages/SendPost";
import { Search } from "@/pages/Search";
import { Profile } from "@/pages/Profile";
import { User } from "@/pages/User";
import { SendStory } from "@/pages/SendStory";
import { EditPost } from "@/pages/EditPost";

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
      {
        path: "/user-pending",
        element: <UserPending />,
      },
      {
        path: "/forgot-password/",
        element: <ForgotPassword />,
      },
      {
        path: "/reset-password/:tokenId",
        element: <ResetPassword />,
      },
    ],
  },
  {
    element: <PrivateRoutes />,
    children: [
      {
        path: "/notifications",
        element: <Notifications />,
      },
      {
        path: "/setting",
        element: <Setting />,
      },
      {
        path: "/",
        element: <Feed />,
      },
      {
        path: "/explorer",
        element: <Explorer />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/user/:userId",
        element: <User />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/send-post",
        element: <SendPost />,
      },
      {
        path: "/send-story",
        element: <SendStory />,
      },
      {
        path: "/edit-post/:postId",
        element: <EditPost />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
