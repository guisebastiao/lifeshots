import type { createCommentSchema } from "@/features/comment/schema/create-comment-schema";
import type { updateCommentSchema } from "@/features/comment/schema/update-comment-schema";
import type { ProfileResponse } from "@/features/profile/types/profile-types";
import { z } from "zod";

export interface CommentResponse {
  id: string;
  content: string;
  likeCount: number;
  replyCommentCount: number;
  isOwner: boolean;
  isLiked: boolean;
  createdAt: Date;
  profile: ProfileResponse;
}

export type CreateCommentRequest = z.infer<typeof createCommentSchema>;
export type UpdateCommentRequest = z.infer<typeof updateCommentSchema>;
