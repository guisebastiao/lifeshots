import type { likeCommentSchema } from "@/features/like-comment/schemas/like-comment-schema";
import { z } from "zod";

export type LikeCommentRequest = z.infer<typeof likeCommentSchema>;
