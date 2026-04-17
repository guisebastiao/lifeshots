import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/shared/components/ui/empty";
import { useFeedPost } from "@/features/feed/hooks/use-feed-post";
import { Spinner } from "@/shared/components/ui/spinner";
import { Post } from "@/features/post/components/post";
import { Aperture } from "lucide-react";
import { useMemo } from "react";
import { toast } from "sonner";

export const Feed = () => {
  const { data, isLoading, isError, error } = useFeedPost();

  const posts = useMemo(() => data?.pages.flatMap((page) => page.data) ?? [], [data]);

  if (isError) {
    toast.message(error.message);
  }

  return (
    <section className="max-w-2xl flex-1 w-full mx-auto p-3">
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Spinner />
        </div>
      ) : !data || posts.length === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Aperture />
            </EmptyMedia>
            <EmptyTitle>Nenhuma Publicação Disponivel</EmptyTitle>
            <EmptyDescription>Siga mais usuários para ver suas publicações e interagir com elas</EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <div className="overflow-y-auto space-y-7">
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      )}
    </section>
  );
};
