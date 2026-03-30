import type { ProfileResponse } from "@/features/profile/types/profile-types";
import { uploadProfilePicture } from "@/features/profile-picture/api";
import type { ErrorPayload } from "@/shared/types/api-types";
import { queryClient } from "@/app/providers/query-client";
import { useMutation } from "@tanstack/react-query";
import type {
  ProfilePictureResponse,
  UploadProfilePictureRequest,
} from "@/features/profile-picture/types/profile-picture-types";

type UploadProfilePictureContext = {
  previousProfile?: ProfileResponse;
};

export const useUploadProfilePicture = () => {
  return useMutation<
    ProfilePictureResponse,
    ErrorPayload<UploadProfilePictureRequest>,
    { data: FormData },
    UploadProfilePictureContext
  >({
    mutationFn: uploadProfilePicture,
    onSuccess: (data) => {
      const previousProfile = queryClient.getQueryData<ProfileResponse>(["me"]);

      queryClient.setQueriesData<ProfileResponse>({ queryKey: ["me"] }, (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          profilePicture: data,
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
