import { useLogout } from "@/features/auth/hooks/use-logout";
import { queryClient } from "@/app/providers/query-client";
import { Spinner } from "@/shared/components/ui/spinner";
import { Button } from "@/shared/components/ui/button";
import { useSession } from "@/app/hooks/use-session";
import { LogOut } from "lucide-react";
import { toast } from "sonner";
import type React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shared/components/ui/alert-dialog";

export const LogoutAlert = () => {
  const { logout } = useSession();

  const { mutate, isPending } = useLogout();

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

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
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <LogOut />
          Sair
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Sair</AlertDialogTitle>
          <AlertDialogDescription>Você tem certeza que deseja sair da seu sessão?</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={handleLogout}>
            {isPending && <Spinner className="text-destructive" />}
            <span>Sair</span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
