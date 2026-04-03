import { updateNotificationSetting } from "@/features/notification-setting/api";
import type { ErrorPayload } from "@/shared/types/api-types";
import { queryClient } from "@/app/providers/query-client";
import { useMutation } from "@tanstack/react-query";
import type {
  NotificationSettingRequest,
  NotificationSettingResponse,
} from "@/features/notification-setting/types/notification-setting-types";

type NotificationSettingContext = {
  previousNotificationSetting?: NotificationSettingResponse;
};

export const useUpdateNotificationSetting = () => {
  return useMutation<
    NotificationSettingResponse,
    ErrorPayload<NotificationSettingRequest>,
    { data: NotificationSettingRequest },
    NotificationSettingContext
  >({
    mutationFn: updateNotificationSetting,
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
            data,
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
