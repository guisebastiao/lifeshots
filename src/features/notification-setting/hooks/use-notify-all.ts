import { notifyAll } from "@/features/notification-setting/api";
import type { ErrorPayload } from "@/shared/types/api-types";
import { queryClient } from "@/app/providers/query-client";
import { useMutation } from "@tanstack/react-query";
import type {
  NotifyAllRequest,
  NotificationSettingResponse,
} from "@/features/notification-setting/types/notification-setting-types";

type NotificationSettingContext = {
  previousNotificationSetting?: NotificationSettingResponse;
};

export const useNotifyAll = () => {
  return useMutation<
    NotificationSettingResponse,
    ErrorPayload<NotifyAllRequest>,
    { data: NotifyAllRequest },
    NotificationSettingContext
  >({
    mutationFn: notifyAll,
    onMutate: ({ data }) => {
      const previousNotificationSetting = queryClient.getQueryData<NotificationSettingResponse>([
        "find-notification-setting",
      ]);

      queryClient.setQueriesData<NotificationSettingResponse>(
        { queryKey: ["find-notification-setting"] },
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            notifyAllNotifications: data.notifyAllNotifications,
            notifyCommentPost: data.notifyAllNotifications,
            notifyLikeComment: data.notifyAllNotifications,
            notifyLikePost: data.notifyAllNotifications,
            notifyLikeReplyComment: data.notifyAllNotifications,
            notifyLikeStory: data.notifyAllNotifications,
            notifyNewFollower: data.notifyAllNotifications,
            notifyReplyComment: data.notifyAllNotifications,
          };
        },
      );

      return { previousNotificationSetting };
    },
    onError: (_error, _variables, context) => {
      if (!context) return;
      queryClient.setQueryData(["find-notification-setting"], context.previousNotificationSetting);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["find-notification-setting"] });
    },
  });
};
