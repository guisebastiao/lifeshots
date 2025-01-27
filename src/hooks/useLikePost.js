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
      mutationFn: ({ data }) => Create({ data }),
      onSuccess: () => {
        queryClient.invalidateQueries(["get-feed"]);
      },
      onError: ({ response }) => {
        toast.error(
          response?.data?.errors[0] ||
            "Algo deu errado, tente novamente mais tarde."
        );
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
        toast.error(
          response?.data?.errors[0] ||
            "Algo deu errado, tente novamente mais tarde."
        );
      },
    });
  };

  return { likePost, getLikesPost };
};
