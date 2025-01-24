import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

export function formatDistance(date) {
  return formatDistanceToNow(date, {
    locale: {
      ...ptBR,
      formatDistance: (token, count) => {
        const shortFormats = {
          lessThanXSeconds: "agora",
          xSeconds: "agora",
          halfAMinute: "há 30s",
          lessThanXMinutes: `há ${count}m`,
          xMinutes: `há ${count}m`,
          aboutXHours: `há ${count}h`,
          xHours: `há ${count}h`,
          xDays: `há ${count}d`,
          aboutXWeeks: `há ${count}sem`,
          xWeeks: `há ${count}sem`,
          aboutXMonths: `há ${count}m`,
          xMonths: `há ${count}m`,
          aboutXYears: `há ${count}a`,
          xYears: `há ${count}a`,
          overXYears: `há ${count}a`,
          almostXYears: `há ${count}a`,
        };

        return shortFormats[token] || "";
      },
    },
  });
}
