import type { followSchema } from "@/features/follow/schemas/follow-schema";
import { z } from "zod";

export const followTypes = {
  FOLLOWERS: "FOLLOWERS",
  FOLLOWING: "FOLLOWING",
} as const;

export type FollowType = (typeof followTypes)[keyof typeof followTypes];

export type FollowRequest = z.infer<typeof followSchema>;
