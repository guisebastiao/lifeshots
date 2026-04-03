import type { UnreadResponse } from "@/features/notification/types/unread-types";
import type { ErrorPayload } from "@/shared/types/api-types";
import { getUnread } from "@/features/notification/api";
import { useQuery } from "@tanstack/react-query";

export const useUnread = () => {
  return useQuery<UnreadResponse, ErrorPayload>({
    queryKey: ["unread"],
    queryFn: getUnread,
  });
};
