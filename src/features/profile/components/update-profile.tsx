import { updateProfileSchema } from "@/features/profile/schemas/update-profile-schema";
import type { UpdateProfileRequest } from "@/features/profile/types/profile-types";
import { useUpdateProfile } from "@/features/profile/hooks/use-update-profile";
import { Field, FieldError, FieldLabel } from "@/shared/components/ui/field";
import { Spinner } from "@/shared/components/ui/spinner";
import { useMe } from "@/features/profile/hooks/use-me";
import { Button } from "@/shared/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { twMerge } from "tailwind-merge";
import { User } from "lucide-react";
import { toast } from "sonner";
import {
  InputGroup,
  InputGroupTextarea,
  InputGroupAddon,
  InputGroupText,
  InputGroupInput,
} from "@/shared/components/ui/input-group";

export const UpdateProfile = () => {
  const { data, isLoading, isError, error } = useMe();

  const { mutate, isPending } = useUpdateProfile();

  const form = useForm<UpdateProfileRequest>({
    resolver: zodResolver(updateProfileSchema),
    values: {
      fullName: data?.fullName ?? "",
      bio: data?.bio ?? "",
    },
  });

  if (isError) {
    toast.error(error.message);
  }

  const handleUpdateProfile = (data: UpdateProfileRequest) => {
    mutate(
      {
        data,
      },
      {
        onError: ({ code, message, details }) => {
          if (code === "VALIDATION_ERROR") {
            details.forEach((err) => {
              form.setError(err.field, {
                message: err.error,
              });
            });

            return;
          }

          toast.error(message);
        },
      },
    );
  };

  return (
    <form onSubmit={form.handleSubmit(handleUpdateProfile)} className="w-full space-y-3">
      <Controller
        name="fullName"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Nome Completo</FieldLabel>
            <InputGroup>
              <InputGroupInput
                {...field}
                type="text"
                disabled={isPending}
                placeholder="Informe seu nome completo"
                aria-invalid={fieldState.invalid}
              />
              <InputGroupAddon>
                <User />
              </InputGroupAddon>
            </InputGroup>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="bio"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Bio</FieldLabel>
            <InputGroup>
              <InputGroupTextarea
                {...field}
                disabled={isPending || isLoading}
                placeholder="Escreva sua bio..."
                className="min-h-9 no-scrollbar"
                aria-invalid={fieldState.invalid}
              />
              <InputGroupAddon align="block-end">
                <InputGroupText className={twMerge(field.value.length > 300 && "text-destructive")}>
                  {field.value.length}/300
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Button type="submit" variant="secondary" className="w-full" disabled={isPending || !form.formState.isDirty}>
        {isPending && <Spinner className="text-white" />}
        <span>Salvar</span>
      </Button>
    </form>
  );
};
