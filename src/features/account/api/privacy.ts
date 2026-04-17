import type { PrivacyRequest } from "@/features/account/types/privacy-types";
import { http } from "@/shared/api/http";

export const privacy = async ({ data }: { data: PrivacyRequest }) => {
  const response = await http.patch("/account/privacy", data);

  if (response.status === "error") {
    throw response.error;
  }

  return response;
};
