import type { ProfilePictureResponse } from "@/features/profile-picture/types/profile-picture-types";

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
