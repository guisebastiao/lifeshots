import { generatePushSubscription } from "@/lib/push/generate-push-subscription";
import { useSession } from "@/hooks/use-session";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const OauthSuccess = () => {
  const { logIn } = useSession();

  const navigate = useNavigate();

  useEffect(() => {
    logIn();
    generatePushSubscription();
    navigate("/", { replace: true });
  }, []);

  return <span className="mx-auto self-center text-center">Autenticado com sucesso! Redirecionando...</span>;
};
