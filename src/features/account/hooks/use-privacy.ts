import type { ErrorPayload, SuccessResponse } from "@/shared/types/api-types";
import type { ProfileResponse } from "@/features/profile/types/profile-types";
import type { PrivacyRequest } from "@/features/account/types/privacy-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { privacy } from "@/features/account/api";

type PrivacyContext = {
  previousMe?: ProfileResponse;
};

export const usePrivacy = () => {
  const queryClient = useQueryClient();

  return useMutation<SuccessResponse, ErrorPayload, { data: PrivacyRequest }, PrivacyContext>({
    mutationFn: privacy,
    onMutate: ({ data }) => {
      const previousMe = queryClient.getQueryData<ProfileResponse>(["me"]);

      queryClient.setQueriesData<ProfileResponse>({ queryKey: ["me"] }, (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          isPrivate: data.privacy,
        };
      });

      return { previousMe };
    },
    onError: (_error, _variables, context) => {
      if (!context) return;
      queryClient.setQueryData(["me"], context.previousMe);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
};
