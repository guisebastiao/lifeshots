import { useLogout } from "@/features/auth/hooks/use-logout";
import { queryClient } from "@/app/providers/query-client";
import { useSession } from "@/app/hooks/use-session";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
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
} from "@/components/ui/alert-dialog";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";

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
        <Field>
          <FieldLabel>Sair</FieldLabel>
          <FieldDescription>Clique no botão abaixo para finalizar sua sessão.</FieldDescription>
          <Button className="w-full" variant="destructive">
            <LogOut />
            <span>Sair</span>
          </Button>
        </Field>
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
