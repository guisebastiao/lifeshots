import type { NotificationResponse } from "@/features/notification/types/notification-types";
import type { ErrorPayload, SuccessResponse } from "@/shared/types/api-types";
import { useMutation, type InfiniteData } from "@tanstack/react-query";
import { deleteNotification } from "@/features/notification/api";
import { queryClient } from "@/app/providers/query-client";

type NotificationContext = {
  previousNotification?: NotificationResponse[];
};

export const useDeleteNotification = () => {
  return useMutation<SuccessResponse, ErrorPayload, { notificationId: string }, NotificationContext>({
    mutationFn: deleteNotification,
    onSuccess: (_, { notificationId }) => {
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
              data: page.data.filter(({ id }) => id !== notificationId),
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
