import { notificationService } from "@/services/notification-service";
import type { UnreadResponse } from "@/types/notification-types";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { ErrorResponse } from "@/types/api-types";

export const useNotification = () => {
  const countUnread = useQuery<UnreadResponse, ErrorResponse>({
    queryKey: ["unread-notifications"],
    queryFn: notificationService.countUnread,
  });

  const markAllAsRead = useMutation<void, ErrorResponse, void>({
    mutationFn: notificationService.markAllAsRead,
  });

  return {
    countUnread,
    markAllAsRead,
  };
};
