import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { useGetPublications } from "@/features/profile/hooks/use-get-publications";
import { useCallback, useMemo, useRef } from "react";
import { LazyImage } from "@/components/lazy-image";
import { Spinner } from "@/components/ui/spinner";
import { Aperture } from "lucide-react";
import { toast } from "sonner";

interface PublicationsProps {
  profileId: string;
  setActivePostId: (activePostId: string) => void;
  setIsOpen: (isOpen: boolean) => void;
}

export const Publications = ({ profileId, setActivePostId, setIsOpen }: PublicationsProps) => {
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage, isError, error } = useGetPublications({
    profileId,
  });

  const posts = useMemo(() => data?.pages.flatMap((page) => page.data) ?? [], [data]);

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

  if (isLoading) {
    return (
      <div className="flex justify-center py-3">
        <Spinner />
      </div>
    );
  }

  if (!data || posts.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Aperture />
          </EmptyMedia>
          <EmptyTitle>Nenhuma Publicação</EmptyTitle>
          <EmptyDescription>Esse usuário ainda não fez nenhuma publicação.</EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-1">
      {posts.map((post, index) => {
        const isLast = index === posts.length - 1;

        return (
          <LazyImage
            key={post.id}
            src={post.postPictures[0].url}
            alt="post-image"
            className="aspect-square object-cover rounded-sm cursor-pointer"
            onClick={() => {
              setIsOpen(true);
              setActivePostId(post.id);
            }}
            ref={(el) => {
              if (isLast) lastItemRef(el);
            }}
          />
        );
      })}
    </div>
  );
};
