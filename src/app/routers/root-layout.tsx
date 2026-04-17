import { useSession } from "@/app/hooks/use-session";
import { usePush } from "@/app/hooks/use-push";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";

export const RootLayout = () => {
  const { session } = useSession();
  const { subscribe } = usePush();

  useEffect(() => {
    if (session.isAuthenticated) {
      subscribe();
    }
  }, [session]);

  return (
    <div className="min-h-dvh min-w-68.75 flex bg-background md:flex-row flex-col-reverse">
      <Outlet />
    </div>
  );
};
