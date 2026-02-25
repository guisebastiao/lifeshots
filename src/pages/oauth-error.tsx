import { useNavigate, useSearchParams } from "react-router-dom";
import { useSession } from "@/hooks/use-session";
import { useEffect } from "react";
import { toast } from "sonner";

export const OauthError = () => {
  const [searchParams] = useSearchParams();
  const { logOut } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    const reason = searchParams.get("reason");
    const email = searchParams.get("email");
    const name = searchParams.get("name");

    logOut();

    if (reason?.toLocaleLowerCase() === "user_not_registered") {
      navigate("/register", { state: { email, name }, replace: true });
      return;
    }

    toast.error("Erro na autenticação via OAuth. Por favor, tente novamente mais tarde.");
    navigate("/login", { replace: true });
  }, []);

  return <span className="mx-auto self-center text-center">Erro na autenticação! Redirecionando...</span>;
};
