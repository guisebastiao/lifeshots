import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  createResetPassword,
  updatePassword,
} from "@/api/services/resetPassword";

export const useResetPassword = () => {
  const createReset = useMutation({
    mutationFn: createResetPassword,
    onSuccess: ({ response }) => {
      toast.success(
        response?.data?.success[0] ||
          "Um email foi enviado para trocar sua senha, por favor, verifique seu email"
      );
    },
    onError: ({ response }) => {
      toast.error(response?.data?.errors[0] || "Erro ao tentar trocar a senha");
    },
  });

  const resetPassword = useMutation({
    mutationFn: updatePassword,
    onSuccess: ({ response }) => {
      toast.success(response?.data.success[0] || "Sua senha foi atualizada");
    },
    onError: ({ response }) => {
      toast.error(
        response?.data?.errors[0] ||
          "A troca de senha se expirou ou a sessão é invalida, clique para troca-la novamente."
      );
    },
  });

  return { createReset, resetPassword };
};
