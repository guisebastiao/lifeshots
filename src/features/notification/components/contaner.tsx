import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from "@/shared/components/ui/empty";
import { Notification as NotificationRoot } from "@/features/notification/components/notification";
import { useGetNotifications } from "@/features/notification/hooks/use-get-notifications";
import { Spinner } from "@/shared/components/ui/spinner";
import { useEffect, useMemo } from "react";
import { BellOff } from "lucide-react";
import { toast } from "sonner";

interface ContainerProps {
  checked: Set<string>;
  setAllIds: React.Dispatch<React.SetStateAction<string[]>>;
  setChecked: React.Dispatch<React.SetStateAction<Set<string>>>;
  isUnread?: boolean;
}

export const Container = ({ checked, setChecked, setAllIds, isUnread = false }: ContainerProps) => {
  const { data, isLoading, isSuccess, isError, error } = useGetNotifications({
    filter: isUnread ? "unread" : undefined,
  });

  const notifications = useMemo(() => data?.pages.flatMap((page) => page.data) ?? [], [data]);

  useEffect(() => {
    if (isSuccess) {
      const ids = notifications.map((notification) => notification.id);
      setAllIds(ids);
    }
  }, [isSuccess]);

  if (isError) {
    toast.error(error.message);
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-3">
        <Spinner />
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <BellOff />
          </EmptyMedia>
          <EmptyTitle>Nenhuma notificação</EmptyTitle>
          <EmptyDescription>
            {isUnread ? "Você não possui nenhuma notificação não lida." : "Você não possui nenhuma notificação."}
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  const handleHasChecked = ({ notificationId }: { notificationId: string }) => {
    return checked.has(notificationId);
  };

  return notifications.map((notification) => (
    <NotificationRoot
      key={notification.id}
      notification={notification}
      checked={handleHasChecked({ notificationId: notification.id })}
      setChecked={setChecked}
      setAllIds={setAllIds}
    />
  ));
};
