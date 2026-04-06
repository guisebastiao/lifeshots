import type { PostResponse } from "@/features/post/types/post-types";
import { http } from "@/shared/api/http";

export const getPublications = async ({ profileId, offset }: { profileId: string; offset: number }) => {
  const response = await http.get<PostResponse[]>(`/profiles/${profileId}/posts`, {
    params: { offset, limit: 20 },
  });

  if (response.status === "error") {
    throw response.error;
  }

  return response;
};
