import type { deleteNotificationsSchema } from "@/features/notification/schema/delete-all-notification-schema";
import type { ProfileResponse } from "@/features/profile/types/profile-types";
import { z } from "zod";

export const types = {
  LIKE_POST: "LIKE_POST",
  LIKE_COMMENT: "LIKE_COMMENT",
  LIKE_REPLY_COMMENT: "LIKE_REPLY_COMMENT",
  LIKE_STORY: "LIKE_STORY",
  NEW_FOLLOWER: "NEW_FOLLOWER",
  COMMENT_POST: "COMMENT_POST",
  REPLY_COMMENT: "REPLY_COMMENT",
} as const;

export type NotificationType = keyof typeof types;

export interface NotificationResponse {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  createdAt: Date;
  sender: ProfileResponse;
}

export type DeleteNotificationsRequest = z.infer<typeof deleteNotificationsSchema>;
