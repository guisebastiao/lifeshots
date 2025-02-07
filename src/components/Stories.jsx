import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { useStories } from "@/hooks/useStories";

import { ModalStories } from "@/components/ModalStories";
import { ModalStory } from "@/components/ModalStory";
import { Loading } from "@/components/Loading";

export const Stories = () => {
  const { getAllStories, getUserStory } = useStories();

  const { data: story, isLoading: isLoadingStory } = getUserStory();
  const {
    data: stories,
    isLoading: isLoadingStories,
    fetchNextPage,
    hasNextPage,
  } = getAllStories();

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  if (isLoadingStory || isLoadingStories) {
    return null;
  }

  return (
    <section className="flex w-full overflow-x-scroll gap-1 p-2">
      <ModalStory story={story} />
      <ModalStories stories={stories} />
      {hasNextPage && (
        <div ref={ref} className="flex items-center justify-center px-1">
          <Loading />
        </div>
      )}
    </section>
  );
};
