import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useResetPassword } from "@/hooks/useResetPassword";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/Loading";

import { forgotPasswordSchema } from "@/schemas/forgotPasswordSchema";

export const ForgotPassword = () => {
  const { createReset } = useResetPassword();
  const { mutate, isPending } = createReset;

  const forgotPasswordForm = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
    },
  });

  const handleForgotPassword = () => {
    const data = forgotPasswordForm.watch();
    mutate({ data });
    forgotPasswordForm.reset();
  };

  return (
    <main className="w-screen h-screen flex items-center justify-center bg-zinc-950">
      <Form {...forgotPasswordForm}>
        <form
          onSubmit={forgotPasswordForm.handleSubmit(handleForgotPassword)}
          className="max-w-md w-full px-4 flex flex-col py-6 gap-4">
          <h1 className="text-zinc-50 font-black text-4xl text-center py-6">
            Recuperar Senha
          </h1>
          <p className="text-sm text-zinc-300 mb-4">
            Esqueceu sua senha? Não se preocupe! Insira o e-mail associado à sua
            conta no campo abaixo. Vamos enviar um link de recuperação para que
            você possa criar uma nova senha.
          </p>
          {Object.keys(forgotPasswordForm.formState.errors).length > 0 && (
            <div className="border border-red-500 bg-red-transparent px-3 py-1 rounded-md">
              <ul className="text-sm space-y-1">
                {Object.values(forgotPasswordForm.formState.errors)
                  .map((error) => error.message)
                  .map((error, index) => (
                    <li key={index}>
                      <strong>-</strong> {error}
                    </li>
                  ))}
              </ul>
            </div>
          )}
          <FormField
            control={forgotPasswordForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="absolute left-3 top-0 px-2 bg-zinc-950 z-10">
                  E-mail
                </FormLabel>
                <FormControl>
                  <Input type="text" autoComplete="off" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={isPending}
            className="bg-primary-theme hover:bg-primary-theme-hover mt-5 text-zinc-50">
            {isPending ? (
              <>
                <Loading />
                <span>Enviando email</span>
              </>
            ) : (
              <span>Enviar email</span>
            )}
          </Button>
        </form>
      </Form>
    </main>
  );
};
