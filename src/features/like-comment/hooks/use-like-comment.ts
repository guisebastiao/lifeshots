import type { LikeCommentRequest } from "@/features/like-comment/types/like-comment-types";
import { useMutation, useQueryClient, type InfiniteData } from "@tanstack/react-query";
import type { ErrorPayload, SuccessResponse } from "@/shared/types/api-types";
import type { CommentResponse } from "@/features/comment/types/comment-types";
import { likeComment } from "@/features/like-comment/api";

type LikeCommentContext = {
  previousComments?: InfiniteData<SuccessResponse<CommentResponse[]>>;
};

export const useLikeComment = () => {
  const queryClient = useQueryClient();

  return useMutation<
    SuccessResponse,
    ErrorPayload,
    { commentId: string; data: LikeCommentRequest },
    LikeCommentContext
  >({
    mutationFn: likeComment,
    onMutate: ({ commentId, data }) => {
      const previousComments = queryClient.getQueryData<InfiniteData<SuccessResponse<CommentResponse[]>>>([
        "get-comments",
      ]);

      queryClient.setQueriesData<InfiniteData<SuccessResponse<CommentResponse[]>>>(
        { queryKey: ["get-comments"] },
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              data: page.data.map((comment) => {
                if (comment.id === commentId) {
                  return {
                    ...comment,
                    isLiked: data.like,
                    likeCount: data.like ? comment.likeCount + 1 : comment.likeCount - 1,
                  };
                }

                return comment;
              }),
            })),
          };
        },
      );

      return { previousComments };
    },
    onError: (_error, _variables, context) => {
      if (!context) return;
      queryClient.setQueryData(["get-comments"], context.previousComments);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["get-comments"] });
    },
  });
};
