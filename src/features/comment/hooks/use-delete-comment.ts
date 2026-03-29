import type { CommentResponse } from "@/features/comment/types/comment-types";
import type { ErrorPayload, SuccessResponse } from "@/shared/types/api-types";
import { useMutation, type InfiniteData } from "@tanstack/react-query";
import { queryClient } from "@/app/providers/query-client";
import { deleteComment } from "@/features/comment/api";

type DeleteCommentContext = {
  previousComments?: InfiniteData<SuccessResponse<CommentResponse[]>>;
};

export const useDeleteComment = () => {
  return useMutation<SuccessResponse, ErrorPayload, { commentId: string }, DeleteCommentContext>({
    mutationFn: deleteComment,
    onSuccess: (_, { commentId }) => {
      queryClient.setQueriesData<InfiniteData<SuccessResponse<CommentResponse[]>>>(
        { queryKey: ["get-comments"] },
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              data: page.data.filter((comment) => comment.id !== commentId),
            })),
          };
        },
      );
    },
    onError: (_error, _variables, context) => {
      if (!context) return;
      queryClient.setQueryData(["get-comments"], context.previousComments);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["get-comments"] });
      queryClient.invalidateQueries({ queryKey: ["profile-publications"] });
    },
  });
};
