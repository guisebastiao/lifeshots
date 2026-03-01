import type { ForgotPasswordRequest, RecoverPasswordRequest } from "@/types/recover-password-types";
import type { ErrorResponse, FieldValidationError } from "@/types/api-types";
import { recoverPasswordService } from "@/services/recover-password-service";
import { useMutation } from "@tanstack/react-query";

export const useRecoverPassword = () => {
  const forgotPassword = useMutation<
    void,
    ErrorResponse<FieldValidationError<ForgotPasswordRequest>[]>,
    { data: ForgotPasswordRequest }
  >({
    mutationFn: recoverPasswordService.forgotPassword,
  });

  const recoverPassword = useMutation<
    void,
    ErrorResponse<FieldValidationError<RecoverPasswordRequest>[]>,
    { data: RecoverPasswordRequest; token: string }
  >({
    mutationFn: recoverPasswordService.recoverPassword,
  });

  return {
    forgotPassword,
    recoverPassword,
  };
};
