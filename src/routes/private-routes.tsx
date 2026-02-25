import { Spinner } from "@/components/ui/spinner";
import { useSession } from "@/hooks/use-session";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoutes = () => {
  const { isAuthenticated } = useSession();

  if (isAuthenticated === null) {
    return <Spinner className="size-5 mx-auto self-center" />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};
