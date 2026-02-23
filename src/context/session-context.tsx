import { createContext, type PropsWithChildren, useState } from "react";
import { queryClient } from "@/context/query-context";

interface SessionState {
  isAuthenticated: boolean | null;
  logIn: () => void;
  logOut: () => void;
}

export const SessionContext = createContext<SessionState>({} as SessionState);

export const SessionProvider = ({ children }: PropsWithChildren) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(false);

  const logIn = () => {
    setIsAuthenticated(true);
  };

  const logOut = () => {
    setIsAuthenticated(false);
    queryClient.clear();
  };

  return <SessionContext.Provider value={{ isAuthenticated, logIn, logOut }}>{children}</SessionContext.Provider>;
};
