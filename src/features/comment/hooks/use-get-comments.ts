import type { CommentResponse } from "@/features/comment/types/comment-types";
import type { ErrorPayload, SuccessResponse } from "@/shared/types/api-types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getComments } from "@/features/comment/api";

export const useGetComments = ({ postId }: { postId: string }) => {
  return useInfiniteQuery<SuccessResponse<CommentResponse[]>, ErrorPayload>({
    queryFn: ({ pageParam = 1 }) => getComments({ postId, offset: pageParam as number }),
    queryKey: ["get-comments", postId],
    getNextPageParam: ({ meta }) => {
      const nextPage = meta.currentPage + 1;
      const hasMore = nextPage < meta.totalPages;
      return hasMore ? nextPage : undefined;
    },
    initialPageParam: 1,
  });
};
