import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { Create } from "@/api/services/likeStory";

export const useLikeStory = () => {
  const queryClient = useQueryClient();

  const likeStory = () => {
    return useMutation({
      mutationFn: Create,
      onSuccess: () => {
        queryClient.invalidateQueries(["get-user-story"]);
      },
      onError: ({ response }) => {
        toast.error(
          response?.data?.errors[0] ||
            "Algo deu errado, tente novamente mais tarde."
        );
      },
    });
  };

  return { likeStory };
};
