import type { ForgotPasswordRequest, RecoverPasswordRequest } from "@/types/recover-password-types";
import type { SuccessResponse } from "@/types/api-types";
import { api } from "@/lib/http/api";

export const recoverPasswordService = {
  async forgotPassword({ data }: { data: ForgotPasswordRequest }) {
    await api.post<SuccessResponse<void>>("/recover-password/forgot", data);
  },

  async recoverPassword({ data, token }: { data: RecoverPasswordRequest; token: string }) {
    await api.put<SuccessResponse<void>>("/recover-password", data, {
      params: { token },
    });
  },
};
