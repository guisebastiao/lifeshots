import {
  useMutation,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

import { Create, GetAll, Update, Delete } from "@/api/services/comment";

export const useComment = () => {
  const queryClient = useQueryClient();

  const createComment = () => {
    return useMutation({
      mutationFn: ({ data }) => Create({ data }),
      onError: ({ response }) => {
        toast.error(
          response?.data?.errors[0] ||
            "Algo deu errado, tente novamente mais tarde."
        );
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["get-all-comments"]);
      },
    });
  };

  const getAllComments = ({ postId }) => {
    return useInfiniteQuery({
      queryFn: ({ pageParam }) => GetAll({ pageParam, postId }),
      queryKey: ["get-all-comments", postId],
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

  const updateComment = () => {
    return useMutation({
      mutationFn: ({ commentId }) => Update({ commentId }),
      onError: ({ response }) => {
        toast.error(
          response?.data?.errors[0] ||
            "Algo deu errado, tente novamente mais tarde."
        );
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["get-all-comments"]);
      },
    });
  };

  const deleteComment = ({ commentId }) => {
    return useMutation({
      mutationFn: () => Delete({ commentId }),
      onError: ({ response }) => {
        toast.error(
          response?.data?.errors[0] ||
            "Algo deu errado, tente novamente mais tarde."
        );
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["get-all-comments"]);
      },
    });
  };

  return {
    createComment,
    getAllComments,
    updateComment,
    deleteComment,
  };
};
