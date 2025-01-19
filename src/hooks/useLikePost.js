import {
  useMutation,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

import { Create, GetAll } from "@/api/services/likePost";

export const useLikePost = () => {
  const queryClient = useQueryClient();

  const likePost = () => {
    return useMutation({
      mutationFn: Create,
      onSuccess: () => {
        queryClient.invalidateQueries(["get-feed"]);
      },
      onError: ({ response }) => {
        toast.error(response?.data?.errors[0]);
      },
    });
  };

  const getLikesPost = ({ postId }) => {
    return useInfiniteQuery({
      queryFn: ({ pageParam }) => GetAll({ pageParam, postId }),
      queryKey: ["get-likes-posts", postId],
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.paging.next,
      onError: ({ response }) => {
        toast.error(response?.data?.errors[0]);
      },
    });
  };

  return { likePost, getLikesPost };
};
