import type { DeleteNotificationsRequest } from "@/features/notification/types/notification-types";
import { useDeleteNotifications } from "@/features/notification/hooks/use-delete-notifications";
import { X, Trash, GalleryVerticalEnd } from "lucide-react";
import { Spinner } from "@/shared/components/ui/spinner";
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

interface ToolbarProps {
  allIds: string[];
  checked: Set<string>;
  setChecked: React.Dispatch<React.SetStateAction<Set<string>>>;
  setAllIds: React.Dispatch<React.SetStateAction<string[]>>;
}

export const Toolbar = ({ checked, allIds, setChecked, setAllIds }: ToolbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const { mutate, isPending } = useDeleteNotifications();

  const handleDeleteNotifications = () => {
    const data: DeleteNotificationsRequest = { ids: [...checked] };
    mutate(
      { data },
      {
        onSuccess: (_, { data }) => {
          const idsToDelete = new Set(data.ids);
          setAllIds((prev) => prev.filter((id) => !idsToDelete.has(id)));

          setChecked((prev) => {
            const next = new Set(prev);
            idsToDelete.forEach((id) => next.delete(id));
            return next;
          });

          setIsOpen(false);
        },
        onError: ({ message }) => {
          toast.error(message);
        },
      },
    );
  };

  const handleCheckAll = () => {
    setChecked(new Set(allIds));
  };

  return (
    <div
      data-active={checked.size > 0}
      className="flex items-center justify-between h-0 data-[active=true]:h-9 bg-foreground/5 rounded-md px-1 overflow-hidden transition-all"
    >
      <div className="flex items-center gap-1">
        <Button disabled={isPending} variant="ghost" size="icon-sm" onClick={() => setChecked(new Set())}>
          <X />
        </Button>
        <span className="text-foreground/75 text-sm">
          {checked.size} {checked.size === 1 ? "selecionada" : "selecionadas"}
        </span>
      </div>
      <div className="flex">
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
          <AlertDialogTrigger asChild>
            <Button disabled={isPending} variant="ghost" size="icon-sm">
              <Trash />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Excluir notificações</AlertDialogTitle>
              <AlertDialogDescription>
                Você tem certeza que deseja excluir {checked.size}{" "}
                {checked.size === 1 ? "notificação." : "notificações."}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isPending}>Cancelar</AlertDialogCancel>
              <AlertDialogAction disabled={isPending} onClick={handleDeleteNotifications} variant="destructive">
                {isPending && <Spinner />} <span>Excluir</span>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <Button disabled={isPending} variant="ghost" size="icon-sm" onClick={handleCheckAll}>
          <GalleryVerticalEnd />
        </Button>
      </div>
    </div>
  );
};
