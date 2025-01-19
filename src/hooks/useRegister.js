import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { Create } from "@/api/services/register";

export const useRegister = () => {
  const register = () => {
    return useMutation({
      mutationFn: Create,
      onSuccess: ({ response }) => {
        toast.success(response?.data?.success[0]);
      },
      onError: ({ response }) => {
        toast.error(response?.data?.errors[0]);
      },
    });
  };

  return { register };
};
