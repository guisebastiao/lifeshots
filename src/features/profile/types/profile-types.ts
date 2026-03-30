import type { ProfilePictureResponse } from "@/features/profile-picture/types/profile-picture-types";
import type { updateProfileSchema } from "@/features/profile/schemas/update-profile-schema";
import { z } from "zod";

export interface ProfileResponse {
  id: string;
  handle: string;
  fullName: string;
  bio: string | null;
  isPrivate: boolean;
  postsCount: number;
  followersCount: number;
  followingCount: number;
  isOwnProfile: boolean;
  isFollowing: boolean;
  isFollower: boolean;
  profilePicture: ProfilePictureResponse | null;
}

export type UpdateProfileRequest = z.infer<typeof updateProfileSchema>;
