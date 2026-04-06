import { http } from "@/shared/api/http";
import type {
  NotificationSettingResponse,
  NotifyAllRequest,
} from "@/features/notification-setting/types/notification-setting-types";

export const notifyAll = async ({ data }: { data: NotifyAllRequest }) => {
  const response = await http.post<NotificationSettingResponse>("/notification-setting/notify-all", data);

  if (response.status === "error") {
    throw response.error;
  }

  return response.data;
};
