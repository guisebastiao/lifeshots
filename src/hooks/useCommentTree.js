import {
  useMutation,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

import { Create, GetAll, Update, Delete } from "@/api/services/commentTree";

export const useCommentTree = () => {
  const queryClient = useQueryClient();

  const createCommentTree = () => {
    return useMutation({
      mutationFn: Create,
      onError: ({ response }) => {
        toast.error(response?.data?.errors[0]);
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["get-all-comment-tree"]);
      },
    });
  };

  const getAllCommentTree = ({ commentId }) => {
    return useInfiniteQuery({
      queryFn: ({ pageParam }) => GetAll({ pageParam, commentId }),
      queryKey: ["get-all-comment-tree", commentId],
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.paging.next,
      onError: ({ response }) => {
        toast.error(response?.data?.errors[0]);
      },
    });
  };

  const updateCommentTree = () => {
    return useMutation({
      mutationFn: Update,
      onError: ({ response }) => {
        toast.error(response?.data?.errors[0]);
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["get-all-comment-tree"]);
      },
    });
  };

  const deleteCommentTree = () => {
    return useMutation({
      mutationFn: Delete,
      onError: ({ response }) => {
        toast.error(response?.data?.errors[0]);
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["get-all-comment-tree"]);
      },
    });
  };

  return {
    createCommentTree,
    getAllCommentTree,
    updateCommentTree,
    deleteCommentTree,
  };
};
