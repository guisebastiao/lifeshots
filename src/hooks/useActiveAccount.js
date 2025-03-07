import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { Create } from "@/api/services/activeAccount";

export const useActiveAccount = () => {
  const activeAccount = () => {
    return useMutation({
      mutationFn: ({ data }) => Create({ data }),
      onError: ({ response }) => {
        toast.error(
          response?.data?.errors[0] ||
            "Algo deu errado, tente novamente mais tarde."
        );
      },
    });
  };

  return { activeAccount };
};
