import { useInfiniteQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { GetAll } from "@/api/services/explorer";

export const useExplorer = () => {
  const getAllExplorer = () => {
    return useInfiniteQuery({
      queryFn: ({ pageParam }) => GetAll({ pageParam }),
      queryKey: ["get-explorer"],
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.paging.next,
      onError: ({ response }) => {
        toast.error(
          response?.data?.errors[0] ||
            "Algo deu errado, tente novamente mais tarde."
        );
      },
    });
  };

  return { getAllExplorer };
};
