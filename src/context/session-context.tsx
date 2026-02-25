import { createContext, type PropsWithChildren, useEffect, useState } from "react";
import { queryClient } from "@/context/query-context";
import { eventBus } from "@/lib/event-bus";

interface SessionState {
  isAuthenticated: boolean | null;
  logIn: () => void;
  logOut: () => void;
}

export const SessionContext = createContext<SessionState>({} as SessionState);

export const SessionProvider = ({ children }: PropsWithChildren) => {
  const storage = localStorage.getItem("is_authenticated");
  const initialState: boolean | null = storage ? JSON.parse(storage) : false;

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(initialState);

  const logIn = () => {
    localStorage.setItem("is_authenticated", JSON.stringify(true));
    setIsAuthenticated(true);
  };

  const logOut = () => {
    localStorage.setItem("is_authenticated", JSON.stringify(false));
    setIsAuthenticated(false);
    queryClient.clear();
  };

  useEffect(() => {
    eventBus.on("authenticate", logIn);
    eventBus.on("deauthenticate", logOut);

    return () => {
      eventBus.off("authenticate", logIn);
      eventBus.off("deauthenticate", logOut);
    };
  }, []);

  return <SessionContext.Provider value={{ isAuthenticated, logIn, logOut }}>{children}</SessionContext.Provider>;
};
