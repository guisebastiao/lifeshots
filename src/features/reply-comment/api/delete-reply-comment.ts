import { http } from "@/shared/lib/http";

export const deleteReplyComment = async ({ replyCommentId }: { replyCommentId: string }) => {
  const response = await http.delete(`/reply-comments/${replyCommentId}`);

  if (response.status === "error") {
    throw response.error;
  }

  return response;
};
