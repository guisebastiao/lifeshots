import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { Create } from "@/api/services/likeComment";

export const useLikeComment = () => {
  const queryClient = useQueryClient();

  const likeComment = () => {
    return useMutation({
      mutationFn: ({ data }) => Create({ data }),
      onSuccess: () => {
        queryClient.invalidateQueries(["get-all-comments"]);
      },
      onError: ({ response }) => {
        toast.error(
          response?.data?.errors[0] ||
            "Algo deu errado, tente novamente mais tarde."
        );
      },
    });
  };

  return { likeComment };
};
