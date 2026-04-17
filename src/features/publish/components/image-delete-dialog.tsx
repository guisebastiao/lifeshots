import { Button } from "@/shared/components/ui/button";
import { Trash } from "lucide-react";
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

interface ImageDeleteDialogProps {
  onConfirm: () => void;
}

export const ImageDeleteDialog = ({ onConfirm }: ImageDeleteDialogProps) => (
  <AlertDialog>
    <AlertDialogTrigger asChild>
      <Button type="button" size="icon" variant="secondary" className="absolute top-2 right-2">
        <Trash />
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Excluir Imagem</AlertDialogTitle>
        <AlertDialogDescription>Você tem certeza que deseja excluir essa imagem?</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <AlertDialogAction variant="destructive" onClick={onConfirm}>
          Excluir
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);
