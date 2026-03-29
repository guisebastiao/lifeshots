import type { LoginRequest } from "@/features/auth/types/login-types";
import { http } from "@/shared/lib/http";

export const login = async ({ data }: { data: LoginRequest }) => {
  const response = await http.post("/auth/login", data);

  if (response.status === "error") {
    throw response.error;
  }

  return response;
};
