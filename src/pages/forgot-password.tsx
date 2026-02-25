import { useFormAutoClearErrors } from "@/hooks/use-form-auto-clear-errors";
import type { ForgotPasswordRequest } from "@/types/recover-password-types";
import { forgotPasswordSchema } from "@/schemas/recover-password-schemas";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { useRecoverPassword } from "@/hooks/use-recover-password";
import { ApiException } from "@/lib/http/errors/api-exception";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { toast } from "sonner";

export const ForgotPassword = () => {
  const { useForgotPassword } = useRecoverPassword();
  const { mutate, isPending, isSuccess } = useForgotPassword();

  const navigate = useNavigate();

  const form = useForm<ForgotPasswordRequest>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: ForgotPasswordRequest) => {
    mutate(
      { data },
      {
        onSuccess: () => {
          form.reset();
        },
        onError: (error) => {
          if (error instanceof ApiException) {
            if (error.code === "VALIDATION_ERROR" && error.details) {
              error.details.forEach((detail) => {
                form.setError(detail.field as keyof ForgotPasswordRequest, { type: "server", message: detail.error });
              });

              return;
            }
          }

          toast.error(error.message);
        },
      },
    );
  };

  useFormAutoClearErrors({ submitCount: form.formState.submitCount, clearErrors: form.clearErrors });

  if (isSuccess) {
    return (
      <section className="max-w-lg w-full mx-auto self-center">
        <h1 className="text-2xl font-semibold tracking-tight text-center mb-1">Verifique seu e-mail</h1>
        <p className="leading-7 text-foreground/75 text-center mb-3 text-[15px]">
          Se o endereço informado estiver associado a uma conta, enviaremos um link para redefinição de senha.
        </p>
        <Button type="button" className="w-full" onClick={() => navigate("/login")}>
          <span>Voltar para login</span>
        </Button>
      </section>
    );
  }

  return (
    <section className="max-w-lg w-full mx-auto self-center">
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
                disabled={isPending}
                placeholder="você@exemplo.com"
                aria-invalid={fieldState.invalid}
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Button type="submit" form="login-form" className="w-full" disabled={isPending}>
          {isPending && <Spinner className="text-white" />}
          <span>Enviar</span>
        </Button>
        <Button variant="secondary" type="button" className="w-full" disabled={isPending} onClick={() => navigate(-1)}>
          <span>Voltar</span>
        </Button>
      </form>
    </section>
  );
};
