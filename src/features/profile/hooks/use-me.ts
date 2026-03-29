import type { ProfileResponse } from "@/features/profile/types/profile-types";
import type { ErrorPayload } from "@/shared/types/api-types";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/features/profile/api";

export const useMe = () => {
  return useQuery<ProfileResponse, ErrorPayload>({
    queryKey: ["me"],
    queryFn: getMe,
  });
};
