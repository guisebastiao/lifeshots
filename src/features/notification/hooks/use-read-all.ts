import type { UnreadResponse } from "@/features/notification/types/unread-types";
import { queryClient } from "@/app/providers/query-client";
import { readAll } from "@/features/notification/api";
import { useMutation } from "@tanstack/react-query";
import type { ErrorPayload } from "@/shared/types/api-types";

type UnreadContext = {
  previousUnread?: UnreadResponse;
};

export const useReadAll = () => {
  return useMutation<UnreadResponse, ErrorPayload, void, UnreadContext>({
    mutationFn: readAll,
    onSuccess: () => {
      const previousUnread = queryClient.getQueryData<UnreadResponse>(["unread"]);

      queryClient.setQueriesData<UnreadResponse>({ queryKey: ["unread"] }, (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          unread: 0,
        };
      });

      return { previousUnread };
    },
    onError: (_error, _variables, context) => {
      if (!context) return;
      queryClient.setQueryData(["unread"], context.previousUnread);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["unread"] });
      queryClient.invalidateQueries({ queryKey: ["get-notifications"] });
    },
  });
};
