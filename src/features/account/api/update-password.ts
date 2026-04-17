import type { UpdatePasswordRequest } from "@/features/account/types/update-password-types";
import { http } from "@/shared/api/http";

export const updatePassword = async ({ data }: { data: UpdatePasswordRequest }) => {
  const response = await http.patch("/account/password", data);

  if (response.status === "error") {
    throw response.error;
  }

  return response;
};
