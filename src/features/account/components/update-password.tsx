import { InputGroup, InputGroupAddon, InputGroupInput } from "@/shared/components/ui/input-group";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/shared/components/ui/field";
import type { UpdatePasswordRequest } from "@/features/account/types/update-password-types";
import { updatePasswordSchema } from "@/features/account/schemas/update-password-schema";
import { useUpdatePassword } from "@/features/account/hooks/use-update-password";
import { Spinner } from "@/shared/components/ui/spinner";
import { Button } from "@/shared/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const UpdatePassword = () => {
  const { mutate, isPending } = useUpdatePassword();

  const [showPasswords, setShowPasswords] = useState({
    newPassword: false,
    confirmPassword: false,
    currentPassword: false,
  });

  const form = useForm<UpdatePasswordRequest>({
    resolver: zodResolver(updatePasswordSchema),
    mode: "onChange",
    values: {
      newPassword: "",
      confirmPassword: "",
      currentPassword: "",
    },
  });

  const { currentPassword, confirmPassword, newPassword } = form.watch();
  const isSubmitDisabled = !currentPassword || !confirmPassword || !newPassword;

  const handleUpdatePassword = (data: UpdatePasswordRequest) => {
    mutate(
      { data },
      {
        onSuccess: () => {
          form.reset();
          toast.success("Sua senha foi atualizada com sucesso.");
        },
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
    <form className="w-full space-y-3" onSubmit={form.handleSubmit(handleUpdatePassword)}>
      <Controller
        name="newPassword"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Nova Senha</FieldLabel>
            <InputGroup>
              <InputGroupInput
                {...field}
                type={showPasswords.newPassword ? "text" : "password"}
                disabled={isPending}
                placeholder="Informe sua nova senha."
                aria-invalid={fieldState.invalid}
              />
              <InputGroupAddon>
                <Lock />
              </InputGroupAddon>
              <InputGroupAddon align="inline-end">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => setShowPasswords((prev) => ({ ...prev, newPassword: !prev.newPassword }))}
                >
                  {showPasswords.newPassword ? <EyeOff /> : <Eye />}
                </Button>
              </InputGroupAddon>
            </InputGroup>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="confirmPassword"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Confirmar Senha</FieldLabel>
            <InputGroup>
              <InputGroupInput
                {...field}
                type={showPasswords.confirmPassword ? "text" : "password"}
                disabled={isPending}
                placeholder="Confirme sua nova senha."
                aria-invalid={fieldState.invalid}
              />
              <InputGroupAddon>
                <Lock />
              </InputGroupAddon>
              <InputGroupAddon align="inline-end">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => setShowPasswords((prev) => ({ ...prev, confirmPassword: !prev.confirmPassword }))}
                >
                  {showPasswords.confirmPassword ? <EyeOff /> : <Eye />}
                </Button>
              </InputGroupAddon>
            </InputGroup>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="currentPassword"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Senha Atual</FieldLabel>
            <FieldDescription>Para confirmar sua nova senha, informe abaixo a sua senha atual.</FieldDescription>
            <InputGroup>
              <InputGroupInput
                {...field}
                type={showPasswords.currentPassword ? "text" : "password"}
                disabled={isPending}
                placeholder="Informe sua senha atual."
                aria-invalid={fieldState.invalid}
              />
              <InputGroupAddon>
                <Lock />
              </InputGroupAddon>
              <InputGroupAddon align="inline-end">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => setShowPasswords((prev) => ({ ...prev, currentPassword: !prev.currentPassword }))}
                >
                  {showPasswords.currentPassword ? <EyeOff /> : <Eye />}
                </Button>
              </InputGroupAddon>
            </InputGroup>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Button type="submit" variant="secondary" className="w-full" disabled={isPending || isSubmitDisabled}>
        {isPending && <Spinner className="text-white" />}
        Salvar
      </Button>
    </form>
  );
};
