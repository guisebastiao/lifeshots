import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

export const NotificationContent = ({ message, createdAt }) => {
  const formatDistance = (date) => {
    return formatDistanceToNow(new Date(date), {
      addSuffix: true,
      locale: ptBR,
    });
  };

  return (
    <div className="flex-1 flex flex-col gap-2">
      <p className="text-xs text-zinc-50">{message}</p>
      <div className="text-[10px] text-zinc-400">
        <span>Noticada {formatDistance(createdAt)}</span>
      </div>
    </div>
  );
};
