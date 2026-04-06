import { useDeleteComment } from "@/features/comment/hooks/use-delete-comment";
import { DropdownMenuItem } from "@/shared/components/ui/dropdown-menu";
import { Spinner } from "@/shared/components/ui/spinner";
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

interface DeleteCommentProps {
  commentId: string;
}

export const DeleteComment = ({ commentId }: DeleteCommentProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const { mutate, isPending } = useDeleteComment();

  const handleDeleteComment = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    mutate(
      { commentId },
      {
        onSuccess: () => {
          setIsOpen(false);
        },
        onError: ({ message }) => {
          toast.error(message);
        },
      },
    );
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem variant="destructive" onSelect={(e) => e.preventDefault()}>
          Excluir
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir comentário</AlertDialogTitle>
          <AlertDialogDescription>Você tem certeza que deseja excluir esse comentário?</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancelar</AlertDialogCancel>
          <AlertDialogAction variant="destructive" disabled={isPending} onClick={handleDeleteComment}>
            {isPending && <Spinner className="text-destructive" />} <span>Excluir</span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
