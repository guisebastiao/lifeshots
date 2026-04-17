import type { PostResponse } from "@/features/post/types/post-types";
import { http } from "@/shared/api/http";

export const updatePost = async ({ postId, data }: { postId: string; data: FormData }) => {
  const response = await http.patch<PostResponse>(`/posts/${postId}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  if (response.status === "error") {
    throw response.error;
  }

  return response.data;
};
