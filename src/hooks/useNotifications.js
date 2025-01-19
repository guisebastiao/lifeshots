import {
  useMutation,
  useQuery,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

import {
  getAllNotifications,
  getNotificationIsRead,
  updateNotificationsToRead,
  deleteAllNotifications,
} from "@/api/services/notifications";

export const useNotifications = () => {
  const queryClient = useQueryClient();

  const getNotifications = useInfiniteQuery({
    queryFn: ({ pageParam }) => getAllNotifications({ pageParam }),
    queryKey: ["notifications"],
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.paging.next;
    },
    onError: ({ response }) => {
      toast.error(
        response?.data?.errors[0] || "Erro ao tentar buscar as notificações"
      );
    },
  });

  const notificationIsRead = useQuery({
    queryFn: getNotificationIsRead,
    queryKey: ["notification-is-read"],
    onError: ({ response }) => {
      toast.error(
        response?.data?.errors[0] ||
          "Erro ao tentar buscar as notificações como lidas"
      );
    },
  });

  const updateNotifications = useMutation({
    mutationFn: updateNotificationsToRead,
    onError: ({ response }) => {
      toast.error(
        response?.data?.errors[0] ||
          "Erro ao tentar marcar como lida as suas notificações."
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["notification-is-read"]);
    },
  });

  const deleteNotifications = useMutation({
    mutationFn: deleteAllNotifications,
    onError: ({ response }) => {
      toast.error(
        response?.data?.errors[0] || "Erro ao tentar deletar suas notificações."
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
    },
  });

  return {
    getNotifications,
    notificationIsRead,
    updateNotifications,
    deleteNotifications,
  };
};
