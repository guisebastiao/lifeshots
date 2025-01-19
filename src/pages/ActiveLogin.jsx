import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthProvider";
import { useParams } from "react-router-dom";

import { useActiveLogin } from "@/hooks/useActiveLogin";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/Loading";

export const ActiveLogin = () => {
  const { token } = useParams();
  const { login } = useAuth();

  const { activeLogin } = useActiveLogin();
  const { mutate, isPending, isSuccess, data } = activeLogin();

  const [code, setCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (code.length < 6) {
      return;
    }

    const data = { code, token };
    mutate({ data });
  };

  useEffect(() => {
    if (isSuccess) {
      login({ auth: data });
    }
  }, [isSuccess]);

  return (
    <main className="w-screen h-screen flex items-center justify-center">
      <section className="flex flex-col items-center gap-5">
        <h1 className="text-3xl font-bold text-zinc-50 text-center">
          Código de Verificação
        </h1>
        <p className="text-zinc-400 text-center mb-5">
          Digite o código de 6 dígitos enviado para o seu e-mail para concluir o
          login.
        </p>
        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
          <InputOTP maxLength={6} onChange={(value) => setCode(value)}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <Button
            className="bg-primary-theme hover:bg-primary-theme-hover text-zinc-50 mt-7"
            disabled={isPending}
            type="submit">
            {isPending ? (
              <>
                <Loading />
                <span>Verificando</span>
              </>
            ) : (
              <span>Verificar</span>
            )}
          </Button>
        </form>
      </section>
    </main>
  );
};
