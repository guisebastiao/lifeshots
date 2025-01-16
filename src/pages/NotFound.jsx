import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";

export const NotFound = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const goToPage = () => {
    if (isAuthenticated) {
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  return (
    <main className="bg-zinc-950 w-screen h-screen flex items-center justify-center flex-col md:flex-row">
      <section>
        <img
          src="/not-found.png"
          alt="img-not-found"
          className="max-w-80 w-full"
        />
      </section>
      <section className="flex items-center justify-center flex-col">
        <h1 className="text-4xl text-zinc-300 m-3 font-semibold text-center">
          Página Não Encontrada!
        </h1>
        <p className="text-sm text-zinc-400 text-center max-w-sm px-4">
          Tem certeza de que a URL do site está correta? Procuramos esta página
          em todos os lugares e não encontramos.
        </p>
        <Button
          className="m-6 bg-primary-theme text-zinc-50 hover:bg-primary-theme-hover"
          onClick={goToPage}>
          <span>Voltar Para o Inicio</span>
        </Button>
      </section>
    </main>
  );
};
