import type { ErrorPayload, SuccessResponse } from "@/shared/types/api-types";
import { useMutation, type InfiniteData } from "@tanstack/react-query";
import { deleteNotifications } from "@/features/notification/api";
import { queryClient } from "@/app/providers/query-client";
import type {
  DeleteNotificationsRequest,
  NotificationResponse,
} from "@/features/notification/types/notification-types";

type NotificationContext = {
  previousNotification?: NotificationResponse[];
};

export const useDeleteNotifications = () => {
  return useMutation<SuccessResponse, ErrorPayload, { data: DeleteNotificationsRequest }, NotificationContext>({
    mutationFn: deleteNotifications,
    onSuccess: (_, { data }) => {
      const previousNotification = queryClient.getQueryData<InfiniteData<SuccessResponse<NotificationResponse[]>>>([
        "get-notifications",
      ]);

      queryClient.setQueriesData<InfiniteData<SuccessResponse<NotificationResponse[]>>>(
        { queryKey: ["get-notifications"] },
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              data: page.data.filter((notification) => data.ids.includes(notification.id)),
            })),
          };
        },
      );

      return { previousNotification };
    },
    onError: (_error, _variables, context) => {
      if (!context) return;
      queryClient.setQueryData(["get-notifications"], context.previousNotification);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["get-notifications"] });
    },
  });
};
