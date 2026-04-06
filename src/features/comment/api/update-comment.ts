import type { CommentResponse, UpdateCommentRequest } from "@/features/comment/types/comment-types";
import { http } from "@/shared/api/http";

export const updateComment = async ({ commentId, data }: { commentId: string; data: UpdateCommentRequest }) => {
  const response = await http.patch<CommentResponse>(`/comments/${commentId}`, data);

  if (response.status === "error") {
    throw response.error;
  }

  return response.data;
};
