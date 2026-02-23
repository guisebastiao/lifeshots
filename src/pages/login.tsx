import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import type { LoginRequest } from "@/types/auth-types";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemas/auth-schemas";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const Login = () => {
  const form = useForm<LoginRequest>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = () => {};

  return (
    <section className="max-w-lg w-full mx-auto self-center">
      <h1 className="text-2xl font-semibold tracking-tight text-center mb-1">Entrar</h1>
      <p className="leading-7 text-foreground/75 text-center mb-3">Insira suas credenciais para acessar sua conta</p>
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
                placeholder="você@exemplo.com"
                icon={Mail}
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
                aria-invalid={fieldState.invalid}
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Button type="button" variant="link" className="text-foreground">
          Esqueceu sua senha?
        </Button>
        <Button type="submit" form="login-form" className="w-full">
          Entrar
        </Button>
        <div className="flex justify-center items-center">
          <span className="text-sm font-medium text-foreground/80">Não tem uma conta?</span>
          <Button type="button" variant="link" className="text-foreground/80 underline px-1">
            Inscreva-se
          </Button>
        </div>
        <div className="flex justify-center items-center overflow-hidden">
          <Separator />
          <span className="shrink-0 text-xs uppercase text-muted-foreground px-2">Ou continue com</span>
          <Separator />
        </div>
        <Button type="button" variant="secondary" className="w-full">
          Continuar com Google
        </Button>
      </form>
    </section>
  );
};
