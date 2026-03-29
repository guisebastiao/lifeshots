import type { NotificationResponse } from "@/features/notification/types/notification-types";
import type { ErrorPayload, SuccessResponse } from "@/shared/types/api-types";
import { getNotifications } from "@/features/notification/api";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useGetNotifications = ({ filter }: { filter?: string }) => {
  return useInfiniteQuery<SuccessResponse<NotificationResponse[]>, ErrorPayload>({
    queryFn: ({ pageParam = 1 }) => getNotifications({ filter, offset: pageParam as number }),
    queryKey: ["get-notifications", filter],
    initialPageParam: 1,
    getNextPageParam: ({ meta }) => {
      const nextPage = meta.currentPage + 1;
      const hasMore = nextPage < meta.totalPages;
      return hasMore ? nextPage : undefined;
    },
  });
};
