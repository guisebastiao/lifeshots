import { useLogout } from "@/features/auth/hooks/use-logout";
import { queryClient } from "@/app/providers/query-client";
import { useSession } from "@/app/hooks/use-session";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Feed = () => {
  const { logout } = useSession();

  const { mutate, isPending } = useLogout();

  const handleLogout = () => {
    mutate(undefined, {
      onSuccess: () => {
        queryClient.clear();
        logout();
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
  };

  return (
    <section className="mx-auto my-auto px-3 py-8">
      <Button variant="destructive" disabled={isPending} onClick={handleLogout}>
        {isPending && <Spinner className="text-destructive" />}
        <span>Logout</span>
      </Button>
    </section>
  );
};
