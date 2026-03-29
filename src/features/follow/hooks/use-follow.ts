import { useMutation, useQueryClient, type InfiniteData } from "@tanstack/react-query";
import type { ErrorPayload, SuccessResponse } from "@/shared/types/api-types";
import type { ProfileResponse } from "@/features/profile/types/profile-types";
import type { FollowRequest } from "@/features/follow/types/follow-types";
import type { PostResponse } from "@/features/post/types/post-types";
import { follow } from "@/features/follow/api";

type FollowContext = {
  previousPosts?: InfiniteData<SuccessResponse<PostResponse[]>>;
  previousProfiles?: SuccessResponse<ProfileResponse>;
};

export const useFollow = () => {
  const queryClient = useQueryClient();

  return useMutation<SuccessResponse, ErrorPayload, { profileId: string; data: FollowRequest }, FollowContext>({
    mutationFn: ({ profileId, data }) => follow({ profileId, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile-publications"] });
      queryClient.invalidateQueries({ queryKey: ["get-by-handle"] });
    },
  });
};
