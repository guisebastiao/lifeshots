import { DropdownMenuItem } from "@/shared/components/ui/dropdown-menu";
import { useDeletePost } from "@/features/post/hooks/use-delete-post";
import { Spinner } from "@/shared/components/ui/spinner";
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

interface DeletePostProps {
  postId: string;
}

export const DeletePost = ({ postId }: DeletePostProps) => {
  const { mutate, isPending } = useDeletePost();

  const handleDeletePost = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    mutate({ postId });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <span>Excluir</span>
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir Publicação</AlertDialogTitle>
          <AlertDialogDescription>Você tem certeza que deseja essa publicação?</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancelar</AlertDialogCancel>
          <AlertDialogAction variant="destructive" disabled={isPending} onClick={handleDeletePost}>
            {isPending && <Spinner className="text-destructive" />}
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
