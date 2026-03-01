import type { RecoverPasswordRequest } from "@/types/recover-password-types";
import { useFormAutoClearErrors } from "@/hooks/use-form-auto-clear-errors";
import { recoverPasswordSchema } from "@/schemas/recover-password-schemas";
import { useRecoverPassword } from "@/hooks/domain/use-recover-password";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock } from "lucide-react";
import { toast } from "sonner";

export const RecoverPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const { recoverPassword } = useRecoverPassword();

  const navigate = useNavigate();

  const form = useForm<RecoverPasswordRequest>({
    resolver: zodResolver(recoverPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: RecoverPasswordRequest) => {
    if (!token) {
      toast.error("Token de recuperação de senha ausente. Por favor, verifique o link enviado para seu e-mail.");
      navigate("/forgot-password", { replace: true });
      return;
    }

    recoverPassword.mutate(
      { data, token },
      {
        onSuccess: () => {
          toast.success("Senha redefinida com sucesso! Agora você pode fazer login com sua nova senha.");
          navigate("/login", { replace: true });
        },
        onError: (err) => {
          if (!err) return;

          if (err.error.code === "VALIDATION_ERROR") {
            err.error.details.forEach((err) => {
              form.setError(err.field, {
                type: "server",
                message: err.error,
              });
            });
          }
        },
      },
    );
  };

  useFormAutoClearErrors({ submitCount: form.formState.submitCount, clearErrors: form.clearErrors });

  return (
    <section className="max-w-lg w-full mx-auto my-auto px-3">
      <h1 className="text-2xl font-semibold tracking-tight text-center mb-1">Redefinir Senha</h1>
      <p className="leading-7 text-foreground/75 text-center mb-3 text-[15px]">
        Insira sua nova senha abaixo para redefinir sua senha. Certifique-se de que sua nova senha seja forte e segura
      </p>
      <form id="login-form" onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-3">
        <Controller
          name="newPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="newPassword">Nova senha</FieldLabel>
              <Input
                {...field}
                id="newPassword"
                type="password"
                icon={Lock}
                disabled={recoverPassword.isPending}
                placeholder="••••••••"
                aria-invalid={fieldState.invalid}
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="confirmPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="confirmPassword">Confirmar nova senha</FieldLabel>
              <Input
                {...field}
                id="confirmPassword"
                type="password"
                icon={Lock}
                disabled={recoverPassword.isPending}
                placeholder="••••••••"
                aria-invalid={fieldState.invalid}
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Button type="submit" form="login-form" className="w-full" disabled={recoverPassword.isPending}>
          {recoverPassword.isPending && <Spinner className="text-white" />}
          <span>Redefinir senha</span>
        </Button>
      </form>
    </section>
  );
};
