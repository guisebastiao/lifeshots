import type { ProfileResponse } from "@/features/profile/types/profile-types";
import type { ErrorPayload } from "@/shared/types/api-types";
import { getByHandle } from "@/features/profile/api";
import { useQuery } from "@tanstack/react-query";

export const useGetByHandle = ({ handle }: { handle: string }) => {
  return useQuery<ProfileResponse, ErrorPayload>({
    queryKey: ["get-by-handle", handle],
    queryFn: () => getByHandle({ handle }),
  });
};
