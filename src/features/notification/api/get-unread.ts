import type { UnreadResponse } from "@/features/notification/types/unread-types";
import { http } from "@/shared/api/http";

export const getUnread = async () => {
  const response = await http.get<UnreadResponse>("/notifications/unread");

  if (response.status === "error") {
    throw response.error;
  }

  return response.data;
};
