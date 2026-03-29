import type { SuccessResponse, ErrorPayload } from "@/shared/types/api-types";
import type { RegisterRequest } from "@/features/auth/types/register-types";
import { useMutation } from "@tanstack/react-query";
import { register } from "@/features/auth/api";

export const useRegister = () => {
  return useMutation<SuccessResponse, ErrorPayload<RegisterRequest>, { data: RegisterRequest }>({
    mutationFn: register,
  });
};
