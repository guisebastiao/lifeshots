import { z } from "zod";

export const likeCommentSchema = z.object({
  like: z.boolean(),
});
