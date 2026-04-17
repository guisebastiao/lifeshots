import type { ErrorPayload, SuccessResponse } from "@/shared/types/api-types";
import type { ProfileResponse } from "@/features/profile/types/profile-types";
import { useMutation, type InfiniteData } from "@tanstack/react-query";
import type { PostResponse } from "@/features/post/types/post-types";
import { queryClient } from "@/app/providers/query-client";
import { deletePost } from "@/features/post/api";

type DeleteProfilePostContext = {
  previousProfilePublications?: SuccessResponse<PostResponse[]>;
  previousProfile?: ProfileResponse;
};

export const useDeletePost = () => {
  return useMutation<SuccessResponse, ErrorPayload, { postId: string }, DeleteProfilePostContext>({
    mutationFn: deletePost,
    onSuccess: (_, { postId }) => {
      const previousProfile = queryClient.getQueryData<ProfileResponse>(["me"]);

      const previousProfilePublications = queryClient.getQueryData<InfiniteData<SuccessResponse<PostResponse[]>>>([
        "profile-publications",
      ]);

      queryClient.setQueriesData<ProfileResponse>({ queryKey: ["me"] }, (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          postsCount: oldData.postsCount - 1,
        };
      });

      queryClient.setQueriesData<InfiniteData<SuccessResponse<PostResponse[]>>>(
        { queryKey: ["profile-publications"] },
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              data: page.data.filter((post) => post.id !== postId),
              meta: {
                ...page.meta,
                totalItems: page.meta.totalItems - 1,
                totalPages: Math.ceil((page.meta.totalItems - 1) / page.meta.itemsPerPage),
              },
            })),
          };
        },
      );

      return { previousProfilePublications, previousProfile };
    },
    onError: (_error, _variables, context) => {
      if (!context) return;
      queryClient.setQueryData(["profile-publications"], context.previousProfilePublications);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["profile-publications"] });
    },
  });
};
