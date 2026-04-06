import type { LikeCommentRequest } from "@/features/like-comment/types/like-comment-types";
import { http } from "@/shared/api/http";

export const likeComment = async ({ commentId, data }: { commentId: string; data: LikeCommentRequest }) => {
  const response = await http.post(`/like-comments/${commentId}`, data);

  if (response.status === "error") {
    throw response.error;
  }

  return response;
};
