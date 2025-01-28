import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { Get, Update } from "@/api/services/settings";

export const useSettings = () => {
  const queryClient = useQueryClient();

  const getSettings = () => {
    return useQuery({
      queryFn: Get,
      queryKey: ["settings"],
      onError: ({ response }) => {
        toast.error(
          response?.data?.errors[0] ||
            "Algo deu errado, tente novamente mais tarde."
        );
      },
    });
  };

  const updateSettings = () => {
    return useMutation({
      mutationFn: ({ data }) => Update({ data }),
      onError: ({ response }) => {
        toast.error(
          response?.data?.errors[0] ||
            "Algo deu errado, tente novamente mais tarde."
        );
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["settings"]);
      },
    });
  };

  return {
    getSettings,
    updateSettings,
  };
};
