import { Button } from "@/components/ui/button";
import { twMerge } from "tailwind-merge";

export const NotificationAction = ({ description, ...rest }) => {
  return (
    <Button
      {...rest}
      size="xs"
      className={twMerge(
        "bg-zinc-700 hover:bg-zinc-800 rounded",
        rest.className
      )}>
      <span className="text-zinc-50">{description}</span>
    </Button>
  );
};
