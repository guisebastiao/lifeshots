import { useFormAutoClearErrors } from "@/hooks/use-form-auto-clear-errors";
import type { ForgotPasswordRequest } from "@/types/recover-password-types";
import { forgotPasswordSchema } from "@/schemas/recover-password-schemas";
import { useRecoverPassword } from "@/hooks/domain/use-recover-password";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";

export const ForgotPassword = () => {
  const { forgotPassword } = useRecoverPassword();

  const navigate = useNavigate();

  const form = useForm<ForgotPasswordRequest>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: ForgotPasswordRequest) => {
    forgotPassword.mutate(
      { data },
      {
        onSuccess: () => {
          form.reset();
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

  if (forgotPassword.isSuccess) {
    return (
      <section className="max-w-lg w-full mx-auto my-auto px-3">
        <h1 className="text-2xl font-semibold tracking-tight text-center mb-1">Verifique seu e-mail</h1>
        <p className="leading-7 text-foreground/75 text-center mb-3 text-[15px]">
          Se o endereço informado estiver associado a uma conta, enviaremos um link para redefinição de senha.
        </p>
        <Button type="button" className="w-full" onClick={() => navigate(-1)}>
          <span>Voltar</span>
        </Button>
      </section>
    );
  }

  return (
    <section className="max-w-lg w-full mx-auto my-auto">
      <h1 className="text-2xl font-semibold tracking-tight text-center mb-1">Recuperar senha</h1>
      <p className="leading-7 text-foreground/75 text-center mb-3 text-[15px]">
        Informe o e-mail cadastrado em sua conta e enviaremos um link para redefinir sua senha
      </p>
      <form id="login-form" onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-3">
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                {...field}
                id="email"
                type="text"
                icon={Mail}
                disabled={forgotPassword.isPending}
                placeholder="você@exemplo.com"
                aria-invalid={fieldState.invalid}
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Button type="submit" form="login-form" className="w-full" disabled={forgotPassword.isPending}>
          {forgotPassword.isPending && <Spinner className="text-white" />}
          <span>Enviar</span>
        </Button>
        <Button
          variant="secondary"
          type="button"
          className="w-full"
          disabled={forgotPassword.isPending}
          onClick={() => navigate(-1)}
        >
          <span>Voltar</span>
        </Button>
      </form>
    </section>
  );
};
