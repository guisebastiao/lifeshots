import { useMutation, useQueryClient, type InfiniteData } from "@tanstack/react-query";
import type { LikePostRequest } from "@/features/like-post/types/like-post-types";
import type { ErrorPayload, SuccessResponse } from "@/shared/types/api-types";
import type { PostResponse } from "@/features/post/types/post-types";
import { likePost } from "@/features/like-post/api";

type LikePostContext = {
  previousPosts?: InfiniteData<SuccessResponse<PostResponse[]>>;
  previousFeedPosts?: InfiniteData<SuccessResponse<PostResponse[]>>;
};

export const useLikePost = () => {
  const queryClient = useQueryClient();

  return useMutation<SuccessResponse, ErrorPayload, { postId: string; data: LikePostRequest }, LikePostContext>({
    mutationFn: likePost,
    onMutate: ({ postId, data }) => {
      const previousPosts = queryClient.getQueryData<InfiniteData<SuccessResponse<PostResponse[]>>>([
        "profile-publications",
      ]);

      const previousFeedPosts = queryClient.getQueryData<InfiniteData<SuccessResponse<PostResponse[]>>>(["feed-post"]);

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
                  return {
                    ...post,
                    isLiked: data.like,
                    likeCount: data.like ? post.likeCount + 1 : post.likeCount - 1,
                  };
                }

                return post;
              }),
            })),
          };
        },
      );

      queryClient.setQueriesData<InfiniteData<SuccessResponse<PostResponse[]>>>(
        { queryKey: ["feed-post"] },
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              data: page.data.map((post) => {
                if (post.id === postId) {
                  return {
                    ...post,
                    isLiked: data.like,
                    likeCount: data.like ? post.likeCount + 1 : post.likeCount - 1,
                  };
                }

                return post;
              }),
            })),
          };
        },
      );

      return { previousPosts, previousFeedPosts };
    },
    onError: (_error, _variables, context) => {
      if (!context) return;
      queryClient.setQueryData(["profile-publications"], context.previousPosts);
      queryClient.setQueryData(["feed-post"], context.previousFeedPosts);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["profile-publications"] });
      queryClient.invalidateQueries({ queryKey: ["feed-post"] });
    },
  });
};
