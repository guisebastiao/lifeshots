import type { PostPictureResponse } from "@/features/post-picture/types/post-picture-types";
import type { ProfileResponse } from "@/features/profile/types/profile-types";

export interface PostResponse {
  id: string;
  content: string;
  likeCount: number;
  commentCount: number;
  shareCount: number;
  isOwner: boolean;
  isLiked: boolean;
  createdAt: Date;
  profile: ProfileResponse;
  postPictures: PostPictureResponse[];
}
