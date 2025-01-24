import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { Get } from "@/api/services/profilePicture";

export const useProfilePicture = () => {
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

  return { getProfilePicture };
};
