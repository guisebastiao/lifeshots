import { http } from "@/shared/api/http";
import type {
  ReplyCommentResponse,
  CreateReplyCommentRequest,
} from "@/features/reply-comment/types/reply-comment-types";

export const createReplyComment = async ({
  commentId,
  data,
}: {
  commentId: string;
  data: CreateReplyCommentRequest;
}) => {
  const response = await http.post<ReplyCommentResponse>(`/reply-comments/${commentId}`, data);

  if (response.status === "error") {
    throw response.error;
  }

  return response.data;
};
