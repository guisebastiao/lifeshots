import type { CommentResponse, UpdateCommentRequest } from "@/features/comment/types/comment-types";
import type { ErrorPayload, SuccessResponse } from "@/shared/types/api-types";
import { useMutation, type InfiniteData } from "@tanstack/react-query";
import { queryClient } from "@/app/providers/query-client";
import { updateComment } from "@/features/comment/api";

type UpdateCommentContext = {
  previousComments?: InfiniteData<SuccessResponse<CommentResponse[]>>;
};

export const useUpdateComment = () => {
  return useMutation<
    CommentResponse,
    ErrorPayload<UpdateCommentRequest>,
    { commentId: string; data: UpdateCommentRequest },
    UpdateCommentContext
  >({
    mutationFn: updateComment,
    onSuccess: (commentUpdated, { commentId }) => {
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
                  return commentUpdated;
                }

                return comment;
              }),
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
