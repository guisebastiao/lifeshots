import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/shared/components/ui/empty";
import { useSearchProfile } from "@/features/profile/hooks/use-search-profile";
import { SearchForm } from "@/features/search/components/search-form";
import { PARAM_NAME } from "@/features/search/constants/contants";
import { Profile } from "@/features/search/components/profile";
import { Spinner } from "@/shared/components/ui/spinner";
import { useCallback, useMemo, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { UserRoundX } from "lucide-react";
import { toast } from "sonner";

export const Search = () => {
  const [param, setParam] = useSearchParams();

  const search = param.get(PARAM_NAME) ?? "";

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage, isError, error } = useSearchProfile({
    search,
  });

  const profiles = useMemo(() => data?.pages.flatMap((page) => page.data) ?? [], [data]);
  const hasSearch = search.length > 0;

  const observer = useRef<IntersectionObserver | null>(null);

  const lastItemRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetchingNextPage) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, hasNextPage, fetchNextPage],
  );

  if (isError) {
    toast.error(error.message);
  }

  return (
    <section className="max-w-2xl w-full flex-1 mx-auto p-3">
      <header className="w-full">
        <h1 className="text-base font-medium tracking-tight text-balance">Pesquisar</h1>
      </header>
      <SearchForm param={param} setParam={setParam} isLoading={isLoading} />
      <div className="no-scrollbar">
        {isLoading ? (
          <div className="flex justify-center items-center py-3">
            <Spinner />
          </div>
        ) : hasSearch && profiles.length === 0 ? (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <UserRoundX />
              </EmptyMedia>
              <EmptyTitle>Nenhum Usuário Encontrado</EmptyTitle>
              <EmptyDescription>
                Não foi possível achar nenhum usuário com o nome de perfil <strong>{search}</strong>
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <div>
            {profiles.map((profile, index) => {
              const isLast = index === profiles.length - 1;
              return <Profile key={profile.id} ref={isLast ? lastItemRef : undefined} profile={profile} />;
            })}
            {isFetchingNextPage && (
              <div className="flex justify-center py-3">
                <Spinner />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
