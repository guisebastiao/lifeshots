import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { activeAccount } from "@/api/services/activeAccount";

export const useActiveAccount = () => {
  const activeAccountMutation = useMutation({
    mutationFn: activeAccount,
    onError: ({ response }) => {
      toast.error(response?.data?.errors[0] || "Erro ao ativar a conta.");
    },
  });

  return { activeAccountMutation };
};
