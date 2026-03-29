import type { NotificationResponse, NotificationType } from "@/features/notification/types/notification-types";
import { useDeleteNotification } from "@/features/notification/hooks/use-delete-notification";
import { EllipsisVertical, Heart, MessageCircle, UserPlus } from "lucide-react";
import { handleFormatDistanceToNow } from "@/shared/utils/format-date";
import { Checkbox } from "@/components/ui/checkbox";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { useCallback, useState } from "react";
import { Avatar } from "@/components/avatar";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface NotificationProps {
  notification: NotificationResponse;
  checked: boolean;
  setChecked: React.Dispatch<React.SetStateAction<Set<string>>>;
  setAllIds: React.Dispatch<React.SetStateAction<string[]>>;
}

const handleGetBadgeIcon = ({ type }: { type: NotificationType }): React.ReactNode => {
  switch (type) {
    case "NEW_FOLLOWER": {
      return <UserPlus className="fill-white" />;
    }
    case "LIKE_COMMENT":
    case "LIKE_POST":
    case "LIKE_REPLY_COMMENT":
    case "LIKE_STORY": {
      return <Heart className="fill-white" />;
    }
    case "COMMENT_POST":
    case "REPLY_COMMENT": {
      return <MessageCircle className="fill-white" />;
    }
  }
};

export const Notification = ({ notification, checked = false, setChecked, setAllIds }: NotificationProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const { mutate, isPending } = useDeleteNotification();

  const handleToggleChecked = useCallback(
    ({ notificationId }: { notificationId: string }) => {
      setChecked((prev) => {
        const next = new Set(prev);
        next.has(notificationId) ? next.delete(notificationId) : next.add(notificationId);
        return next;
      });
    },
    [setChecked],
  );

  const handleDeleteNotification = ({ notificationId }: { notificationId: string }) => {
    mutate(
      { notificationId },
      {
        onSuccess: (_, { notificationId }) => {
          setAllIds((prev) => prev.filter((id) => id !== notificationId));

          setChecked((prev) => {
            const next = new Set(prev);
            next.delete(notificationId);
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

  return (
    <div
      data-read={notification.read}
      data-checked={checked}
      className="group relative flex gap-3 p-3 border rounded-md data-[read=false]:bg-primary/2 data-[read=false]:border-primary/20 data-[checked=true]:bg-primary/10! data-[checked=true]:border-primary/40! transition overflow-hidden"
    >
      {!notification.read && <div className="absolute top-0 left-0 w-1 h-full bg-primary/60" />}
      <Checkbox
        className="my-auto border-foreground/50"
        onCheckedChange={() => handleToggleChecked({ notificationId: notification.id })}
        checked={checked}
      />
      <Avatar
        className="size-10 group-data-[checked=true]:opacity-60 transition"
        profilePicture={notification.sender.profilePicture}
      >
        <Avatar.Badge className="size-4! [&>svg]:size-2!">
          {handleGetBadgeIcon({ type: notification.type })}
        </Avatar.Badge>
      </Avatar>
      <div className="flex-1 group-data-[checked=true]:opacity-60 transition">
        <h4 className="font-sm font-medium line-clamp-1">{notification.title}</h4>
        <p className="text-[13px] text-foreground/80 line-clamp-1">{notification.message}</p>
        <span className="text-xs text-foreground/60 font-medium line-clamp-1">
          {handleFormatDistanceToNow({ date: notification.createdAt })}
        </span>
      </div>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenu>
          <DropdownMenuTrigger disabled={checked} asChild>
            <Button size="icon-sm" className="my-auto" variant="ghost">
              <EllipsisVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem disabled={isPending} variant="destructive" onClick={() => setIsOpen(true)}>
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir notificação</AlertDialogTitle>
            <AlertDialogDescription>Você tem certeza que deseja excluir essa notificação.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              disabled={isPending}
              variant="destructive"
              onClick={() => {
                handleDeleteNotification({ notificationId: notification.id });
              }}
            >
              {isPending && <Spinner className="text-destructive" />}
              <span>Excluir</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
