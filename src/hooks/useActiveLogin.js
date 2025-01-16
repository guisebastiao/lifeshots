import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { activeLogin } from "@/api/services/activeLogin";

export const useActiveLogin = () => {
  const activeLoginMutation = useMutation({
    mutationFn: activeLogin,
    onError: ({ response }) => {
      toast.error(
        response?.data?.errors[0] || "Erro ao fazer o ativar o login."
      );
    },
  });

  return { activeLoginMutation };
};
