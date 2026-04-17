import { InputGroup, InputGroupAddon, InputGroupInput } from "@/shared/components/ui/input-group";
import { Field, FieldError, FieldLabel } from "@/shared/components/ui/field";
import type { RegisterRequest } from "@/features/auth/types/register-types";
import { registerSchema } from "@/features/auth/schemas/register-schema";
import { Lock, Mail, User, AtSign, EyeOff, Eye } from "lucide-react";
import { useRegister } from "@/features/auth/hooks/use-register";
import { useLocation, useNavigate } from "react-router-dom";
import { Spinner } from "@/shared/components/ui/spinner";
import { Button } from "@/shared/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";

export const Register = () => {
  const [showPasswords, setShowPasswords] = useState({
    password: false,
    confirmPassword: false,
  });

  const { mutate, isPending } = useRegister();

  const navigate = useNavigate();
  const location = useLocation();

  const { email, name } = (location.state as { email?: string; name?: string }) || {};

  const form = useForm<RegisterRequest>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
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
          toast.success("Seu registro foi feito com sucesso! Faça login para continuar.");
          navigate("/login", {
            state: { email: data.email },
          });
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
    <section className="max-w-2xl w-full mx-auto my-auto px-3 py-8">
      <h1 className="text-2xl font-semibold tracking-tight text-center mb-1">Criar conta</h1>
      <p className="leading-7 text-foreground/75 text-center mb-3 text-[15px]">
        Insira seus dados abaixo para criar sua conta.
      </p>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-3">
        <Controller
          name="fullName"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Nome completo</FieldLabel>
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
          name="handle"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Nome de usuário</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  {...field}
                  type="text"
                  disabled={isPending}
                  placeholder="Informe seu nome de usuário"
                  aria-invalid={fieldState.invalid}
                />
                <InputGroupAddon>
                  <AtSign />
                </InputGroupAddon>
              </InputGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Email</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  {...field}
                  type="email"
                  disabled={isPending}
                  placeholder="Informe seu e-mail"
                  aria-invalid={fieldState.invalid}
                />
                <InputGroupAddon>
                  <Mail />
                </InputGroupAddon>
              </InputGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Senha</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  {...field}
                  type={showPasswords.password ? "text" : "password"}
                  disabled={isPending}
                  placeholder="Informe sua senha"
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
                    onClick={() => setShowPasswords((prev) => ({ ...prev, password: !prev.password }))}
                  >
                    {showPasswords.password ? <EyeOff /> : <Eye />}
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
              <FieldLabel>Confirmar senha</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  {...field}
                  type={showPasswords.confirmPassword ? "text" : "password"}
                  disabled={isPending}
                  placeholder="Confirme sua senha"
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
        <Button type="submit" className="w-full mt-3" disabled={isPending}>
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
