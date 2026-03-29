import type { LikeReplyCommentRequest } from "@/features/like-reply-comment/types/like-reply-comment-types";
import type { ReplyCommentResponse } from "@/features/reply-comment/types/reply-comment-types";
import { useMutation, useQueryClient, type InfiniteData } from "@tanstack/react-query";
import type { ErrorPayload, SuccessResponse } from "@/shared/types/api-types";
import { likeReplyComment } from "@/features/like-reply-comment/api";

type LikeReplyCommentContext = {
  previousReplyComments?: InfiniteData<SuccessResponse<ReplyCommentResponse[]>>;
};

export const useLikeReplyComment = () => {
  const queryClient = useQueryClient();

  return useMutation<
    SuccessResponse,
    ErrorPayload,
    { replyCommentId: string; data: LikeReplyCommentRequest },
    LikeReplyCommentContext
  >({
    mutationFn: likeReplyComment,
    onMutate: ({ replyCommentId, data }) => {
      const previousReplyComments = queryClient.getQueryData<InfiniteData<SuccessResponse<ReplyCommentResponse[]>>>([
        "get-reply-comments",
      ]);

      queryClient.setQueriesData<InfiniteData<SuccessResponse<ReplyCommentResponse[]>>>(
        { queryKey: ["get-reply-comments"] },
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              data: page.data.map((replyComment) => {
                if (replyComment.id === replyCommentId) {
                  return {
                    ...replyComment,
                    isLiked: data.like,
                    likeCount: data.like ? replyComment.likeCount + 1 : replyComment.likeCount - 1,
                  };
                }

                return replyComment;
              }),
            })),
          };
        },
      );

      return { previousReplyComments };
    },
    onError: (_error, _variables, context) => {
      if (!context) return;
      queryClient.setQueryData(["get-reply-comments"], context.previousReplyComments);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["get-reply-comments"] });
    },
  });
};
