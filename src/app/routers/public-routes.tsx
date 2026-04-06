import { Spinner } from "@/shared/components/ui/spinner";
import { useSession } from "@/app/hooks/use-session";
import { Navigate, Outlet } from "react-router-dom";

export const PublicRoutes = () => {
  const { session } = useSession();

  if (session.isAuthenticated === null) {
    return <Spinner className="size-5 mx-auto self-center" />;
  }

  return !session.isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};
