import { http } from "@/shared/api/http";

export const deleteNotification = async ({ notificationId }: { notificationId: string }) => {
  const response = await http.delete(`/notifications/${notificationId}`);

  if (response.status === "error") {
    throw response.error;
  }

  return response;
};
