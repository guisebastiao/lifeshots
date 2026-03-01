import type { AuthResponse, LoginRequest, RegisterRequest } from "@/types/auth-types";
import type { SuccessResponse } from "@/types/api-types";
import { api } from "@/lib/http/api";

export const authService = {
  async login({ data }: { data: LoginRequest }) {
    const response = await api.post<SuccessResponse<AuthResponse>>("/auth/login", data);
    return response.data.data;
  },

  async register({ data }: { data: RegisterRequest }) {
    const response = await api.post<SuccessResponse<AuthResponse>>("/auth/register", data);
    return response.data.data;
  },

  async logout() {
    await api.post("/auth/logout");
  },

  async refresh() {
    await api.post("/auth/refresh");
  },
};
