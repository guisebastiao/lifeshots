import { LogoutAlert } from "@/features/auth/components/logout-alert";
import { useUnread } from "@/features/notification/hooks/use-unread";
import { Badge } from "@/shared/components/ui/badge";
import { Link } from "react-router-dom";
import { Bell } from "lucide-react";

export const Header = () => {
  const { data, isLoading, isSuccess } = useUnread();

  return (
    <header className="md:hidden bg-background border-b sticky top-0 flex items-center justify-between w-full h-12 px-3">
      <h1 className="text-lg font-extrabold tracking-tight text-balance select-none my-auto">Lifeshots</h1>
      <div className="flex items-center gap-1">
        <div className="inline-flex size-8">
          <Link to="/notifications" className="relative flex flex-1">
            <Bell className="size-5 mx-auto my-auto" />
            {isLoading ? null : isSuccess && data.unread > 0 ? (
              <Badge variant="notification" className="absolute bottom-0 right-0">
                {data.unread > 99 ? "99+" : data.unread}
              </Badge>
            ) : null}
          </Link>
        </div>
        <LogoutAlert />
      </div>
    </header>
  );
};
