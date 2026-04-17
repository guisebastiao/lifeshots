import type { PostResponse } from "@/features/post/types/post-types";
import { http } from "@/shared/api/http";

export const feedPost = async ({ offset }: { offset: number }) => {
  const response = await http.get<PostResponse[]>("/feed-posts", {
    params: { offset, limit: 20 },
  });

  if (response.status === "error") {
    throw response.error;
  }

  return response;
};
