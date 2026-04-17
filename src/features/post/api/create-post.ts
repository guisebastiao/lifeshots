import type { PostResponse } from "@/features/post/types/post-types";
import { http } from "@/shared/api/http";

export const createPost = async ({ data }: { data: FormData }) => {
  const response = await http.post<PostResponse>("/posts", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  if (response.status === "error") {
    throw response.error;
  }

  return response.data;
};
