import { Bell, Globe, Home, PanelLeftOpen, PlusSquare, Search, Settings } from "lucide-react";
import { useUnread } from "@/features/notification/hooks/use-unread";
import { useMe } from "@/features/profile/hooks/use-me";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/avatar";
import { NavLink } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { useState } from "react";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(() => {
    const storage = localStorage.getItem("menu_open");
    return storage ? JSON.parse(storage) : false;
  });

  const profile = useMe();
  const unread = useUnread();

  const handleOpen = () => {
    setIsOpen((prev) => {
      const state = !prev;
      localStorage.setItem("menu_open", JSON.stringify(state));
      return state;
    });
  };

  return (
    <aside
      data-open={isOpen}
      className="group sticky md:top-0 bottom-0 md:h-screen md:w-16 md:data-[open=true]:w-64 h-14 md:border-r border-t transition-[width] duration-300 bg-background flex md:flex-col flex-row"
    >
      <header className="relative md:block hidden h-12 border-b">
        <h1 className="absolute left-3.5 top-1/2 -translate-y-1/2 text-lg text-center font-extrabold tracking-tight text-balance opacity-0 group-data-[open=true]:opacity-100 transition-opacity duration-200 select-none">
          Lifeshots
        </h1>
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="absolute top-1/2 -translate-y-1/2 right-3.5 group-data-[open=true]:rotate-180"
          onClick={handleOpen}
        >
          <PanelLeftOpen className="size-5" />
        </Button>
      </header>
      <nav className="w-full md:my-5 my-auto">
        <ul className="max-w-xl w-full flex md:flex-col flex-row items-center md:justify-center justify-around gap-2 mx-auto">
          <li className="md:w-full md:px-3.5">
            <NavLink
              to="/"
              className={({ isActive }) =>
                twMerge(
                  "flex items-center justify-start max-w-9 h-9 gap-2.5 transition-all duration-300 rounded-md hover:bg-foreground/7 text-[15px] border border-transparent md:group-data-[open=true]:max-w-64 text-sidebar-text",
                  isActive && "bg-foreground/7 border border-foreground/10 text-foreground",
                )
              }
            >
              <Home className="size-5 shrink-0 ml-1.75" />
              <span className="overflow-hidden whitespace-nowrap w-0 opacity-0 transition-all duration-300 md:group-data-[open=true]:w-full md:group-data-[open=true]:opacity-100 tracking-tight">
                Início
              </span>
            </NavLink>
          </li>
          <li className="md:w-full md:px-3.5">
            <NavLink
              to="/trending"
              className={({ isActive }) =>
                twMerge(
                  "flex items-center justify-start max-w-9 h-9 gap-2.5 transition-all duration-300 rounded-md hover:bg-foreground/7 text-[15px] border border-transparent md:group-data-[open=true]:max-w-64 text-sidebar-text",
                  isActive && "bg-foreground/7 border border-foreground/10 text-foreground",
                )
              }
            >
              <Globe className="size-5 shrink-0 ml-1.75" />
              <span className="overflow-hidden whitespace-nowrap w-0 opacity-0 transition-all duration-300 md:group-data-[open=true]:w-full md:group-data-[open=true]:opacity-100 tracking-tight text-sidebar-text">
                Em alta
              </span>
            </NavLink>
          </li>
          <li className="md:w-full md:px-3.5">
            <NavLink
              to="/publish"
              className={({ isActive }) =>
                twMerge(
                  "flex items-center justify-start max-w-9 h-9 gap-2.5 transition-all duration-300 rounded-md hover:bg-foreground/7 text-[15px] border border-transparent md:group-data-[open=true]:max-w-64 text-sidebar-text",
                  isActive && "bg-foreground/7 border border-foreground/10 text-foreground",
                )
              }
            >
              <PlusSquare className="size-5 shrink-0 ml-1.75" />
              <span className="overflow-hidden whitespace-nowrap w-0 opacity-0 transition-all duration-300 md:group-data-[open=true]:w-full md:group-data-[open=true]:opacity-100 tracking-tight text-sidebar-text">
                Publicar
              </span>
            </NavLink>
          </li>
          <li className="md:w-full md:px-3.5">
            <NavLink
              to="/search"
              className={({ isActive }) =>
                twMerge(
                  "flex items-center justify-start max-w-9 h-9 gap-2.5 transition-all duration-300 rounded-md hover:bg-foreground/7 text-[15px] border border-transparent md:group-data-[open=true]:max-w-64 text-sidebar-text",
                  isActive && "bg-foreground/7 border border-foreground/10 text-foreground",
                )
              }
            >
              <Search className="size-5 shrink-0 ml-1.75" />
              <span className="overflow-hidden whitespace-nowrap w-0 opacity-0 transition-all duration-300 md:group-data-[open=true]:w-full md:group-data-[open=true]:opacity-100 tracking-tight text-sidebar-text">
                Pesquisar
              </span>
            </NavLink>
          </li>
          <li className="md:inline-block w-full px-3.5 hidden">
            <NavLink
              to="/notifications"
              className={({ isActive }) =>
                twMerge(
                  "relative flex items-center justify-start max-w-9 h-9 gap-2.5 transition-all duration-300 rounded-md hover:bg-foreground/7 text-[15px] border border-transparent md:group-data-[open=true]:max-w-64 text-sidebar-text",
                  isActive && "bg-foreground/7 border border-foreground/10 text-foreground",
                )
              }
            >
              <Bell className="size-5 shrink-0 ml-1.75" />
              <span className="overflow-hidden whitespace-nowrap w-0 opacity-0 transition-all duration-300 md:group-data-[open=true]:w-full md:group-data-[open=true]:opacity-100 tracking-tight text-sidebar-text">
                Notificações
              </span>
              {unread.isLoading ? null : unread.isSuccess && unread.data.unread > 0 ? (
                <Badge variant="notification" className="absolute bottom-px left-4.25">
                  {unread.data.unread > 99 ? "99+" : unread.data.unread}
                </Badge>
              ) : null}
            </NavLink>
          </li>
          <li className="md:w-full md:px-3.5">
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                twMerge(
                  "flex items-center justify-start max-w-9 h-9 gap-2.5 transition-all duration-300 rounded-md hover:bg-foreground/7 text-[15px] border border-transparent md:group-data-[open=true]:max-w-64 text-sidebar-text",
                  isActive && "bg-foreground/7 border border-foreground/10 text-foreground",
                )
              }
            >
              <Settings className="size-5 shrink-0 ml-1.75" />
              <span className="overflow-hidden whitespace-nowrap w-0 opacity-0 transition-all duration-300 md:group-data-[open=true]:w-full md:group-data-[open=true]:opacity-100 tracking-tight text-sidebar-text">
                Configurações
              </span>
            </NavLink>
          </li>
          <li className="md:w-full md:px-3.5">
            <NavLink
              to="/me"
              className={({ isActive }) =>
                twMerge(
                  "flex items-center group justify-start max-w-9 h-9 gap-2.5 transition-all duration-300 rounded-md hover:bg-foreground/7 text-[15px] border border-transparent md:group-data-[open=true]:max-w-64 text-sidebar-text",
                  isActive && "bg-foreground/7 border border-foreground/10 text-foreground",
                )
              }
              data-active={location.pathname === "/me"}
            >
              {profile.isPending ? (
                <Spinner className="shrink-0 ml-2" />
              ) : profile.isSuccess && profile.data ? (
                <Avatar
                  className="size-5 shrink-0 ml-1.75 border-2 group-data-[active=true]:border-foreground border-sidebar-text"
                  profilePicture={profile.data?.profilePicture}
                />
              ) : null}
              <span className="overflow-hidden whitespace-nowrap w-0 opacity-0 transition-all duration-300 md:group-data-[open=true]:w-full md:group-data-[open=true]:opacity-100 tracking-tight text-sidebar-text">
                Perfil
              </span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};
