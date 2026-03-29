import type { ErrorPayload, SuccessResponse } from "@/shared/types/api-types";
import { useMutation, type InfiniteData } from "@tanstack/react-query";
import { updateReplyComment } from "@/features/reply-comment/api";
import { queryClient } from "@/app/providers/query-client";
import type {
  ReplyCommentResponse,
  UpdateReplyCommentRequest,
} from "@/features/reply-comment/types/reply-comment-types";

type UpdateReplyCommentContext = {
  previousReplyComments?: InfiniteData<SuccessResponse<ReplyCommentResponse[]>>;
};

export const useReplyUpdateComment = () => {
  return useMutation<
    ReplyCommentResponse,
    ErrorPayload<UpdateReplyCommentRequest>,
    { replyCommentId: string; data: UpdateReplyCommentRequest },
    UpdateReplyCommentContext
  >({
    mutationFn: updateReplyComment,
    onSuccess: (replyCommentUpdated, { replyCommentId }) => {
      queryClient.setQueriesData<InfiniteData<SuccessResponse<ReplyCommentResponse[]>>>(
        { queryKey: ["get-comments"] },
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              data: page.data.map((replyComment) => {
                if (replyComment.id === replyCommentId) {
                  return replyCommentUpdated;
                }

                return replyComment;
              }),
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
