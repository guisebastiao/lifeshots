import type { ProfileResponse } from "@/features/profile/types/profile-types";
import { http } from "@/shared/lib/http";

export const getByHandle = async ({ handle }: { handle: string }) => {
  const response = await http.get<ProfileResponse>(`/profiles/handle/${handle}`);

  if (response.status === "error") {
    throw response.error;
  }

  return response.data;
};
