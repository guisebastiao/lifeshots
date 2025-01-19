import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { Create } from "@/api/services/activeLogin";

export const useActiveLogin = () => {
  const activeLogin = () => {
    return useMutation({
      mutationFn: Create,
      onError: ({ response }) => {
        toast.error(response?.data?.errors[0]);
      },
    });
  };

  return { activeLogin };
};
