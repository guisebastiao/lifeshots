import { BellRing, UserRoundPlus } from "lucide-react";
import { Notification } from "@/components/Notification";

export const NotificationSection = ({ notifications, type, navigate }) => {
  return (
    <>
      {notifications.length > 0 && (
        <div className="w-full px-2 py-2">
          <span className="font-semibold text-xs text-zinc-300">
            Notificações {type}
          </span>
        </div>
      )}
      {notifications.map((notification) => (
        <Notification.Root key={notification.id}>
          <Notification.Icon
            icon={notification.type === "new-follow" ? UserRoundPlus : BellRing}
          />
          <Notification.Content
            message={notification.message}
            createdAt={notification.createdAt}
          />
          <Notification.Actions>
            {notification.type === "new-follow" && (
              <Notification.Action
                description="Ver Perfil"
                className="bg-primary-theme hover:bg-primary-theme-hover"
                onClick={() => navigate("/user/" + notification.senderId)}
              />
            )}
          </Notification.Actions>
        </Notification.Root>
      ))}
    </>
  );
};
