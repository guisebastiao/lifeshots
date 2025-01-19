import {
  useMutation,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

import { Create, GetAll } from "@/api/services/block";

export const useBlock = () => {
  const queryClient = useQueryClient();

  const blockUser = () => {
    return useMutation({
      mutationFn: Create,
      onSuccess: () => {
        queryClient.invalidateQueries(["block-user"]);
      },
      onError: ({ response }) => {
        toast.error(response?.data?.errors[0]);
      },
    });
  };

  const getAllBlockedUsers = () => {
    return useInfiniteQuery({
      queryFn: ({ pageParam }) => GetAll({ pageParam }),
      queryKey: ["block-user"],
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.paging.next,
      onError: ({ response }) => {
        toast.error(response?.data?.errors[0]);
      },
    });
  };

  return { blockUser, getAllBlockedUsers };
};
