import { SessionContext } from "@/app/providers/session-provider";
import { useContext } from "react";

export const useSession = () => {
  return useContext(SessionContext);
};
