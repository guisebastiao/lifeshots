import {
  useQuery,
  useMutation,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

import { Create, Get, GetAll, Update, Delete } from "@/api/services/stories";

export const useStories = () => {
  const queryClient = useQueryClient();

  const createStory = () => {
    return useMutation({
      mutationFn: ({ data }) => Create({ data }),
      onError: ({ response }) => {
        toast.error(
          response?.data?.errors[0] ||
            "Algo deu errado, tente novamente mais tarde."
        );
      },
      onSuccess: (response) => {
        queryClient.invalidateQueries(["get-user-story"]);
        toast.success(response?.success[0]);
      },
    });
  };

  const getUserStory = () => {
    return useQuery({
      queryFn: Get,
      queryKey: ["get-user-story"],
      onError: ({ response }) => {
        toast.error(
          response?.data?.errors[0] ||
            "Algo deu errado, tente novamente mais tarde."
        );
      },
    });
  };

  const getAllStories = () => {
    return useInfiniteQuery({
      queryFn: ({ pageParam }) => GetAll({ pageParam }),
      queryKey: ["get-all-stories"],
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

  const updateStory = () => {
    return useMutation({
      mutationFn: ({ data, storyId }) => Update({ data, storyId }),
      onError: ({ response }) => {
        toast.error(
          response?.data?.errors[0] ||
            "Algo deu errado, tente novamente mais tarde."
        );
      },
      onSuccess: (response) => {
        queryClient.invalidateQueries(["get-user-story"]);
        toast.success(response?.success[0]);
      },
    });
  };

  const deleteStory = () => {
    return useMutation({
      mutationFn: ({ storyId }) => Delete({ storyId }),
      onError: ({ response }) => {
        toast.error(
          response?.data?.errors[0] ||
            "Algo deu errado, tente novamente mais tarde."
        );
      },
      onSuccess: (response) => {
        queryClient.invalidateQueries(["get-user-story"]);
        toast.success(response?.success[0]);
      },
    });
  };

  return { createStory, getUserStory, getAllStories, updateStory, deleteStory };
};
