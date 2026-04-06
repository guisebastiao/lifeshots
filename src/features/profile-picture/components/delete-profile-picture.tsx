import { useDeleteProfilePicture } from "@/features/profile-picture/hooks/use-delete-profile-picture";
import { Spinner } from "@/shared/components/ui/spinner";
import { useMe } from "@/features/profile/hooks/use-me";
import { Button } from "@/shared/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
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

export const DeleteProfilePicture = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { mutate, isPending } = useDeleteProfilePicture();
  const { data, isSuccess } = useMe();

  const handleDeleteProfilePicture = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    mutate(undefined, {
      onSuccess: () => {
        setIsOpen(false);
      },
      onError: ({ message }) => {
        toast.error(message);
      },
    });
  };

  return (
    <div className="w-full mb-3">
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogTrigger asChild>
          <Button disabled={isSuccess && !data.profilePicture} variant="destructive" className="w-full">
            Excluir Foto de Perfil
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir Foto de Perfil</AlertDialogTitle>
            <AlertDialogDescription>Você realmente deseja excluir sua foto de perfil?</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancelar</AlertDialogCancel>
            <AlertDialogAction disabled={isPending} variant="destructive" onClick={handleDeleteProfilePicture}>
              {isPending && <Spinner className="text-white" />}
              <span>Excluir</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
