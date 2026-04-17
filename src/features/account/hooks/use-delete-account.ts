import type { DeleteAccountRequest } from "@/features/account/types/delete-account-types";
import type { ErrorPayload, SuccessResponse } from "@/shared/types/api-types";
import { deleteAccount } from "@/features/account/api";
import { useMutation } from "@tanstack/react-query";

export const useDeleteAccount = () => {
  return useMutation<SuccessResponse, ErrorPayload<DeleteAccountRequest>, { data: DeleteAccountRequest }>({
    mutationFn: deleteAccount,
  });
};
