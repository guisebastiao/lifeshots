import { AuthProvider } from "./AuthContext";
import { QueryProvider } from "./QueryProvider";

export const AppContextProvider = ({ children }) => {
  return (
    <AuthProvider>
      <QueryProvider>{children}</QueryProvider>
    </AuthProvider>
  );
};
