import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useNavigate } from "react-router-dom";
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

import { resetPasswordSchema } from "@/schemas/resetPasswordSchema";

export const ResetPassword = () => {
  const { tokenId } = useParams();

  const { resetPassword } = useResetPassword();
  const { mutate, isPending, isSuccess } = resetPassword;

  const navigate = useNavigate();

  const resetPasswordForm = useForm({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onSubmit",
    defaultValues: {
      password: "",
      passwordConfirm: "",
    },
  });

  const handleForgotPassword = () => {
    const data = resetPasswordForm.watch();
    mutate({ data, tokenId });
    resetPasswordForm.reset();
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
    }
  }, [isSuccess]);

  return (
    <main className="w-screen h-screen flex items-center justify-center bg-zinc-950">
      <Form {...resetPasswordForm}>
        <form
          onSubmit={resetPasswordForm.handleSubmit(handleForgotPassword)}
          className="max-w-md w-full px-4 flex flex-col py-6 gap-4">
          <h1 className="text-zinc-50 font-black text-4xl text-center py-6">
            Redefinir Senha
          </h1>
          <p className="text-sm text-zinc-300 mb-4">
            Para redefinir sua senha, escolha uma nova senha que atenda os
            critérios, a senha deve possuir pelo menos 8 caracteres, uma letra
            maiúscula, dois números e um caractere especial. Após isso clique
            para redefinir a senha.
          </p>
          {Object.keys(resetPasswordForm.formState.errors).length > 0 && (
            <div className="border border-red-500 bg-red-transparent px-3 py-1 rounded-md">
              <ul className="text-sm space-y-1">
                {Object.values(resetPasswordForm.formState.errors)
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
            control={resetPasswordForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="absolute left-3 top-0 px-2 bg-zinc-950 z-10">
                  Senha
                </FormLabel>
                <FormControl>
                  <Input type="password" autoComplete="off" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={resetPasswordForm.control}
            name="passwordConfirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="absolute left-3 top-0 px-2 bg-zinc-950 z-10">
                  Confirme sua Senha
                </FormLabel>
                <FormControl>
                  <Input type="password" autoComplete="off" {...field} />
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
                <span>Redefinindo Senha</span>
              </>
            ) : (
              <span>Redefinir Senha</span>
            )}
          </Button>
        </form>
      </Form>
    </main>
  );
};
