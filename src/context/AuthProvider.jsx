import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [username, setUsername] = useState(null);

  const login = ({ auth }) => {
    localStorage.setItem("auth", JSON.stringify(auth));
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("auth");
  };

  useEffect(() => {
    const storage = localStorage.getItem("auth");
    const auth = JSON.parse(storage);

    if (auth && auth.token) {
      setIsAuthenticated(true);
      setUsername(auth.username);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const value = {
    username,
    isAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
