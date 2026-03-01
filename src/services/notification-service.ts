import type { UnreadResponse } from "@/types/notification-types";
import type { SuccessResponse } from "@/types/api-types";
import { api } from "@/lib/http/api";

export const notificationService = {
  async countUnread() {
    const response = await api.get<SuccessResponse<UnreadResponse>>("/notifications/unread-count");
    return response.data.data;
  },

  async markAllAsRead() {
    await api.put("/notifications/read-all");
  },
};
