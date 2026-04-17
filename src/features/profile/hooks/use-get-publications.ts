import type { PostResponse } from "@/features/post/types/post-types";
import { type ErrorPayload, type SuccessResponse } from "@/shared/types/api-types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getPublications } from "@/features/profile/api";

export const useGetPublications = ({ profileId }: { profileId: string }) => {
  return useInfiniteQuery<SuccessResponse<PostResponse[]>, ErrorPayload>({
    queryKey: ["profile-publications", profileId],
    queryFn: ({ pageParam = 1 }) => getPublications({ profileId, offset: pageParam as number }),
    getNextPageParam: ({ meta }) => {
      const nextPage = meta.currentPage + 1;
      const hasMore = nextPage < meta.totalPages;
      return hasMore ? nextPage : undefined;
    },
    initialPageParam: 1,
  });
};
