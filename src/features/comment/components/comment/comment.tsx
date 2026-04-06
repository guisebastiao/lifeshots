import { CreateReplyComment } from "@/features/reply-comment/components/reply-comment/create-reply-comment";
import { ReplyComments } from "@/features/reply-comment/components/reply-comment/reply-comments";
import type { LikeCommentRequest } from "@/features/like-comment/types/like-comment-types";
import { DeleteComment } from "@/features/comment/components/comment/delete-comment";
import { UpdateComment } from "@/features/comment/components/comment/update-comment";
import { useLikeComment } from "@/features/like-comment/hooks/use-like-comment";
import type { CommentResponse } from "@/features/comment/types/comment-types";
import { handleFormatDistanceToNow } from "@/shared/utils/format-date";
import { formatNumber } from "@/shared/utils/format-numbers";
import { LikeButton } from "@/shared/components/like-button";
import { Button } from "@/shared/components/ui/button";
import { Avatar } from "@/shared/components/avatar";
import { EllipsisVertical } from "lucide-react";
import { forwardRef, useState } from "react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

interface CommentContentProps {
  comment: CommentResponse;
}

export const CommentContent = forwardRef<HTMLDivElement, CommentContentProps>(({ comment }, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  const { mutate } = useLikeComment();

  const handleLikeComment = () => {
    const data: LikeCommentRequest = { like: !comment.isLiked };
    mutate(
      { commentId: comment.id, data },
      {
        onError: ({ message }) => {
          toast.error(message);
        },
      },
    );
  };

  return (
    <div ref={ref} className="flex">
      <Avatar className="size-9 not-[md]:ml-3" profilePicture={comment.profile.profilePicture} />
      <div className="flex flex-col flex-1 px-2">
        <div className="flex justify-between items-center h-8">
          <div className="w-full flex items-center gap-1.5">
            <p className="text-[15px] font-semibold">{comment.profile.handle}</p>
            <span>&bull;</span>
            <span className="text-xs font-medium text-foreground/75">
              {handleFormatDistanceToNow({ date: comment.createdAt })}
            </span>
          </div>
          {comment.isOwner && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon-sm" className="mr-0.5" variant="ghost">
                  <EllipsisVertical />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <UpdateComment comment={comment} />
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <DeleteComment commentId={comment.id} />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        <div className="flex gap-4 items-start">
          <div className="w-full space-y-2">
            <p className="text-sm font-medium text-foreground/80 w-full">{comment.content}</p>
            <CreateReplyComment commentId={comment.id} />
          </div>
          <div className="size-9 aspect-square flex items-center flex-col gap-1 py-1">
            <LikeButton className="size-4" isLiked={comment.isLiked} onLike={handleLikeComment} />
            <span className="text-xs font-medium text-foreground/75">
              {formatNumber({ number: comment.likeCount })}
            </span>
          </div>
        </div>
        {comment.replyCommentCount > 0 && (
          <div className="flex flex-col gap-1 mt-1">
            <div className="flex items-center gap-1 ">
              <div className="w-5 h-px bg-border" />
              <button
                className="font-semibold text-foreground/75 text-[13px] cursor-pointer"
                onClick={() => setIsOpen((prev) => !prev)}
              >
                {isOpen ? (
                  <span>Mostrar menos</span>
                ) : (
                  <span>
                    Ver mais {comment.replyCommentCount} {comment.replyCommentCount === 1 ? "resposta" : "respostas"}
                  </span>
                )}
              </button>
            </div>
            <ReplyComments commentId={comment.id} data-open={isOpen} className="overflow-hidden data-open:h-auto h-0" />
          </div>
        )}
      </div>
    </div>
  );
});

CommentContent.displayName = "CommentContent";
