import type { UpdatePasswordRequest } from "@/features/account/types/update-password-types";
import type { ErrorPayload, SuccessResponse } from "@/shared/types/api-types";
import { updatePassword } from "@/features/account/api";
import { useMutation } from "@tanstack/react-query";

export const useUpdatePassword = () => {
  return useMutation<SuccessResponse, ErrorPayload<UpdatePasswordRequest>, { data: UpdatePasswordRequest }>({
    mutationFn: updatePassword,
  });
};
