import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { TailSpin } from "react-loader-spinner";
import { useForm } from "react-hook-form";

import { useLogin } from "@/hooks/useLogin";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { loginSchema } from "@/schemas/loginSchema";

export const Login = () => {
  const { loginMutation } = useLogin();
  const { mutate, data, isSuccess, isPending } = loginMutation;
  const navigate = useNavigate();

  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = () => {
    const data = loginForm.watch();
    mutate({ data });
  };

  const handleForgotPassword = () => {};

  useEffect(() => {
    if (isSuccess) {
      navigate("/active-login/" + data.token);
    }
  }, [isSuccess]);

  return (
    <main className="w-screen h-screen flex items-center justify-center bg-zinc-950">
      <Form {...loginForm}>
        <form
          onSubmit={loginForm.handleSubmit(handleLogin)}
          className="max-w-md w-full px-4 flex flex-col py-6 gap-4">
          <h1 className="text-zinc-50 font-black text-4xl text-center py-6">
            LifeShots
          </h1>
          <FormField
            control={loginForm.control}
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
          <FormField
            control={loginForm.control}
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
          <Button
            type="submit"
            disabled={isPending}
            className="bg-primary-theme hover:bg-primary-theme-hover mt-5 text-zinc-50">
            {isPending ? (
              <>
                <TailSpin
                  width={24}
                  height={24}
                  color="#fafafa"
                  strokeWidth={6}
                />
                <span>Entrando</span>
              </>
            ) : (
              <span>Entrar</span>
            )}
          </Button>
          <div className="flex items-center justify-center gap-2 overflow-hidden py-6">
            <Separator />
            <span className="text-zinc-400">OU</span>
            <Separator />
          </div>
          <Button
            onClick={() => navigate("/register")}
            variant="ghost"
            className="self-center"
            type="button">
            <span>Criar Conta</span>
          </Button>
          <Button
            onClick={handleForgotPassword}
            variant="ghost"
            className="self-center"
            type="button">
            <span>Esqueci Minha Senha</span>
          </Button>
        </form>
      </Form>
    </main>
  );
};
