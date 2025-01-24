import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

import { GetAll } from "@/api/services/search";

export const useSearch = () => {
  const getSearch = () => {
    const [searchParams] = useSearchParams();
    const user = searchParams.get("search");

    return useInfiniteQuery({
      queryFn: ({ pageParam }) => GetAll({ pageParam, user }),
      queryKey: ["search", user],
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

  return { getSearch };
};
