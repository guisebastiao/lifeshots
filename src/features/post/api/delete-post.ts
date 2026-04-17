import { http } from "@/shared/api/http";

export const deletePost = async ({ postId }: { postId: string }) => {
  const response = await http.delete(`/posts/${postId}`);

  if (response.status === "error") {
    throw response.error;
  }

  return response;
};
