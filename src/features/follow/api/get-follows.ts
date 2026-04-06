import type { ProfileResponse } from "@/features/profile/types/profile-types";
import type { FollowType } from "@/features/follow/types/follow-types";
import { http } from "@/shared/api/http";

export const getFollows = async ({
  type,
  profileId,
  offset,
}: {
  type: FollowType;
  profileId: string;
  offset: number;
}) => {
  const response = await http.get<ProfileResponse[]>(`/follows/${profileId}`, {
    params: { type, offset, limit: 20 },
  });

  if (response.status === "error") {
    throw response.error;
  }

  return response;
};
