import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { Get, Update, Delete } from "@/api/services/user";

export const useUser = () => {
  const queryClient = useQueryClient();

  const getUser = ({ userId }) => {
    return useQuery({
      queryFn: () => Get({ userId }),
      queryKey: ["users", userId],
      onError: ({ response }) => {
        toast.error(response?.data?.errors[0]);
      },
    });
  };

  const updateUser = () => {
    return useMutation({
      mutationFn: Update,
      onError: ({ response }) => {
        toast.error(response?.data?.errors[0]);
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["users"]);
      },
    });
  };

  const deleteUser = () => {
    return useMutation({
      mutationFn: Delete,
      onError: ({ response }) => {
        toast.error(response?.data?.errors[0]);
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["users"]);
      },
    });
  };

  return {
    getUser,
    updateUser,
    deleteUser,
  };
};
