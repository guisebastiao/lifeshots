import type { ProfilePictureResponse } from "@/types/profile-picture-types";

export interface ProfileResponse {
  id: string;
  handle: string;
  fullName: string;
  bio?: string;
  isPrivate: boolean;
  postsCount: number;
  followersCount: number;
  followingCount: number;
  isOwnProfile: boolean;
  isFollowing: boolean;
  isFollower: boolean;
  profilePicture?: ProfilePictureResponse;
}
