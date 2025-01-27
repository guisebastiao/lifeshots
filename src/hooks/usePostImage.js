import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { Delete } from "@/api/services/postImage";

export const usePostImage = () => {
  const queryClient = useQueryClient();

  const deletePostImage = () => {
    return useMutation({
      mutationFn: ({ postImageId }) => Delete({ postImageId }),
      onError: ({ response }) => {
        toast.error(
          response?.data?.errors[0] ||
            "Algo deu errado, tente novamente mais tarde."
        );
      },
      onSuccess: (response) => {
        queryClient.invalidateQueries(["post", "get-all-posts"]);
        toast.success(response?.success[0]);
      },
    });
  };

  return { deletePostImage };
};
