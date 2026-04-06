import type { ProfileResponse, UpdateProfileRequest } from "@/features/profile/types/profile-types";
import { http } from "@/shared/api/http";

export const updateProfile = async ({ data }: { data: UpdateProfileRequest }) => {
  const response = await http.patch<ProfileResponse>("/profiles", data);

  if (response.status === "error") {
    throw response.error;
  }

  return response.data;
};
