import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <section className="mx-auto my-auto flex flex-col items-center px-3 py-8">
      <span className="text-muted-foreground tracking-widest text-center">ERROR 404</span>
      <h1 className="text-3xl font-semibold tracking-tight text-center mb-2">Página não encontrada</h1>
      <p className="text-sm text-muted-foreground leading-relaxed text-center mb-4">
        A página que você tentou acessar não existe ou foi removida.
      </p>
      <Button onClick={() => navigate(-1)}>
        <ArrowLeft className="size-4" />
        <span>Voltar</span>
      </Button>
    </section>
  );
};
