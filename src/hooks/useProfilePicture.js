import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { profilePicture } from "@/api/services/profilePicture";

export const useProfilePicture = () => {
  const getProfilePicture = useQuery({
    queryFn: profilePicture,
    queryKey: ["profile-picture"],
    onError: ({ response }) => {
      toast.error(response?.data?.errors[0] || "Erro buscar a foto de perfil.");
    },
  });

  return { getProfilePicture };
};
