import type { AuthResponse, LoginRequest, RegisterRequest } from "@/types/auth-types";
import { handleAxiosError } from "@/utils/handle-axios-error";
import type { DefaultResponse } from "@/types/api-types";
import { api } from "@/services/api";

export const authService = {
  async login({ data }: { data: LoginRequest }): Promise<DefaultResponse<AuthResponse>> {
    try {
      const response = await api.post("/auth/login", data);
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },

  async register({ data }: { data: RegisterRequest }): Promise<DefaultResponse<AuthResponse>> {
    try {
      const response = await api.post("/auth/register", data);
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },

  async logout(): Promise<DefaultResponse<null>> {
    try {
      const response = await api.post("/auth/logout");
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },
};
