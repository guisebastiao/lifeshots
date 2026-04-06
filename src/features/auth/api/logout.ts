import { http } from "@/shared/api/http";

export const logout = async () => {
  const response = await http.post("/auth/logout");

  if (response.status === "error") {
    throw response.error;
  }

  return response;
};
