import { useUpdateNotificationSetting } from "@/features/notification-setting/hooks/use-update-notification-setting";
import type { NotificationSettingRequest } from "@/features/notification-setting/types/notification-setting-types";
import { useFindNotificationSetting } from "@/features/notification-setting/hooks/use-find-notification-setting";
import { notificationSettingSchema } from "@/features/notification-setting/schemas/notification-setting-schema";
import { Field, FieldLabel, FieldDescription } from "@/shared/components/ui/field";
import { NotifyAll } from "@/features/notification-setting/components/notify-all";
import { Switch } from "@/shared/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

export const NotificationSetting = () => {
  const { data, isLoading } = useFindNotificationSetting();
  const { mutate, isPending } = useUpdateNotificationSetting();

  const form = useForm<NotificationSettingRequest>({
    resolver: zodResolver(notificationSettingSchema),
    values: {
      notifyCommentPost: data?.notifyCommentPost ?? true,
      notifyLikeComment: data?.notifyLikeComment ?? true,
      notifyLikePost: data?.notifyLikePost ?? true,
      notifyLikeReplyComment: data?.notifyLikeReplyComment ?? true,
      notifyLikeStory: data?.notifyLikeStory ?? true,
      notifyReplyComment: data?.notifyReplyComment ?? true,
      notifyNewFollower: data?.notifyNewFollower ?? true,
    },
  });

  const handleUpdateNotification = (data: NotificationSettingRequest) => {
    mutate(
      { data },
      {
        onError: ({ message }) => {
          toast.error(message);
        },
      },
    );
  };

  return (
    <form className="w-full space-y-5 mt-2" onSubmit={form.handleSubmit(handleUpdateNotification)}>
      <NotifyAll />
      <Controller
        name="notifyLikePost"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-={fieldState.invalid}>
            <FieldLabel>Gostei em Publicações</FieldLabel>
            <FieldDescription>Notificar quando alguém curtir suas publicações.</FieldDescription>
            <Switch
              type="submit"
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={isLoading || isPending}
            />
          </Field>
        )}
      />
      <Controller
        name="notifyLikeComment"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-={fieldState.invalid}>
            <FieldLabel>Gostei em Comentários</FieldLabel>
            <FieldDescription>Notificar quando alguém curtir seus comentários.</FieldDescription>
            <Switch
              type="submit"
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={isLoading || isPending}
            />
          </Field>
        )}
      />
      <Controller
        name="notifyLikeStory"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-={fieldState.invalid}>
            <FieldLabel>Gostei em Stories</FieldLabel>
            <FieldDescription>Notificar quando alguém curtir seus stories.</FieldDescription>
            <Switch
              type="submit"
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={isLoading || isPending}
            />
          </Field>
        )}
      />
      <Controller
        name="notifyLikeReplyComment"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-={fieldState.invalid}>
            <FieldLabel>Gostei em Respostas de Comentários</FieldLabel>
            <FieldDescription>Notificar quando alguém curtir sua resposta em um comentário.</FieldDescription>
            <Switch
              type="submit"
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={isLoading || isPending}
            />
          </Field>
        )}
      />
      <Controller
        name="notifyCommentPost"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-={fieldState.invalid}>
            <FieldLabel>Notificar Comentários</FieldLabel>
            <FieldDescription>Notificar quando alguém comentar em suas publicações.</FieldDescription>
            <Switch
              type="submit"
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={isLoading || isPending}
            />
          </Field>
        )}
      />
      <Controller
        name="notifyReplyComment"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-={fieldState.invalid}>
            <FieldLabel>Notificar Respostas de Comentários</FieldLabel>
            <FieldDescription>Notificar quando alguém responder seus comentários.</FieldDescription>
            <Switch
              type="submit"
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={isLoading || isPending}
            />
          </Field>
        )}
      />
    </form>
  );
};
