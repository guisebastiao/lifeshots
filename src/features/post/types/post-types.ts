import type { PostPictureResponse } from "@/features/post-picture/types/post-picture-types";
import type { createPostSchema } from "@/features/post/schemas/create-post-schema";
import type { updatePostSchema } from "@/features/post/schemas/update-post-schema";
import type { ProfileResponse } from "@/features/profile/types/profile-types";
import { z } from "zod";

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

export type CreatePostRequest = z.infer<typeof createPostSchema>;
export type UpdatePostRequest = z.infer<typeof updatePostSchema>;
