import { http } from "@/shared/api/http";
import type {
  NotificationSettingRequest,
  NotificationSettingResponse,
} from "@/features/notification-setting/types/notification-setting-types";

export const updateNotificationSetting = async ({ data }: { data: NotificationSettingRequest }) => {
  const response = await http.patch<NotificationSettingResponse>("/notification-setting", data);

  if (response.status === "error") {
    throw response.error;
  }

  return response.data;
};
