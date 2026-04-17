import type { ProfileResponse } from "@/features/profile/types/profile-types";
import { http } from "@/shared/api/http";

export const searchProfile = async ({ search, offset }: { search: string; offset: number }) => {
  const response = await http.get<ProfileResponse[]>("/profiles", {
    params: {
      search,
      offset,
      limit: 20,
    },
  });

  if (response.status === "error") {
    throw response.error;
  }

  return response;
};
