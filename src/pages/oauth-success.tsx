import { usePushSubscribe } from "@/hooks/use-push-subscribe";
import { Spinner } from "@/components/ui/spinner";
import { useSession } from "@/hooks/use-session";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const OauthSuccess = () => {
  const { sessionLogin } = useSession();
  const { subscribe } = usePushSubscribe();

  const navigate = useNavigate();

  useEffect(() => {
    sessionLogin();
    subscribe();
    navigate("/", { replace: true });
  }, []);

  return (
    <section className="mx-auto my-auto space-y-3">
      <h1 className="text-2xl font-semibold tracking-tight text-center">Autenticação bem sucedida</h1>
      <div className="flex justify-center items-center gap-1.5">
        <Spinner />
        <span>Redirecionando...</span>
      </div>
    </section>
  );
};
