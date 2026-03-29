import type { LikePostRequest } from "@/features/like-post/types/like-post-types";
import { http } from "@/shared/lib/http";

export const likePost = async ({ postId, data }: { postId: string; data: LikePostRequest }) => {
  const response = await http.post(`/like-posts/${postId}`, data);

  if (response.status === "error") {
    throw response.error;
  }

  return response;
};
