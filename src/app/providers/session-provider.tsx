import { createContext, type PropsWithChildren, useCallback, useState } from "react";
import Cookie from "js-cookie";

type Session = {
  isAuthenticated: boolean;
  user: {
    id: string;
    handle: string;
    roles: string[];
  } | null;
};

type SessionState = {
  session: Session;
  login: () => void;
  logout: () => void;
};

export const SessionContext = createContext<SessionState>({} as SessionState);

export const SessionProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState<Session>(() => {
    const cookie = Cookie.get("session");

    if (!cookie) {
      return {
        isAuthenticated: false,
        user: null,
      };
    }

    const json = atob(cookie);
    return JSON.parse(json);
  });

  const login = useCallback(() => {
    const cookie = Cookie.get("session");

    if (!cookie) {
      return logout();
    }

    const json = atob(cookie);
    setSession(JSON.parse(json));
  }, []);

  const logout = useCallback(() => {
    setSession({
      isAuthenticated: false,
      user: null,
    });
  }, []);

  return <SessionContext.Provider value={{ session, login, logout }}>{children}</SessionContext.Provider>;
};
