import type { ForgotPasswordRequest, RecoverPasswordRequest } from "@/types/recover-password-types";
import { handleAxiosError } from "@/lib/http/errors/handle-axios-error";
import type { DefaultResponse } from "@/types/api-types";
import { api } from "@/lib/http/api";

export const recoverPasswordService = {
  async forgotPassword({ data }: { data: ForgotPasswordRequest }): Promise<DefaultResponse<null>> {
    try {
      const response = await api.post("/recover-password/forgot", data);
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },

  async recoverPassword({
    data,
    token,
  }: {
    data: RecoverPasswordRequest;
    token: string;
  }): Promise<DefaultResponse<null>> {
    try {
      const response = await api.put("/recover-password", data, {
        params: { token },
      });
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },
};
