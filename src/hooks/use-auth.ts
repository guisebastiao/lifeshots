import { authService } from "@/services/auth-service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useAuth = () => {
  const useLogin = () => {
    return useMutation({
      mutationFn: authService.login,
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  const useRegister = () => {
    return useMutation({
      mutationFn: authService.register,
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  const useLogout = () => {
    return useMutation({
      mutationFn: authService.logout,
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return {
    useLogin,
    useRegister,
    useLogout,
  };
};
