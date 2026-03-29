import type { ErrorPayload, SuccessResponse } from "@/shared/types/api-types";
import type { ReplyCommentResponse } from "../types/reply-comment-types";
import { useMutation, type InfiniteData } from "@tanstack/react-query";
import { deleteReplyComment } from "@/features/reply-comment/api";
import { queryClient } from "@/app/providers/query-client";

type DeleteReplyCommentContext = {
  previousReplyComments?: InfiniteData<SuccessResponse<ReplyCommentResponse[]>>;
};

export const useDeleteReplyComment = () => {
  return useMutation<SuccessResponse, ErrorPayload, { replyCommentId: string }, DeleteReplyCommentContext>({
    mutationFn: deleteReplyComment,
    onSuccess: (_, { replyCommentId }) => {
      queryClient.setQueriesData<InfiniteData<SuccessResponse<ReplyCommentResponse[]>>>(
        { queryKey: ["get-reply-comments"] },
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              data: page.data.filter((replyComment) => replyComment.id !== replyCommentId),
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
