import {
  useMutation,
  useQuery,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

import { Get, GetAll, Update, Delete } from "@/api/services/notifications";

export const useNotifications = () => {
  const queryClient = useQueryClient();

  const notificationIsRead = () => {
    return useQuery({
      queryFn: Get,
      queryKey: ["notification-is-read"],
      onError: ({ response }) => {
        toast.error(
          response?.data?.errors[0] ||
            "Algo deu errado, tente novamente mais tarde."
        );
      },
    });
  };

  const getAllNotifications = () => {
    return useInfiniteQuery({
      queryFn: ({ pageParam }) => GetAll({ pageParam }),
      queryKey: ["get-all-notifications"],
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

  const updateAllNotifications = () => {
    return useMutation({
      mutationFn: Update,
      onError: ({ response }) => {
        toast.error(
          response?.data?.errors[0] ||
            "Algo deu errado, tente novamente mais tarde."
        );
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["notification-is-read"]);
      },
    });
  };

  const deleteAllNotifications = () => {
    return useMutation({
      mutationFn: Delete,
      onError: ({ response }) => {
        toast.error(
          response?.data?.errors[0] ||
            "Algo deu errado, tente novamente mais tarde."
        );
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["get-all-notifications"]);
      },
    });
  };

  return {
    notificationIsRead,
    getAllNotifications,
    updateAllNotifications,
    deleteAllNotifications,
  };
};
