import { Field, FieldLabel, FieldDescription } from "@/shared/components/ui/field";
import type { PrivacyRequest } from "@/features/account/types/privacy-types";
import { privacySchema } from "@/features/account/schemas/privacy-schema";
import { usePrivacy } from "@/features/account/hooks/use-privacy";
import { useMe } from "@/features/profile/hooks/use-me";
import { Switch } from "@/shared/components/ui/switch";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

export const UpdatePrivacy = () => {
  const { data, isLoading } = useMe();

  const { mutate, isPending } = usePrivacy();

  const form = useForm<PrivacyRequest>({
    resolver: zodResolver(privacySchema),
    values: {
      privacy: data?.isPrivate ?? false,
    },
  });

  const handleUpdatePrivacy = (data: PrivacyRequest) => {
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
    <form className="w-full space-y-5" onSubmit={form.handleSubmit(handleUpdatePrivacy)}>
      <Controller
        name="privacy"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Conta Privada</FieldLabel>
            <FieldDescription>Defina a privicidade da sua conta, entre privada e pública.</FieldDescription>
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
