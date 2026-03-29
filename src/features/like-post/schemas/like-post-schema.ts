import { z } from "zod";

export const likePostSchema = z.object({
  like: z.boolean(),
});
