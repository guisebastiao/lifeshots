import {
  useMutation,
  useQuery,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

import { Create, Get, GetAll, Update, Delete } from "@/api/services/post";

export const usePost = () => {
  const queryClient = useQueryClient();

  const createPost = () => {
    return useMutation({
      mutationFn: Create,
      onError: ({ response }) => {
        toast.error(
          response?.data?.errors[0] ||
            "Algo deu errado, tente novamente mais tarde."
        );
      },
      onSuccess: (response) => {
        toast.success(response?.success[0]);
        queryClient.invalidateQueries(["posts", "get-all-posts"]);
      },
    });
  };

  const getPost = ({ postId }) => {
    return useQuery({
      queryFn: () => Get({ postId }),
      queryKey: ["posts", postId],
      onError: ({ response }) => {
        toast.error(
          response?.data?.errors[0] ||
            "Algo deu errado, tente novamente mais tarde."
        );
      },
    });
  };

  const getAllPosts = ({ userId }) => {
    return useInfiniteQuery({
      queryFn: ({ pageParam }) => GetAll({ pageParam, userId }),
      queryKey: ["get-all-posts", userId],
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

  const updatePost = () => {
    return useMutation({
      mutationFn: ({ postId, data }) => Update({ postId, data }),
      onError: ({ response }) => {
        toast.error(
          response?.data?.errors[0] ||
            "Algo deu errado, tente novamente mais tarde."
        );
      },
      onSuccess: (response) => {
        queryClient.invalidateQueries(["post", "get-all-posts"]);
        toast.success(response?.success[0]);
      },
    });
  };

  const deletePost = () => {
    return useMutation({
      mutationFn: ({ postId }) => Delete({ postId }),
      onError: ({ response }) => {
        toast.error(
          response?.data?.errors[0] ||
            "Algo deu errado, tente novamente mais tarde."
        );
      },
      onSuccess: (response) => {
        queryClient.invalidateQueries(["post", "get-all-posts"]);
        toast.success(response?.success[0]);
      },
    });
  };

  return {
    createPost,
    getPost,
    getAllPosts,
    updatePost,
    deletePost,
  };
};
