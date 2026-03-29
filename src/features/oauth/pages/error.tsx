import { useNavigate, useSearchParams } from "react-router-dom";
import { useSession } from "@/app/hooks/use-session";
import { Spinner } from "@/components/ui/spinner";
import { useEffect } from "react";
import { toast } from "sonner";

export const OauthError = () => {
  const [searchParams] = useSearchParams();
  const { logout } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    const reason = searchParams.get("reason");
    const email = searchParams.get("email");
    const name = searchParams.get("name");

    logout();

    if (reason?.toLocaleLowerCase() === "user_not_registered") {
      navigate("/register", { state: { email, name }, replace: true });
      return;
    }

    toast.error("Erro na autenticação via OAuth. Por favor, tente novamente mais tarde.");
    navigate("/login", { replace: true });
  }, []);

  return (
    <section className="mx-auto my-auto space-y-3">
      <h1 className="text-2xl font-semibold tracking-tight text-center">Autenticação mal sucedida</h1>
      <div className="flex justify-center items-center gap-1.5">
        <Spinner />
        <span>Redirecionando...</span>
      </div>
    </section>
  );
};
