import type { PushSubscriptionRequest } from "@/types/push-subscribe-types";
import type { SuccessResponse } from "@/types/api-types";
import { api } from "@/lib/http/api";

export const pushSubscribeService = {
  async pushSubscribe({ data }: { data: PushSubscriptionRequest }) {
    await api.post<SuccessResponse<void>>("/push/subscribe", data);
  },
};
