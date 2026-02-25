import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/hooks/use-auth";
import { useSession } from "@/hooks/use-session";

export const Home = () => {
  const { useLogout } = useAuth();
  const { mutate, isPending } = useLogout();

  const { logOut } = useSession();

  const handleLogout = () => {
    mutate(undefined, {
      onSuccess: () => {
        logOut();
      },
    });
  };

  return (
    <section className="mx-auto self-center">
      <Button variant="destructive" disabled={isPending} onClick={handleLogout}>
        {isPending && <Spinner className="text-destructive" />}
        <span>Logout</span>
      </Button>
    </section>
  );
};
