import { type SuccessResponse, type ErrorPayload } from "@/shared/types/api-types";
import type { ProfileResponse } from "@/features/profile/types/profile-types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { searchProfile } from "@/features/profile/api";

export const useSearchProfile = ({ search }: { search: string }) => {
  return useInfiniteQuery<SuccessResponse<ProfileResponse[]>, ErrorPayload>({
    queryKey: ["search-profile", search],
    queryFn: ({ pageParam = 1 }) => searchProfile({ search, offset: pageParam as number }),
    getNextPageParam: ({ meta }) => {
      const nextPage = meta.currentPage + 1;
      const hasMore = nextPage < meta.totalPages;
      return hasMore ? nextPage : undefined;
    },
    initialPageParam: 1,
    enabled: !!search,
  });
};
