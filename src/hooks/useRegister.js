import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { register } from "@/api/services/register";

export const useRegister = () => {
  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: ({ response }) => {
      toast.success(
        response?.data?.success[0] || "Você precisa verificar sua conta."
      );
    },
    onError: ({ response }) => {
      toast.error(response?.data?.errors[0] || "Erro ao cadastrar.");
    },
  });

  return { registerMutation };
};
