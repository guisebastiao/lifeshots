import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { likeStory } from "@/api/services/likeStory";

export const useLikeStory = () => {
  const queryClient = useQueryClient();

  const createLikeStory = useMutation({
    mutationFn: likeStory,
    onSuccess: () => {
      queryClient.invalidateQueries(["get-user-story"]);
    },
    onError: ({ response }) => {
      toast.error(response?.data?.errors[0] || "Erro ao curtir um story.");
    },
  });

  return { createLikeStory };
};
