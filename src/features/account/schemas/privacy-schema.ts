import { z } from "zod";

export const privacySchema = z.object({
  privacy: z.boolean(),
});
