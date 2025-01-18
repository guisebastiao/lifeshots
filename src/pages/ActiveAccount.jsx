import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";

import { useActiveAccount } from "@/hooks/useActiveAccount";

import { useAuth } from "@/context/AuthProvider";

export const ActiveAccount = () => {
  const { activeToken } = useParams();

  const { login } = useAuth();

  const { activeAccountMutation } = useActiveAccount();
  const { mutate, data, isPending, isSuccess } = activeAccountMutation;

  useEffect(() => {
    if (activeToken) {
      const data = { activeToken };
      mutate({ data });
    }
  }, [activeToken]);

  useEffect(() => {
    if (isSuccess) {
      login({ auth: data });
    }
  }, [isSuccess]);

  return (
    <main className="flex h-screen items-center justify-center">
      {isPending ? (
        <div className="flex gap-1 items-center">
          <TailSpin
            width={24}
            height={24}
            color="text-zinc-50"
            strokeWidth={6}
          />
          <h1 className="text-lg">Ativando Conta</h1>
        </div>
      ) : (
        <h1 className="text-lg">Ativar Conta</h1>
      )}
    </main>
  );
};
