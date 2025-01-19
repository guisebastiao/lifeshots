import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { Create, Update } from "@/api/services/resetPassword";

export const useResetPassword = () => {
  const createReset = () => {
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

  const updatePassword = () => {
    return useMutation({
      mutationFn: Update,
      onSuccess: ({ response }) => {
        toast.success(response?.data.success[0]);
      },
      onError: ({ response }) => {
        toast.error(response?.data?.errors[0]);
      },
    });
  };

  return { createReset, updatePassword };
};
