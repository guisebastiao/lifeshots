import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

export const handleFormatDistanceToNow = ({ date }: { date: Date }): string => {
  return formatDistanceToNow(new Date(date), {
    locale: ptBR,
  }).replace("cerca de", "");
};
