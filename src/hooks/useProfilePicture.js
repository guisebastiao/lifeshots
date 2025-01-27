import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { Post, Get } from "@/api/services/profilePicture";

export const useProfilePicture = () => {
  const queryClient = useQueryClient();

  const sendProfilePicture = () => {
    return useMutation({
      mutationFn: ({ data }) => Post({ data }),
      onError: ({ response }) => {
        toast.error(
          response?.data?.errors[0] ||
            "Algo deu errado, tente novamente mais tarde."
        );
      },
      onSuccess: (response) => {
        queryClient.invalidateQueries(["get-profile-picture"]);
        toast.success(response?.success[0]);
      },
    });
  };

  const getProfilePicture = () => {
    return useQuery({
      queryFn: Get,
      queryKey: ["get-profile-picture"],
      onError: ({ response }) => {
        toast.error(
          response?.data?.errors[0] ||
            "Algo deu errado, tente novamente mais tarde."
        );
      },
    });
  };

  return { getProfilePicture, sendProfilePicture };
};
