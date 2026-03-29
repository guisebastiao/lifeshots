import { type ErrorPayload, type SuccessResponse } from "@/shared/types/api-types";
import type { ProfileResponse } from "@/features/profile/types/profile-types";
import type { FollowType } from "@/features/follow/types/follow-types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getFollows } from "@/features/follow/api";

export const useGetFollows = ({ type, profileId }: { type: FollowType; profileId: string }) => {
  return useInfiniteQuery<SuccessResponse<ProfileResponse[]>, ErrorPayload>({
    queryKey: ["profile-follows", type, profileId],
    queryFn: ({ pageParam = 1 }) => getFollows({ type, profileId, offset: pageParam as number }),
    getNextPageParam: ({ meta }) => {
      const nextPage = meta.currentPage + 1;
      const hasMore = nextPage < meta.totalPages;
      return hasMore ? nextPage : undefined;
    },
    initialPageParam: 1,
  });
};
