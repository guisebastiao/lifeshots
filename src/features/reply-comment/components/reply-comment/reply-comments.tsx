import { UpdateReplyComment } from "@/features/reply-comment/components/reply-comment/update-reply-comment";
import { DeleteReplyComment } from "@/features/reply-comment/components/reply-comment/delete-reply-comment";
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from "@/components/ui/empty";
import { useLikeReplyComment } from "@/features/like-reply-comment/hooks/use-like-reply-comment";
import { useGetReplyComments } from "@/features/reply-comment/hooks/use-get-reply-comments";
import type { LikeCommentRequest } from "@/features/like-comment/types/like-comment-types";
import { handleFormatDistanceToNow } from "@/shared/utils/format-date";
import { formatNumber } from "@/shared/utils/format-numbers";
import { Aperture, EllipsisVertical } from "lucide-react";
import { LikeButton } from "@/components/like-button";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/avatar";
import { twMerge } from "tailwind-merge";
import { toast } from "sonner";
import { useMemo } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ReplyCommentsProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  commentId: string;
}

export const ReplyComments = ({ commentId, className, ...props }: ReplyCommentsProps) => {
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } = useGetReplyComments({ commentId });

  const { mutate } = useLikeReplyComment();

  const replyComments = useMemo(() => data?.pages.flatMap((page) => page.data) ?? [], [data]);

  const handleLikeReplyComment = ({ replyCommentId, data }: { replyCommentId: string; data: LikeCommentRequest }) => {
    mutate(
      { replyCommentId, data },
      {
        onError: ({ message }) => {
          toast.error(message);
        },
      },
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-3">
        <Spinner />
      </div>
    );
  }

  if (!data || replyComments.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Aperture />
          </EmptyMedia>
          <EmptyTitle>Nenhum resposta</EmptyTitle>
          <EmptyDescription>Nenhuma resposta disponivel para esse comentário.</EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <div className={twMerge("flex flex-col gap-2", className)} {...props}>
      {replyComments.map((replyComment) => (
        <div key={replyComment.id} className="flex">
          <Avatar className="size-8 ml-5" profilePicture={replyComment.profile.profilePicture} />
          <div className="flex flex-col flex-1 px-2">
            <div className="flex justify-between items-center">
              <div className="w-full flex items-center gap-1.5">
                <p className="text-sm font-semibold">{replyComment.profile.handle}</p>
                <span>&bull;</span>
                <span className="text-xs font-medium text-foreground/75">
                  {handleFormatDistanceToNow({ date: replyComment.createdAt })}
                </span>
              </div>
              {replyComment.isOwner && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon-sm" className="mr-0.5" variant="ghost">
                      <EllipsisVertical />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem asChild>
                      <UpdateReplyComment replyComment={replyComment} />
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <DeleteReplyComment replyCommentId={replyComment.id} />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
            <div className="flex gap-4 items-start">
              <p className="text-[13px] font-medium text-foreground/80 w-full">{replyComment.content}</p>
              <div className="size-9 aspect-square flex items-center flex-col gap-1 py-1">
                <LikeButton
                  className="size-4"
                  isLiked={replyComment.isLiked}
                  onLike={() =>
                    handleLikeReplyComment({
                      replyCommentId: replyComment.id,
                      data: { like: !replyComment.isLiked },
                    })
                  }
                />
                <span className="text-xs font-medium text-foreground/75">
                  {formatNumber({ number: replyComment.likeCount })}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
      {isFetchingNextPage && (
        <div className="flex justify-center py-3">
          <Spinner />
        </div>
      )}
      {hasNextPage && (
        <button className="font-semibold text-foreground/75 text-[13px] cursor-pointer" onClick={() => fetchNextPage()}>
          Mostrar mais
        </button>
      )}
    </div>
  );
};
