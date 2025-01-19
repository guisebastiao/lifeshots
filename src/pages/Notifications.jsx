import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import { BellOff } from "lucide-react";

import { useNotifications } from "@/hooks/useNotifications";

import { Notification } from "@/components/Notification";
import { Loading } from "@/components/Loading";

export const Notifications = () => {
  const { getAllNotifications, updateAllNotifications } = useNotifications();

  const { data, isLoading, hasNextPage, fetchNextPage } = getAllNotifications();
  const { mutate } = updateAllNotifications();

  const navigate = useNavigate();
  const { ref, inView } = useInView();

  useEffect(() => {
    mutate();
  }, []);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <main className="relative w-screen h-screen flex items-center justify-center">
      <section className="absolute top-14 max-w-md w-full h-container flex flex-col overflow-y-scroll space-y-1 py-2">
        {isLoading ? (
          <Loading />
        ) : data.pages[0].notifications.length <= 0 ? (
          <div className="flex flex-col justify-center items-center gap-2 py-4">
            <div className="w-12 h-12 rounded-full border border-white flex items-center justify-center">
              <BellOff width={22} strokeWidth={1} />
            </div>
            <span className="text-sm text-zinc-300">
              Você não possui nenhuma notificação
            </span>
          </div>
        ) : (
          data.pages.map((page) =>
            page.notifications.map((notification) => (
              <Notification.Root key={notification.id}>
                <Notification.Icon icon={notification.sender.profilePicture} />
                <Notification.Content
                  message={notification.message}
                  createdAt={notification.createdAt}
                />
                <Notification.Actions>
                  {notification.type === "new-follow" && (
                    <Notification.Action
                      description="Ver Perfil"
                      className="bg-primary-theme hover:bg-primary-theme-hover"
                      onClick={() => navigate(`/user/${notification.senderId}`)}
                    />
                  )}
                </Notification.Actions>
              </Notification.Root>
            ))
          )
        )}
        {hasNextPage && (
          <div ref={ref} className="py-1 flex items-center justify-center">
            <Loading />
          </div>
        )}
      </section>
    </main>
  );
};
