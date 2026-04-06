import type { FollowRequest } from "@/features/follow/types/follow-types";
import { http } from "@/shared/api/http";

export const follow = async ({ profileId, data }: { profileId: string; data: FollowRequest }) => {
  const response = await http.post(`/follows/${profileId}`, data);

  if (response.status === "error") {
    throw response.error;
  }

  return response;
};
