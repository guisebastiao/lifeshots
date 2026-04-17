import { Button } from "@/shared/components/ui/button";
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

interface PublishActionsProps {
  isPending: boolean;
  isDirty: boolean;
  onDiscard: () => void;
}

export const PublishActions = ({ isPending, isDirty, onDiscard }: PublishActionsProps) => (
  <div className="flex flex-col gap-1">
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button type="button" variant="secondary" disabled={!isDirty || isPending}>
          Descartar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Descartar Alterações</AlertDialogTitle>
          <AlertDialogDescription>Você tem certeza que deseja descartar todas as alterações?</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={onDiscard}>
            Descartar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    <Button type="submit" disabled={isPending}>
      {isPending && <Spinner className="text-white" />}
      Publicar
    </Button>
  </div>
);
