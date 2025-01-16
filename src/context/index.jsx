import { AuthProvider } from "@/context/AuthProvider";
import { QueryProvider } from "@/context/QueryProvider";

export const AppContextProvider = ({ children }) => {
  return (
    <AuthProvider>
      <QueryProvider>{children}</QueryProvider>
    </AuthProvider>
  );
};
