import type { NotificationSettingResponse } from "@/features/notification-setting/types/notification-setting-types";
import { http } from "@/shared/lib/http";

export const findNotificationSetting = async () => {
  const response = await http.get<NotificationSettingResponse>("/notification-setting");

  if (response.status === "error") {
    throw response.error;
  }

  return response.data;
};
