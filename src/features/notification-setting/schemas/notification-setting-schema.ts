import { z } from "zod";

export const notificationSettingSchema = z.object({
  notifyLikePost: z.boolean(),
  notifyLikeComment: z.boolean(),
  notifyLikeReplyComment: z.boolean(),
  notifyLikeStory: z.boolean(),
  notifyNewFollower: z.boolean(),
  notifyCommentPost: z.boolean(),
  notifyReplyComment: z.boolean(),
});

export const notifyAllSchema = z.object({
  notifyAllNotifications: z.boolean(),
});
