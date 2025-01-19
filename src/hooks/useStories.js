import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { getUserStory, getAllStory } from "@/api/services/stories";

export const useStories = () => {
  const getStory = useQuery({
    queryFn: getUserStory,
    queryKey: ["get-user-story"],
    onError: ({ response }) => {
      toast.error(response?.data?.errors[0] || "Erro ao buscar seus stories.");
    },
  });

  const getAllStories = useInfiniteQuery({
    queryFn: getAllStory,
    queryKey: ["get-stories"],
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.paging.next;
    },
    onError: ({ response }) => {
      toast.error(response?.data?.errors[0] || "Erro ao buscar stories.");
    },
  });

  return { getStory, getAllStories };
};
