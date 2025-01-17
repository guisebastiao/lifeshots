import { ModalStories } from "@/components/ModalStories";
import { ModalStory } from "@/components/ModalStory";

import { useStories } from "@/hooks/useStories";

export const Stories = () => {
  const { getAllStories, getStory } = useStories();

  const { data: story, isLoading: isLoadingStory } = getStory;
  const { data: stories, isLoading: isLoadingStories } = getAllStories;

  if (isLoadingStory || isLoadingStories) {
    return null;
  }

  return (
    <section className="flex w-full pb-3 px-2 gap-1 overflow-x-scroll">
      <ModalStory data={story} />
      <ModalStories data={stories} />
    </section>
  );
};
