import type { ProfileResponse } from "@/types/profile-types";
import type { SuccessResponse } from "@/types/api-types";
import { api } from "@/lib/http/api";

export const profileService = {
  async findMeProfile() {
    const response = await api.get<SuccessResponse<ProfileResponse>>("/profiles/me");
    return response.data.data;
  },
};
