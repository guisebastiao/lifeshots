import type { createReplyCommentSchema } from "@/features/reply-comment/schema/create-reply-comment-schema";
import type { updateReplyCommentSchema } from "@/features/reply-comment/schema/update-reply-comment-schema";
import type { ProfileResponse } from "@/features/profile/types/profile-types";
import { z } from "zod";

export interface ReplyCommentResponse {
  id: string;
  content: string;
  likeCount: number;
  isOwner: boolean;
  isLiked: boolean;
  createdAt: Date;
  profile: ProfileResponse;
}

export type CreateReplyCommentRequest = z.infer<typeof createReplyCommentSchema>;
export type UpdateReplyCommentRequest = z.infer<typeof updateReplyCommentSchema>;
