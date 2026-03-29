import type { SuccessResponse, ErrorPayload } from "@/shared/types/api-types";
import { useMutation } from "@tanstack/react-query";
import { logout } from "@/features/auth/api";

export const useLogout = () => {
  return useMutation<SuccessResponse, ErrorPayload, void>({
    mutationFn: logout,
  });
};
