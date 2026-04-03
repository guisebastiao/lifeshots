import type { NotificationSettingResponse } from "@/features/notification-setting/types/notification-setting-types";
import { findNotificationSetting } from "@/features/notification-setting/api";
import type { ErrorPayload } from "@/shared/types/api-types";
import { useQuery } from "@tanstack/react-query";

export const useFindNotificationSetting = () => {
  return useQuery<NotificationSettingResponse, ErrorPayload>({
    queryFn: findNotificationSetting,
    queryKey: ["find-notification-setting"],
  });
};
