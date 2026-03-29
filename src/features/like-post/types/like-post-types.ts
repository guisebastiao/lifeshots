import type { likePostSchema } from "@/features/like-post/schemas/like-post-schema";
import { z } from "zod";

export type LikePostRequest = z.infer<typeof likePostSchema>;
