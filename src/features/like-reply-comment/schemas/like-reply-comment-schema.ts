import { z } from "zod";

export const likeReplyCommentSchema = z.object({
  like: z.boolean(),
});
