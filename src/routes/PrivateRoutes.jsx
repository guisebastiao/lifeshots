import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";

export const PrivateRoutes = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === null) {
    return null;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};
