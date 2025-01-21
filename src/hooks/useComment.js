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
      mutationFn: Create,
      onError: ({ response }) => {
        toast.error(response?.data?.errors[0]);
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
        toast.error(response?.data?.errors[0]);
      },
    });
  };

  const updateComment = () => {
    return useMutation({
      mutationFn: Update,
      onError: ({ response }) => {
        toast.error(response?.data?.errors[0]);
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["get-all-comments"]);
      },
    });
  };

  const deleteComment = () => {
    return useMutation({
      mutationFn: Delete,
      onError: ({ response }) => {
        toast.error(response?.data?.errors[0]);
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
