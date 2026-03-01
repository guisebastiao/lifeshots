import type { FieldValidationError, ErrorResponse } from "@/types/api-types";
import type { PushSubscriptionRequest } from "@/types/push-subscribe-types";
import { pushSubscribeService } from "@/services/push-subscribe-service";
import { useMutation } from "@tanstack/react-query";

export const usePushSubscription = () => {
  const pushSubscription = useMutation<
    void,
    ErrorResponse<FieldValidationError<PushSubscriptionRequest>[]>,
    { data: PushSubscriptionRequest }
  >({
    mutationFn: pushSubscribeService.pushSubscribe,
  });

  return {
    pushSubscription,
  };
};
