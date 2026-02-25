import { generatePushSubscription } from "@/lib/push/generate-push-subscription";
import { useFormAutoClearErrors } from "@/hooks/use-form-auto-clear-errors";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { ApiException } from "@/lib/http/errors/api-exception";
import { useLocation, useNavigate } from "react-router-dom";
import type { LoginRequest } from "@/types/auth-types";
import { Separator } from "@/components/ui/separator";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GoogleIcon } from "@/components/google-icon";
import { loginSchema } from "@/schemas/auth-schemas";
import { Spinner } from "@/components/ui/spinner";
import { useSession } from "@/hooks/use-session";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { Lock, Mail } from "lucide-react";
import { toast } from "sonner";

export const Login = () => {
  const { useLogin } = useAuth();
  const { mutate, isPending } = useLogin();
  const { logIn } = useSession();

  const navigate = useNavigate();
  const location = useLocation();

  const { email } = (location.state as { email?: string }) || {};

  const form = useForm<LoginRequest>({
    resolver: zodResolver(loginSchema),
    values: {
      email: email ?? "",
      password: "",
      errorCredentials: "",
    },
  });

  const onSubmit = (data: LoginRequest) => {
    mutate(
      { data },
      {
        onSuccess: async () => {
          logIn();
          await generatePushSubscription();
        },
        onError: (error) => {
          if (error instanceof ApiException) {
            if (error.code === "BAD_CREDENTIALS" && error.details) {
              error.details.forEach((detail) => {
                form.setError(detail.field as keyof LoginRequest, { type: "server", message: detail.error });
              });

              return;
            }

            if (error.code === "VALIDATION_ERROR" && error.details) {
              error.details.forEach((detail) => {
                form.setError(detail.field as keyof LoginRequest, { type: "server", message: detail.error });
              });

              return;
            }
          }

          toast.error(error.message);
        },
      },
    );
  };

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/login/google`;
  };

  useFormAutoClearErrors({ submitCount: form.formState.submitCount, clearErrors: form.clearErrors });

  return (
    <section className="max-w-lg w-full mx-auto self-center">
      <h1 className="text-2xl font-semibold tracking-tight text-center mb-1">Entrar</h1>
      <p className="leading-7 text-foreground/75 text-center mb-3 text-[15px]">
        Insira suas credenciais ou entre com o google para acessar sua conta
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
          control={form.control}
          name="errorCredentials"
          render={({ fieldState }) => (
            <FieldError
              errors={[fieldState.error]}
              className="bg-destructive/10 border border-destructive/40 text-center py-0.5 rounded-[6px]"
            />
          )}
        />
        <Button
          type="button"
          variant="link"
          className="text-foreground/80 underline px-0"
          disabled={isPending}
          onClick={() => navigate("/forgot-password")}
        >
          Esqueceu sua senha?
        </Button>
        <Button type="submit" form="login-form" className="w-full" disabled={isPending}>
          {isPending && <Spinner className="text-white" />}
          <span>Entrar</span>
        </Button>
        <div className="flex justify-center items-center overflow-hidden mt-4 mb-6">
          <Separator />
          <span className="shrink-0 text-xs uppercase text-muted-foreground px-2">Ou continue com</span>
          <Separator />
        </div>
        <Button type="button" variant="secondary" className="w-full" disabled={isPending} onClick={handleGoogleLogin}>
          <GoogleIcon />
          <span>Continuar com Google</span>
        </Button>
        <div className="flex justify-center items-center">
          <span className="text-sm font-medium text-foreground/80">Não tem uma conta?</span>
          <Button
            type="button"
            variant="link"
            className="text-foreground/80 underline px-1"
            disabled={isPending}
            onClick={() => navigate("/register")}
          >
            <span>Inscreva-se</span>
          </Button>
        </div>
      </form>
    </section>
  );
};
