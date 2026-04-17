import type { PostResponse } from "@/features/post/types/post-types";
import type { ErrorPayload } from "@/shared/types/api-types";
import { useQuery } from "@tanstack/react-query";
import { getPost } from "@/features/post/api";

export const useGetPost = ({ postId }: { postId: string }) => {
  return useQuery<PostResponse, ErrorPayload>({
    queryKey: ["post", postId],
    queryFn: () => getPost({ postId }),
    enabled: !!postId,
  });
};
