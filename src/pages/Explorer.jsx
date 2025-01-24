import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Flame } from "lucide-react";

import { useExplorer } from "@/hooks/useExplorer";

import { Post } from "@/components/Post";
import { Loading } from "@/components/Loading";
import { RecommendedUser } from "@/components/RecommendUser";

export const Explorer = () => {
  const { getAllExplorer } = useExplorer();

  const { data, isLoading, fetchNextPage, hasNextPage } = getAllExplorer();

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <main className="relative w-screen h-screen flex items-center justify-center">
      <section className="absolute top-14 max-w-md w-full h-container overflow-y-scroll">
        <div className="flex h-full flex-col overflow-x-scroll gap-2 px-2">
          <RecommendedUser />
          {isLoading ? (
            <Loading className="w-5 h-5 text-zinc-50 border-2 self-center" />
          ) : data.pages[0].posts.length <= 0 ? (
            <div className="flex w-full flex-col text-center items-center gap-2 py-3">
              <div className="w-12 h-12 rounded-full border border-zinc-50 flex items-center justify-center">
                <Flame strokeWidth={1} />
              </div>
              <span className="text-sm text-zinc-300">
                Nada foi encontrado em alta nas últimas 24 horas.
              </span>
            </div>
          ) : (
            <div className="grid grid-cols-1 media-370:grid-cols-2 gap-2">
              {data.pages.map((page) =>
                page.posts.map((post) => <Post key={post.id} post={post} />)
              )}
            </div>
          )}
          {hasNextPage && (
            <div ref={ref} className="flex items-center justify-center py-1">
              <Loading />
            </div>
          )}
        </div>
      </section>
    </main>
  );
};
