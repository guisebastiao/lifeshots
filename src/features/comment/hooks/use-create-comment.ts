import type { CommentResponse, CreateCommentRequest } from "@/features/comment/types/comment-types";
import type { ErrorPayload, SuccessResponse } from "@/shared/types/api-types";
import { useMutation, type InfiniteData } from "@tanstack/react-query";
import { queryClient } from "@/app/providers/query-client";
import { createComment } from "@/features/comment/api";

type CreateCommentContext = {
  previousComments?: InfiniteData<SuccessResponse<CommentResponse[]>>;
};

export const useCreateComment = () => {
  return useMutation<
    CommentResponse,
    ErrorPayload<CreateCommentRequest>,
    { postId: string; data: CreateCommentRequest },
    CreateCommentContext
  >({
    mutationFn: createComment,
    onSuccess: (newComment) => {
      queryClient.setQueriesData<InfiniteData<SuccessResponse<CommentResponse[]>>>(
        { queryKey: ["get-comments"] },
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              data: [newComment, ...page.data],
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
