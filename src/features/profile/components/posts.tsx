import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { useGetPublications } from "@/features/profile/hooks/use-get-publications";
import type { ProfileResponse } from "@/features/profile/types/profile-types";
import { Post } from "@/features/post/components/post";
import { useCallback, useMemo, useRef } from "react";
import { Spinner } from "@/components/ui/spinner";
import { Aperture } from "lucide-react";
import { toast } from "sonner";

interface PostsProps {
  profile: ProfileResponse;
  activePostId: string | null;
  setActivePostId: (activePostId: string | null) => void;
}

export const Posts = ({ profile, activePostId, setActivePostId }: PostsProps) => {
  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage, isError, error } = useGetPublications({
    profileId: profile.id,
  });

  const postRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const observer = useRef<IntersectionObserver | null>(null);

  const posts = useMemo(() => data?.pages.flatMap((page) => page.data) ?? [], [data]);

  const lastItemRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node) return;

      observer.current?.disconnect();

      observer.current = new IntersectionObserver(([entry]) => {
        if (!entry?.isIntersecting) return;
        if (hasNextPage && !isFetchingNextPage) fetchNextPage();
      });

      observer.current.observe(node);
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
    <div className="no-scrollbar overflow-y-auto space-y-7">
      {posts.map((post, index) => {
        const isLast = index === posts.length - 1;

        return (
          <div
            key={post.id}
            className="relative"
            ref={(el) => {
              postRefs.current[post.id] = el;

              if (post.id === activePostId && el) {
                el.scrollIntoView({
                  behavior: "auto",
                  block: "start",
                });

                setActivePostId(null);
              }

              if (isLast) lastItemRef(el);
            }}
          >
            <Post post={post} />
          </div>
        );
      })}
      {isFetchingNextPage && (
        <div className="flex justify-center py-3">
          <Spinner />
        </div>
      )}
    </div>
  );
};
