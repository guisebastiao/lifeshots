import type { AuthResponse, LoginRequest, RegisterRequest } from "@/types/auth-types";
import type { ErrorResponse, FieldValidationError } from "@/types/api-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePushSubscribe } from "@/hooks/use-push-subscribe";
import { authService } from "@/services/auth-service";
import { useSession } from "@/hooks/use-session";

export const useAuth = () => {
  const { subscribe } = usePushSubscribe();
  const { sessionLogin } = useSession();
  const queryClient = useQueryClient();

  const login = useMutation<AuthResponse, ErrorResponse<FieldValidationError<LoginRequest>[]>, { data: LoginRequest }>({
    mutationFn: authService.login,
    onSuccess: () => {
      sessionLogin();
      subscribe();
    },
  });

  const register = useMutation<
    AuthResponse,
    ErrorResponse<FieldValidationError<RegisterRequest>[]>,
    { data: RegisterRequest }
  >({
    mutationFn: authService.register,
  });

  const logout = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      queryClient.clear();
    },
  });

  const refresh = useMutation({
    mutationFn: authService.refresh,
    onSuccess: () => {
      subscribe();
    },
  });

  return {
    login,
    register,
    logout,
    refresh,
  };
};
