import { useInfiniteQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { GetAll } from "@/api/services/feed";

export const useFeed = () => {
  const getAllFeed = () => {
    return useInfiniteQuery({
      queryFn: ({ pageParam }) => GetAll({ pageParam }),
      queryKey: ["get-feed"],
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.paging.next,
      onError: ({ response }) => {
        toast.error(response?.data?.errors[0]);
      },
    });
  };

  return { getAllFeed };
};
