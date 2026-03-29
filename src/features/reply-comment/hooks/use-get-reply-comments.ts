import type { ReplyCommentResponse } from "@/features/reply-comment/types/reply-comment-types";
import type { ErrorPayload, SuccessResponse } from "@/shared/types/api-types";
import { getReplyComments } from "@/features/reply-comment/api";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useGetReplyComments = ({ commentId }: { commentId: string }) => {
  return useInfiniteQuery<SuccessResponse<ReplyCommentResponse[]>, ErrorPayload>({
    queryFn: ({ pageParam = 1 }) => getReplyComments({ commentId, offset: pageParam as number }),
    queryKey: ["get-reply-comments", commentId],
    getNextPageParam: ({ meta }) => {
      const nextPage = meta.currentPage + 1;
      const hasMore = nextPage < meta.totalPages;
      return hasMore ? nextPage : undefined;
    },
    initialPageParam: 1,
  });
};
