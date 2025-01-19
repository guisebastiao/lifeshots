import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useRegister } from "@/hooks/useRegister";

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
import { Loading } from "@/components/Loading";

import { registerSchema } from "@/schemas/registerSchema";

export const Register = () => {
  const { registerMutation } = useRegister();
  const { mutate, isPending } = registerMutation;
  const navigate = useNavigate();

  const registerForm = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onSubmit",
    defaultValues: {
      username: "",
      name: "",
      surname: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const handleRegister = () => {
    const data = registerForm.watch();
    mutate({ data });
    registerForm.reset();
  };

  return (
    <main className="w-screen h-screen flex items-center justify-center bg-zinc-950">
      <Form {...registerForm}>
        <form
          onSubmit={registerForm.handleSubmit(handleRegister)}
          className="max-w-md w-full px-4 flex flex-col py-6 gap-4">
          <h1 className="text-zinc-50 font-black text-4xl text-center py-6">
            LifeShots
          </h1>
          {Object.keys(registerForm.formState.errors).length > 0 && (
            <div className="border border-red-500 bg-red-transparent px-3 py-1 rounded-md">
              <ul className="text-sm space-y-1">
                {Object.values(registerForm.formState.errors)
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
            control={registerForm.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="absolute left-3 top-0 px-2 bg-zinc-950 z-10">
                  Nome de Usuário
                </FormLabel>
                <FormControl>
                  <Input type="text" autoComplete="off" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={registerForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="absolute left-3 top-0 px-2 bg-zinc-950 z-10">
                  Nome
                </FormLabel>
                <FormControl>
                  <Input type="text" autoComplete="off" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={registerForm.control}
            name="surname"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="absolute left-3 top-0 px-2 bg-zinc-950 z-10">
                  Sobrenome
                </FormLabel>
                <FormControl>
                  <Input type="text" autoComplete="off" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={registerForm.control}
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
            control={registerForm.control}
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
            control={registerForm.control}
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
                <span>Registrando</span>
              </>
            ) : (
              <span>Registrar</span>
            )}
          </Button>
          <div className="flex items-center justify-center gap-2 overflow-hidden py-6">
            <Separator />
            <span className="text-zinc-400">OU</span>
            <Separator />
          </div>
          <Button
            onClick={() => navigate("/login")}
            variant="ghost"
            className="self-center"
            type="button">
            <span>Entrar na Conta</span>
          </Button>
        </form>
      </Form>
    </main>
  );
};
