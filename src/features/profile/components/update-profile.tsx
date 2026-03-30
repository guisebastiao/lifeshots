import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { updateProfileSchema } from "@/features/profile/schemas/update-profile-schema";
import type { UpdateProfileRequest } from "@/features/profile/types/profile-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useMe } from "@/features/profile/hooks/use-me";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { useUpdateProfile } from "../hooks/use-update-profile";
import { InputGroup, InputGroupTextarea, InputGroupAddon, InputGroupText } from "@/components/ui/input-group";
import { twMerge } from "tailwind-merge";
import { Button } from "@/components/ui/button";

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
    <form id="update-profile-form" onSubmit={form.handleSubmit(handleUpdateProfile)} className="w-full space-y-3">
      <Controller
        name="fullName"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-={fieldState.invalid}>
            <FieldLabel htmlFor="fullName">Nome Completo</FieldLabel>
            <Input
              {...field}
              id="fullName"
              type="text"
              icon={User}
              disabled={isPending || isLoading}
              placeholder="Seu nome completo"
              aria-invalid={fieldState.invalid}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="bio"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-={fieldState.invalid}>
            <FieldLabel htmlFor="bio">Bio</FieldLabel>
            <InputGroup>
              <InputGroupTextarea
                {...field}
                id="content"
                disabled={isPending || isLoading}
                placeholder="Escreva sua bio..."
                className="max-h-29 no-scrollbar"
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
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending && <Spinner className="text-white" />}
        <span>Salvar</span>
      </Button>
    </form>
  );
};
