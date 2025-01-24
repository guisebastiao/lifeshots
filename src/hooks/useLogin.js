import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { Create } from "@/api/services/login";

export const useLogin = () => {
  const login = () => {
    return useMutation({
      mutationFn: Create,
      onSuccess: (response) => {
        toast.success(response?.success[0]);
      },
      onError: ({ response }) => {
        toast.error(
          response?.data?.errors[0] ||
            "Algo deu errado, tente novamente mais tarde."
        );
      },
    });
  };

  return { login };
};
