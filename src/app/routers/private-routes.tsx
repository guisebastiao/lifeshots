import { useSession } from "@/app/hooks/use-session";
import { Navigate, Outlet } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";

export const PrivateRoutes = () => {
  const { session } = useSession();

  if (session.isAuthenticated === null) {
    return <Spinner className="size-5 mx-auto self-center" />;
  }

  return session.isAuthenticated ? (
    <>
      <Sidebar />
      <Outlet />
      <Header />
    </>
  ) : (
    <Navigate to="/login" />
  );
};
