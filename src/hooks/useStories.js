import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { Get, GetAll } from "@/api/services/stories";

export const useStories = () => {
  const getUserStory = () => {
    return useQuery({
      queryFn: Get,
      queryKey: ["get-user-story"],
      onError: ({ response }) => {
        toast.error(response?.data?.errors[0]);
      },
    });
  };

  const getAllStories = () => {
    return useInfiniteQuery({
      queryFn: GetAll,
      queryKey: ["get-all-stories"],
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.paging.next,
      onError: ({ response }) => {
        toast.error(response?.data?.errors[0]);
      },
    });
  };

  return { getUserStory, getAllStories };
};
