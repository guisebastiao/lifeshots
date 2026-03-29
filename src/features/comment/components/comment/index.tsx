import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { CommentContent } from "@/features/comment/components/comment/comment";
import { useGetComments } from "@/features/comment/hooks/use-get-comments";
import { useCallback, useMemo, useRef } from "react";
import { Spinner } from "@/components/ui/spinner";
import { MessageCircleOff } from "lucide-react";
import { toast } from "sonner";

interface CommentProps {
  postId: string;
}

export const Comment = ({ postId }: CommentProps) => {
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage, isError, error } = useGetComments({
    postId,
  });

  const observer = useRef<IntersectionObserver | null>(null);

  const comments = useMemo(() => data?.pages.flatMap((page) => page.data) ?? [], [data]);

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
      <div className="w-full flex justify-center py-3">
        <Spinner />
      </div>
    );
  }

  if (!data || comments.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <MessageCircleOff />
          </EmptyMedia>
          <EmptyTitle>Nenhum comentário</EmptyTitle>
          <EmptyDescription>Essa publicação não possui nenhum comentário.</EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <div className="max-w-xl w-full mx-auto no-scrollbar overflow-y-auto space-y-3">
      {comments.map((comment, index) => {
        const isLast = index === comments.length - 1;
        return (
          <CommentContent
            ref={(el) => {
              if (isLast) lastItemRef(el);
            }}
            key={comment.id}
            comment={comment}
          />
        );
      })}
      {isFetchingNextPage && (
        <div className="flex justify-center py-2">
          <Spinner />
        </div>
      )}
    </div>
  );
};
