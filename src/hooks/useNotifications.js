import {
  useMutation,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

import {
  getAllNotifications,
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

  const updateNotifications = useMutation({
    mutationFn: updateNotificationsToRead,
    onError: ({ response }) => {
      toast.error(
        response?.data?.errors[0] ||
          "Erro ao tentar marcar como lida as suas notificações."
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
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

  return { getNotifications, updateNotifications, deleteNotifications };
};
