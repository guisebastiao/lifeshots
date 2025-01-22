import {
  useMutation,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

import { Create, GetAll } from "@/api/services/follow";

export const useFollow = () => {
  const queryClient = useQueryClient();

  const createFollow = () => {
    return useMutation({
      mutationFn: Create,
      onSuccess: () => {
        queryClient.invalidateQueries(["follows"]);
      },
      onError: ({ response }) => {
        toast.error(response?.data?.errors[0]);
      },
    });
  };

  const getAllFollows = ({ userId, type }) => {
    return useInfiniteQuery({
      queryFn: ({ pageParam }) => GetAll({ pageParam, userId, type }),
      queryKey: ["follows", userId, type],
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.paging?.next,
      onError: ({ response }) => {
        toast.error(response?.data?.errors[0]);
      },
    });
  };

  return { createFollow, getAllFollows };
};
