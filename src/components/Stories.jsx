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
    <section className="flex w-full overflow-x-scroll gap-1 p-2">
      <ModalStory data={story} />
      <ModalStories data={stories} />
    </section>
  );
};
