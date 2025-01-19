import { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import { BellOff } from "lucide-react";

import { useNotifications } from "@/hooks/useNotifications";

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
import { Button } from "@/components/ui/button";
import { NotificationSection } from "@/components/NotificationSection";
import { Loading } from "@/components/Loading";

export const Notifications = () => {
  const { getNotifications, updateNotifications, deleteNotifications } =
    useNotifications();
  const { mutate: updateAllNotifications, isPending: pendingUpdate } =
    updateNotifications;
  const { mutate: deleteAllNotifications, isPending: pendingDelete } =
    deleteNotifications;
  const { data, isLoading, hasNextPage, fetchNextPage } = getNotifications;

  const navigate = useNavigate();
  const { ref, inView } = useInView();

  const unreadNotifications = useMemo(() => {
    if (!isLoading) {
      return data.pages.flatMap((page) =>
        page.notifications.filter((notification) => !notification.isRead)
      );
    }
  }, [data, isLoading]);

  const readNotifications = useMemo(() => {
    if (!isLoading) {
      return data.pages.flatMap((page) =>
        page.notifications.filter((notification) => notification.isRead)
      );
    }
  }, [data, isLoading]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <main className="relative w-screen h-screen flex items-center justify-center">
      <section className="absolute top-14 max-w-md w-full h-container flex flex-col overflow-y-scroll space-y-1 py-2">
        <div className="flex w-full justify-between items-center px-2">
          <h1 className="text-base py-2 text-zinc-200 font-semibold">
            Notificações
          </h1>
          <div className="space-x-1">
            <Button
              size="xs"
              disabled={pendingUpdate}
              onClick={() => updateAllNotifications()}
              className="h-6 rounded bg-zinc-700 hover:bg-zinc-800 text-zinc-50">
              {pendingUpdate && <Loading className="w-4 h-4" />}
              Marcar como lido
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  size="xs"
                  className="h-6 rounded bg-red-500 hover:bg-red-600 text-zinc-50">
                  {pendingDelete && <Loading className="w-4 h-4" />}
                  Excluir tudo
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Excluir Notificações</AlertDialogTitle>
                  <AlertDialogDescription>
                    Após confirmar, todas as suas notificações serão excluidas.
                    Deseja realmente prosseguir?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    disabled={pendingDelete}
                    onClick={() => deleteAllNotifications()}
                    className="bg-red-500 hover:bg-red-600 text-bg-zinc-50 flex items-center">
                    {pendingDelete && <Loading className="w-4 h-4" />}
                    Confirmar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
        {isLoading && <Loading />}
        {!isLoading &&
          (unreadNotifications.length <= 0 && readNotifications.length <= 0 ? (
            <div className="flex items-center justify-center flex-col py-5 gap-2">
              <div className="rounded-full w-12 h-12 flex items-center justify-center border border-zinc-50">
                <BellOff size={22} strokeWidth={1} />
              </div>
              <p className="text-sm">Você não possui nenhuma notificação.</p>
            </div>
          ) : (
            <>
              <NotificationSection
                notifications={unreadNotifications}
                type="não lidas"
                navigate={navigate}
              />
              <NotificationSection
                notifications={readNotifications}
                type="lidas"
                navigate={navigate}
              />
            </>
          ))}
        {hasNextPage && (
          <div ref={ref} className="py-1 flex items-center justify-center">
            <Loading />
          </div>
        )}
      </section>
    </main>
  );
};
