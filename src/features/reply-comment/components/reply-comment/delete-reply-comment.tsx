import { useDeleteReplyComment } from "@/features/reply-comment/hooks/use-delete-reply-comment";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Spinner } from "@/components/ui/spinner";
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
} from "@/components/ui/alert-dialog";

interface DeleteReplyCommentProps {
  replyCommentId: string;
}

export const DeleteReplyComment = ({ replyCommentId }: DeleteReplyCommentProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const { mutate, isPending } = useDeleteReplyComment();

  const handleDeleteReplyComment = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    mutate(
      { replyCommentId },
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
          <AlertDialogTitle>Excluir resposta do comentário</AlertDialogTitle>
          <AlertDialogDescription>
            Você tem certeza que deseja excluir essa resposta do comentário?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancelar</AlertDialogCancel>
          <AlertDialogAction variant="destructive" disabled={isPending} onClick={handleDeleteReplyComment}>
            {isPending && <Spinner className="text-destructive" />} <span>Excluir</span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
