import { useFormAutoClearErrors } from "@/hooks/use-form-auto-clear-errors";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { ApiException } from "@/lib/http/errors/api-exception";
import { useLocation, useNavigate } from "react-router-dom";
import type { RegisterRequest } from "@/types/auth-types";
import { registerSchema } from "@/schemas/auth-schemas";
import { Lock, Mail, User, AtSign } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";

export const Register = () => {
  const { useRegister } = useAuth();
  const { mutate, isPending } = useRegister();

  const navigate = useNavigate();
  const location = useLocation();

  const { email, name } = (location.state as { email?: string; name?: string }) || {};

  const form = useForm<RegisterRequest>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: name ?? "",
      handle: "",
      email: email ?? "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: RegisterRequest) => {
    mutate(
      { data },
      {
        onSuccess: () => {
          toast.success("Registro bem-sucedido! Faça login para continuar.");
          navigate("/login", {
            state: { email: data.email },
          });
        },
        onError: (error) => {
          if (error instanceof ApiException) {
            if (error.code === "VALIDATION_ERROR" && error.details) {
              error.details.forEach((detail) => {
                form.setError(detail.field as keyof RegisterRequest, { type: "server", message: detail.error });
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

  return (
    <section className="max-w-lg w-full mx-auto self-center">
      <h1 className="text-2xl font-semibold tracking-tight text-center mb-1">Criar conta</h1>
      <p className="leading-7 text-foreground/75 text-center mb-3 text-[15px]">
        Insira seus dados abaixo para criar sua conta.
      </p>
      <form id="login-form" onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-3">
        <Controller
          name="fullName"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="fullName">Nome completo</FieldLabel>
              <Input
                {...field}
                id="fullName"
                type="text"
                icon={User}
                disabled={isPending}
                placeholder="João Silva"
                aria-invalid={fieldState.invalid}
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="handle"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="handle">Nome de usuário</FieldLabel>
              <Input
                {...field}
                id="handle"
                type="text"
                icon={AtSign}
                disabled={isPending}
                placeholder="joao-silva"
                aria-invalid={fieldState.invalid}
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
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
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="password">Senha</FieldLabel>
              <Input
                {...field}
                id="password"
                type="password"
                icon={Lock}
                disabled={isPending}
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
              <FieldLabel htmlFor="confirmPassword">Confirmar senha</FieldLabel>
              <Input
                {...field}
                id="confirmPassword"
                type="password"
                icon={Lock}
                disabled={isPending}
                placeholder="••••••••"
                aria-invalid={fieldState.invalid}
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Button type="submit" form="login-form" className="w-full mt-3" disabled={isPending}>
          {isPending && <Spinner className="text-white" />}
          <span>Criar conta</span>
        </Button>
        <div className="flex justify-center items-center ">
          <span className="text-sm font-medium text-foreground/80">Você já possui uma conta?</span>
          <Button
            type="button"
            variant="link"
            className="text-foreground/80 underline px-1"
            disabled={isPending}
            onClick={() => navigate("/login")}
          >
            <span>Entrar</span>
          </Button>
        </div>
      </form>
    </section>
  );
};
