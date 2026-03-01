import type { ProfileResponse } from "@/types/profile-types";
import { profileService } from "@/services/profile-service";
import type { ErrorResponse } from "@/types/api-types";
import { useQuery } from "@tanstack/react-query";

export const useProfile = () => {
  const findMeProfile = useQuery<ProfileResponse, ErrorResponse>({
    queryKey: ["find-me-profile"],
    queryFn: profileService.findMeProfile,
  });

  return {
    findMeProfile,
  };
};
