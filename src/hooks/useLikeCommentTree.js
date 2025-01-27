import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { Create } from "@/api/services/likeCommentTree";

export const useLikeCommentTree = () => {
  const queryClient = useQueryClient();

  const likeCommentTree = () => {
    return useMutation({
      mutationFn: ({ data }) => Create({ data }),
      onSuccess: () => {
        queryClient.invalidateQueries(["get-all-comment-tree"]);
      },
      onError: ({ response }) => {
        toast.error(
          response?.data?.errors[0] ||
            "Algo deu errado, tente novamente mais tarde."
        );
      },
    });
  };

  return { likeCommentTree };
};
