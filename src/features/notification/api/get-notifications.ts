import type { NotificationResponse } from "@/features/notification/types/notification-types";
import { http } from "@/shared/lib/http";

export const getNotifications = async ({ filter, offset }: { filter: string | undefined; offset: number }) => {
  const response = await http.get<NotificationResponse[]>("/notifications", {
    params: { filter, limit: 20, offset },
  });

  if (response.status === "error") {
    throw response.error;
  }

  return response;
};
