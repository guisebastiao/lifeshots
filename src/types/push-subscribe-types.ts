import type { pushSubscriptionSchema } from "@/schemas/push-subscribe-schemas";
import { z } from "zod";

export type PushSubscriptionRequest = z.infer<typeof pushSubscriptionSchema>;
