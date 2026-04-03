import type { ProfileResponse } from "@/features/profile/types/profile-types";
import type { ErrorPayload, SuccessResponse } from "@/shared/types/api-types";
import { deleteProfilePicture } from "@/features/profile-picture/api";
import { queryClient } from "@/app/providers/query-client";
import { useMutation } from "@tanstack/react-query";

type DeleteProfilePictureContext = {
  previousProfile?: ProfileResponse;
};

export const useDeleteProfilePicture = () => {
  return useMutation<SuccessResponse, ErrorPayload, undefined, DeleteProfilePictureContext>({
    mutationFn: deleteProfilePicture,
    onSuccess: () => {
      const previousProfile = queryClient.getQueryData<ProfileResponse>(["me"]);

      queryClient.setQueriesData<ProfileResponse>({ queryKey: ["me"] }, (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          profilePicture: null,
        };
      });

      return { previousProfile };
    },
    onError: (_error, _variables, context) => {
      if (!context) return;
      queryClient.setQueryData(["me"], context.previousProfile);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
};
