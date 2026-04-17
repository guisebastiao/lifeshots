import type { ErrorPayload, SuccessResponse } from "@/shared/types/api-types";
import type { PostResponse } from "@/features/post/types/post-types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { feedPost } from "@/features/feed/api";

export const useFeedPost = () => {
  return useInfiniteQuery<SuccessResponse<PostResponse[]>, ErrorPayload>({
    queryKey: ["feed-post"],
    queryFn: ({ pageParam = 1 }) => feedPost({ offset: pageParam as number }),
    getNextPageParam: ({ meta }) => {
      const nextPage = meta.currentPage + 1;
      const hasMore = nextPage < meta.totalPages;
      return hasMore ? nextPage : undefined;
    },
    initialPageParam: 1,
  });
};
