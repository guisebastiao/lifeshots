import type { likeReplyCommentSchema } from "@/features/like-reply-comment/schemas/like-reply-comment-schema";
import { z } from "zod";

export type LikeReplyCommentRequest = z.infer<typeof likeReplyCommentSchema>;
