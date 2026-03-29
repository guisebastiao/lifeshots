import { http } from "@/shared/lib/http";
import type {
  ReplyCommentResponse,
  UpdateReplyCommentRequest,
} from "@/features/reply-comment/types/reply-comment-types";

export const updateReplyComment = async ({
  replyCommentId,
  data,
}: {
  replyCommentId: string;
  data: UpdateReplyCommentRequest;
}) => {
  const response = await http.patch<ReplyCommentResponse>(`/reply-comments/${replyCommentId}`, data);

  if (response.status === "error") {
    throw response.error;
  }

  return response.data;
};
