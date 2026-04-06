import type { CommentResponse } from "@/features/comment/types/comment-types";
import { http } from "@/shared/api/http";

export const getComments = async ({ postId, offset }: { postId: string; offset: number }) => {
  const response = await http.get<CommentResponse[]>(`/comments/${postId}`, {
    params: { offset, limit: 20 },
  });

  if (response.status === "error") {
    throw response.error;
  }

  return response;
};
