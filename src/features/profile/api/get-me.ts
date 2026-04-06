import type { ProfileResponse } from "@/features/profile/types/profile-types";
import { http } from "@/shared/api/http";

export const getMe = async () => {
  const response = await http.get<ProfileResponse>("/profiles/me");

  if (response.status === "error") {
    throw response.error;
  }

  return response.data;
};
