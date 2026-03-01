import { Spinner } from "@/components/ui/spinner";
import { useSession } from "@/hooks/use-session";
import { Button } from "@/components/ui/button";

export const Home = () => {
  const { sessionLogout, logoutPending } = useSession();

  return (
    <section className="mx-auto my-auto px-3">
      <Button variant="destructive" disabled={logoutPending} onClick={sessionLogout}>
        {logoutPending && <Spinner className="text-destructive" />}
        <span>Logout</span>
      </Button>
    </section>
  );
};
