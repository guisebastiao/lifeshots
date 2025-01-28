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
      mutationFn: ({ data }) => Create({ data }),
      onError: ({ response }) => {
        toast.error(
          response?.data?.errors[0] ||
            "Algo deu errado, tente novamente mais tarde."
        );
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
        toast.error(
          response?.data?.errors[0] ||
            "Algo deu errado, tente novamente mais tarde."
        );
      },
    });
  };

  const updateCommentTree = () => {
    return useMutation({
      mutationFn: ({ commentTreeId, data }) => Update({ commentTreeId, data }),
      onError: ({ response }) => {
        toast.error(
          response?.data?.errors[0] ||
            "Algo deu errado, tente novamente mais tarde."
        );
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["get-all-comment-tree"]);
      },
    });
  };

  const deleteCommentTree = () => {
    return useMutation({
      mutationFn: ({ commentTreeId }) => Delete({ commentTreeId }),
      onError: ({ response }) => {
        toast.error(
          response?.data?.errors[0] ||
            "Algo deu errado, tente novamente mais tarde."
        );
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
