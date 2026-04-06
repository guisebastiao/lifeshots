import type { LikeReplyCommentRequest } from "@/features/like-reply-comment/types/like-reply-comment-types";
import { http } from "@/shared/api/http";

export const likeReplyComment = async ({
  replyCommentId,
  data,
}: {
  replyCommentId: string;
  data: LikeReplyCommentRequest;
}) => {
  const response = await http.post(`/like-reply-comments/${replyCommentId}`, data);

  if (response.status === "error") {
    throw response.error;
  }

  return response;
};
