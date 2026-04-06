import type { UnreadResponse } from "@/features/notification/types/unread-types";
import { http } from "@/shared/api/http";

export const readAll = async () => {
  const response = await http.patch<UnreadResponse>("/notifications/read-all");

  if (response.status === "error") {
    throw response.error;
  }

  return response.data;
};
