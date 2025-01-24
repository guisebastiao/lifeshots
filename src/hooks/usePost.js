import { useMutation, useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { Create, Get, GetAll, Update, Delete } from "@/api/services/post";

export const usePost = () => {
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

  const updatePost = ({ postId }) => {
    return useMutation({
      mutationFn: () => Update({ postId }),
      onError: ({ response }) => {
        toast.error(
          response?.data?.errors[0] ||
            "Algo deu errado, tente novamente mais tarde."
        );
      },
    });
  };

  const deletePost = () => {
    return useMutation({
      mutationFn: Delete,
      onError: ({ response }) => {
        toast.error(
          response?.data?.errors[0] ||
            "Algo deu errado, tente novamente mais tarde."
        );
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
