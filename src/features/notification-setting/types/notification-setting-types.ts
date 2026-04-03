import { z } from "zod";
import type {
  notificationSettingSchema,
  notifyAllSchema,
} from "@/features/notification-setting/schemas/notification-setting-schema";

export interface NotificationSettingResponse {
  notifyAllNotifications: boolean;
  notifyLikePost: boolean;
  notifyLikeComment: boolean;
  notifyLikeReplyComment: boolean;
  notifyLikeStory: boolean;
  notifyNewFollower: boolean;
  notifyCommentPost: boolean;
  notifyReplyComment: boolean;
}

export type NotificationSettingRequest = z.infer<typeof notificationSettingSchema>;
export type NotifyAllRequest = z.infer<typeof notifyAllSchema>;
