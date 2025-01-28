import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { Create, Update } from "@/api/services/resetPassword";

export const useResetPassword = () => {
  const createReset = () => {
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

  const updatePassword = () => {
    return useMutation({
      mutationFn: ({ data, tokenId }) => Update({ data, tokenId }),
      onError: ({ response }) => {
        toast.error(
          response?.data?.errors[0] ||
            "Algo deu errado, tente novamente mais tarde."
        );
      },
      onSuccess: (response) => {
        toast.success(response?.success[0]);
      },
    });
  };

  return { createReset, updatePassword };
};
