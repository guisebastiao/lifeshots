import type { ReplyCommentResponse } from "@/features/reply-comment/types/reply-comment-types";
import { http } from "@/shared/lib/http";

export const getReplyComments = async ({ commentId, offset }: { commentId: string; offset: number }) => {
  const response = await http.get<ReplyCommentResponse[]>(`/reply-comments/${commentId}`, {
    params: { offset, limit: 20 },
  });

  if (response.status === "error") {
    throw response.error;
  }

  return response;
};
