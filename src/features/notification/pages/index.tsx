import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { useReadAll } from "@/features/notification/hooks/use-read-all";
import { Container } from "@/features/notification/components/contaner";
import { Toolbar } from "@/features/notification/components/toolbar";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";

export const Notification = () => {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [allIds, setAllIds] = useState<string[]>([]);

  const isFirstRender = useRef(true);
  const location = useLocation();

  const { mutate } = useReadAll();

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    return () => {
      mutate(undefined, {
        onError: ({ message }) => {
          toast.error(message);
        },
      });
    };
  }, [location.pathname]);

  return (
    <section className="max-w-2xl flex-1 w-full mx-auto p-3">
      <header className="w-full">
        <h1 className="text-base font-medium tracking-tight text-balance">Notificações</h1>
      </header>
      <Tabs defaultValue="all">
        <TabsList className="my-2" variant="line">
          <TabsTrigger value="all">Todas</TabsTrigger>
          <TabsTrigger value="unread">Não lidas</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-1">
          <Toolbar allIds={allIds} checked={checked} setChecked={setChecked} setAllIds={setAllIds} />
          <Container checked={checked} setChecked={setChecked} setAllIds={setAllIds} />
        </TabsContent>
        <TabsContent value="unread" className="space-y-1">
          <Toolbar allIds={allIds} checked={checked} setChecked={setChecked} setAllIds={setAllIds} />
          <Container checked={checked} setChecked={setChecked} isUnread={true} setAllIds={setAllIds} />
        </TabsContent>
      </Tabs>
    </section>
  );
};
