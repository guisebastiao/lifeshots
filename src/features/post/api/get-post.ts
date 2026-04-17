import type { PostResponse } from "@/features/post/types/post-types";
import { http } from "@/shared/api/http";

export const getPost = async ({ postId }: { postId: string }) => {
  const response = await http.get<PostResponse>(`/posts/${postId}`);

  if (response.status === "error") {
    throw response.error;
  }

  return response.data;
};
