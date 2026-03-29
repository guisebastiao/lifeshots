import type { SuccessResponse, ErrorPayload } from "@/shared/types/api-types";
import type { LoginRequest } from "@/features/auth/types/login-types";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/features/auth/api";

export const useLogin = () => {
  return useMutation<SuccessResponse, ErrorPayload<LoginRequest>, { data: LoginRequest }>({
    mutationFn: login,
  });
};
