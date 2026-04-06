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

interface LogoutAlertProps {
  isOpen?: boolean;
}

export const LogoutAlert = ({ isOpen }: LogoutAlertProps) => {
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
        <Button
          data-open={isOpen}
          className="group md:w-full not-md:aspect-square not-md:size-7.75 flex items-center justify-start p-0 gap-2.5 border-destructive/30"
          variant="destructive"
        >
          <LogOut className="md:size-5 size-4 shrink-0 ml-1.75" />
          <span className="hidden md:block overflow-hidden whitespace-nowrap w-0 opacity-0 transition-all duration-300 md:group-data-[open=true]:w-full md:group-data-[open=true]:opacity-100 tracking-tight text-left">
            Sair
          </span>
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
