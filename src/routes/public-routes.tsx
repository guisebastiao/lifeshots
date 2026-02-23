import { useSession } from "@/hooks/use-session";
import { Navigate, Outlet } from "react-router-dom";

export const PublicRoutes = () => {
  const { isAuthenticated } = useSession();
  if (isAuthenticated === null) return null;
  return !isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};
