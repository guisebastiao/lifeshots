import { recoverPasswordService } from "@/services/recover-password-service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useRecoverPassword = () => {
  const useForgotPassword = () => {
    return useMutation({
      mutationFn: recoverPasswordService.forgotPassword,
    });
  };

  const useRecover = () => {
    return useMutation({
      mutationFn: recoverPasswordService.recoverPassword,
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return {
    useForgotPassword,
    useRecover,
  };
};
