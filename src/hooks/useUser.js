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
        toast.error(
          response?.data?.errors[0] ||
            "Algo deu errado, tente novamente mais tarde."
        );
      },
    });
  };

  const updatePrivateAccount = () => {
    return useMutation({
      mutationFn: ({ data }) => Update({ data }),
      onError: ({ response }) => {
        toast.error(
          response?.data?.errors[0] ||
            "Algo deu errado, tente novamente mais tarde."
        );
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["users"]);
      },
    });
  };

  const updateUser = () => {
    return useMutation({
      mutationFn: ({ data }) => Update({ data }),
      onError: ({ response }) => {
        toast.error(
          response?.data?.errors[0] ||
            "Algo deu errado, tente novamente mais tarde."
        );
      },
      onSuccess: (response) => {
        queryClient.invalidateQueries(["users"]);
        toast.success(response?.success[0]);
      },
    });
  };

  const deleteUser = () => {
    return useMutation({
      mutationFn: Delete,
      onError: ({ response }) => {
        toast.error(
          response?.data?.errors[0] ||
            "Algo deu errado, tente novamente mais tarde."
        );
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["users"]);
        toast.success(response?.success[0]);
      },
    });
  };

  return {
    getUser,
    updatePrivateAccount,
    updateUser,
    deleteUser,
  };
};
