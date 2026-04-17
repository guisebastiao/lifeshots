import { useFindNotificationSetting } from "@/features/notification-setting/hooks/use-find-notification-setting";
import type { NotifyAllRequest } from "@/features/notification-setting/types/notification-setting-types";
import { notifyAllSchema } from "@/features/notification-setting/schemas/notification-setting-schema";
import { useNotifyAll } from "@/features/notification-setting/hooks/use-notify-all";
import { Field, FieldLabel, FieldDescription } from "@/shared/components/ui/field";
import { Switch } from "@/shared/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

export const NotifyAll = () => {
  const { data, isLoading } = useFindNotificationSetting();
  const { mutate, isPending } = useNotifyAll();

  const form = useForm<NotifyAllRequest>({
    resolver: zodResolver(notifyAllSchema),
    values: {
      notifyAllNotifications: data?.notifyAllNotifications ?? true,
    },
  });

  const handleNotifyAll = (data: NotifyAllRequest) => {
    mutate(
      { data: { notifyAllNotifications: !data.notifyAllNotifications } },
      {
        onError: ({ message }) => {
          toast.error(message);
        },
      },
    );
  };

  return (
    <Controller
      name="notifyAllNotifications"
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel>Notificar Tudo</FieldLabel>
          <FieldDescription>Notificar todas as notificações ou desativar todas as notificaçõoes.</FieldDescription>
          <Switch
            onClick={form.handleSubmit(handleNotifyAll)}
            checked={field.value}
            onCheckedChange={field.onChange}
            disabled={isLoading || isPending}
          />
        </Field>
      )}
    />
  );
};
