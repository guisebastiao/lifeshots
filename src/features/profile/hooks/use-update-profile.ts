import type { ProfileResponse, UpdateProfileRequest } from "@/features/profile/types/profile-types";
import type { ErrorPayload } from "@/shared/types/api-types";
import { queryClient } from "@/app/providers/query-client";
import { updateProfile } from "@/features/profile/api";
import { useMutation } from "@tanstack/react-query";

type UpdateProfileContext = {
  previousProfile?: ProfileResponse;
};

export const useUpdateProfile = () => {
  return useMutation<
    ProfileResponse,
    ErrorPayload<UpdateProfileRequest>,
    { data: UpdateProfileRequest },
    UpdateProfileContext
  >({
    mutationFn: updateProfile,
    onSuccess: ({ fullName, bio }) => {
      const previousProfile = queryClient.getQueryData<ProfileResponse>(["me"]);

      queryClient.setQueriesData<ProfileResponse>({ queryKey: ["me"] }, (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          fullName,
          bio,
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
