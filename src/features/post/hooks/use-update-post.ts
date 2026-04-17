import type { PostResponse, UpdatePostRequest } from "@/features/post/types/post-types";
import type { ErrorPayload, SuccessResponse } from "@/shared/types/api-types";
import { useMutation, type InfiniteData } from "@tanstack/react-query";
import { queryClient } from "@/app/providers/query-client";
import { updatePost } from "@/features/post/api";

type UpdatePostContext = {
  previousProfilePublications?: SuccessResponse<PostResponse[]>;
  previousPost?: PostResponse;
};

export const useUpdatePost = () => {
  return useMutation<
    PostResponse,
    ErrorPayload<UpdatePostRequest>,
    { data: FormData; postId: string },
    UpdatePostContext
  >({
    mutationFn: updatePost,
    onSuccess: (postUpdated, { postId }) => {
      const previousPost = queryClient.getQueryData<PostResponse>(["post"]);

      const previousProfilePublications = queryClient.getQueryData<InfiniteData<SuccessResponse<PostResponse[]>>>([
        "profile-publications",
      ]);

      queryClient.setQueriesData<PostResponse>({ queryKey: ["post", postId] }, postUpdated);

      queryClient.setQueriesData<InfiniteData<SuccessResponse<PostResponse[]>>>(
        { queryKey: ["profile-publications"] },
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              data: page.data.map((post) => {
                if (post.id === postId) {
                  return { ...postUpdated };
                }

                return post;
              }),
            })),
          };
        },
      );

      return { previousPost, previousProfilePublications };
    },
    onError: (_error, { postId }, context) => {
      if (!context) return;
      queryClient.setQueryData(["post", postId], context.previousPost);
      queryClient.setQueryData(["profile-publications"], context.previousProfilePublications);
    },
    onSettled: (_data, _error, { postId }) => {
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
      queryClient.invalidateQueries({ queryKey: ["profile-publications"] });
    },
  });
};
