import type { CommentResponse, CreateCommentRequest } from "@/features/comment/types/comment-types";
import { http } from "@/shared/api/http";

export const createComment = async ({ postId, data }: { postId: string; data: CreateCommentRequest }) => {
  const response = await http.post<CommentResponse>(`/comments/${postId}`, data);

  if (response.status === "error") {
    throw response.error;
  }

  return response.data;
};
