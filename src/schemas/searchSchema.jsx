import { z } from "zod";

export const searchSchema = z.object({
  search: z.string().min(3),
});
