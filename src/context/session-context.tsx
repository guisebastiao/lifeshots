import { createContext, type PropsWithChildren, useCallback, useEffect, useState } from "react";
import { useAuth } from "@/hooks/domain/use-auth";
import { authEmitter } from "@/lib/auth-events";

interface SessionState {
  isAuthenticated: boolean | null;
  logoutPending: boolean;
  sessionLogin: () => void;
  sessionLogout: () => void;
  sessionRefresh: () => void;
}

export const SessionContext = createContext<SessionState>({} as SessionState);

export const SessionProvider = ({ children }: PropsWithChildren) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(() => {
    const storage = localStorage.getItem("is_authenticated");
    return storage ? JSON.parse(storage) : false;
  });

  const [logoutPending, setLogoutPending] = useState(false);

  const { logout, refresh } = useAuth();

  const sessionLogin = useCallback(() => {
    localStorage.setItem("is_authenticated", JSON.stringify(true));
    setIsAuthenticated(true);
  }, []);

  const sessionLogout = useCallback(async () => {
    setLogoutPending(true);

    await logout
      .mutateAsync()
      .catch(() => setLogoutPending(false))
      .finally(() => setLogoutPending(false));

    localStorage.setItem("is_authenticated", JSON.stringify(false));
    setIsAuthenticated(false);
  }, []);

  const sessionRefresh = useCallback(async () => {
    await refresh.mutateAsync();
    localStorage.setItem("is_authenticated", JSON.stringify(true));
    setIsAuthenticated(true);
  }, []);

  useEffect(() => {
    authEmitter.on("auth:logout", sessionLogout);
    authEmitter.on("auth:refresh", sessionRefresh);

    return () => {
      authEmitter.off("auth:logout", sessionLogout);
      authEmitter.off("auth:refresh", sessionRefresh);
    };
  }, [sessionLogout]);

  return (
    <SessionContext.Provider value={{ isAuthenticated, logoutPending, sessionLogin, sessionLogout, sessionRefresh }}>
      {children}
    </SessionContext.Provider>
  );
};
