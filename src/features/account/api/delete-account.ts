import type { DeleteAccountRequest } from "@/features/account/types/delete-account-types";
import { http } from "@/shared/api/http";

export const deleteAccount = async ({ data }: { data: DeleteAccountRequest }) => {
  const response = await http.delete("/account", {
    data,
  });

  if (response.status === "error") {
    throw response.error;
  }

  return response;
};
