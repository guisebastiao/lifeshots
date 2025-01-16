import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { login } from "@/api/services/login";

export const useLogin = () => {
  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: ({ response }) => {
      toast.success(
        response?.data?.success[0] || "Um código foi enviado para seu e-mail."
      );
    },
    onError: ({ response }) => {
      toast.error(response?.data?.errors[0] || "Erro ao fazer o login.");
    },
  });

  return loginMutation;
};
