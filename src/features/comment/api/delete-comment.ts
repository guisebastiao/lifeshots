import { http } from "@/shared/api/http";

export const deleteComment = async ({ commentId }: { commentId: string }) => {
  const response = await http.delete(`/comments/${commentId}`);

  if (response.status === "error") {
    throw response.error;
  }

  return response;
};
