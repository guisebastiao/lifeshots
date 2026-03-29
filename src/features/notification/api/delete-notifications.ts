import type { DeleteNotificationsRequest } from "@/saved/types/notification-types";
import { http } from "@/shared/lib/http";

export const deleteNotifications = async ({ data }: { data: DeleteNotificationsRequest }) => {
  const response = await http.delete("/notifications", {
    data,
  });

  if (response.status === "error") {
    throw response.error;
  }

  return response;
};
