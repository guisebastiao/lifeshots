import type { RegisterRequest } from "@/features/auth/types/register-types";
import { http } from "@/shared/api/http";

export const register = async ({ data }: { data: RegisterRequest }) => {
  const response = await http.post("/auth/register", data);

  if (response.status === "error") {
    throw response.error;
  }

  return response;
};
