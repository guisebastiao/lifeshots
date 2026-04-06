import type { DeleteNotificationsRequest } from "@/saved/types/notification-types";
import { http } from "@/shared/api/http";

export const deleteNotifications = async ({ data }: { data: DeleteNotificationsRequest }) => {
  const response = await http.delete("/notifications", {
    data,
  });

  if (response.status === "error") {
    throw response.error;
  }

  return response;
};
