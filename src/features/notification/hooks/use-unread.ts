import { getUnread } from "@/features/notification/api";
import { useQuery } from "@tanstack/react-query";

export const useUnread = () => {
  return useQuery({
    queryKey: ["unread"],
    queryFn: getUnread,
  });
};
