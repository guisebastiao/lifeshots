import { Spinner } from "@/shared/components/ui/spinner";
import { useSession } from "@/app/hooks/use-session";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const OauthSuccess = () => {
  const { login } = useSession();

  const navigate = useNavigate();

  useEffect(() => {
    login();
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
