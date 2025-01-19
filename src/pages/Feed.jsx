import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { Stories } from "@/components/Stories";
import { Loading } from "@/components/Loading";
import { Post } from "@/components/Post";

import { useFeed } from "@/hooks/useFeed";

export const Feed = () => {
  const { getAllFeed } = useFeed();
  const { data, isLoading, hasNextPage, fetchNextPage } = getAllFeed();

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <main className="relative w-screen h-screen flex items-center justify-center">
      <section className="absolute top-14 max-w-md w-full h-container">
        <Stories />
        <div className="flex flex-col items-center overflow-y-scroll space-y-4 px-4 pb-14">
          {isLoading ? (
            <Loading className="my-3" />
          ) : (
            <>
              {data.pages.map((page) =>
                page.posts.map((post) => <Post key={post.id} post={post} />)
              )}
              {hasNextPage && (
                <div
                  ref={ref}
                  className="py-1 flex items-center justify-center">
                  <Loading />
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
};
