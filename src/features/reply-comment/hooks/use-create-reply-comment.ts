import type { ErrorPayload, SuccessResponse } from "@/shared/types/api-types";
import { useMutation, type InfiniteData } from "@tanstack/react-query";
import { createReplyComment } from "@/features/reply-comment/api";
import { queryClient } from "@/app/providers/query-client";
import type {
  CreateReplyCommentRequest,
  ReplyCommentResponse,
} from "@/features/reply-comment/types/reply-comment-types";

type CreateCommentReplyContext = {
  previousReplyComments?: InfiniteData<SuccessResponse<ReplyCommentResponse[]>>;
};

export const useCreateReplyComment = () => {
  return useMutation<
    ReplyCommentResponse,
    ErrorPayload<CreateReplyCommentRequest>,
    { commentId: string; data: CreateReplyCommentRequest },
    CreateCommentReplyContext
  >({
    mutationFn: createReplyComment,
    onSuccess: (newReplyComment) => {
      queryClient.setQueriesData<InfiniteData<SuccessResponse<ReplyCommentResponse[]>>>(
        { queryKey: ["get-reply-comments"] },
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              data: [newReplyComment, ...page.data],
            })),
          };
        },
      );
    },
    onError: (_error, _variables, context) => {
      if (!context) return;
      queryClient.setQueryData(["get-reply-comments"], context.previousReplyComments);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["get-comments"] });
      queryClient.invalidateQueries({ queryKey: ["get-reply-comments"] });
    },
  });
};
