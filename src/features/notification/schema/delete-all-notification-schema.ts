import { z } from "zod";

export const deleteNotificationsSchema = z.object({
  ids: z.array(z.string()),
});
