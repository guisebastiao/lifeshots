import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";

import { Header } from "@/components/Header";
import { Nav } from "@/components/Nav";

export const PrivateRoutes = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === null) {
    return null;
  }

  return isAuthenticated ? (
    <>
      <Header />
      <Outlet />
      <Nav />
    </>
  ) : (
    <Navigate to="/login" />
  );
};
