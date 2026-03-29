import type { LikePostRequest } from "@/features/like-post/types/like-post-types";
import { useLikePost } from "@/features/like-post/hooks/use-like-post";
import { handleFormatDistanceToNow } from "@/shared/utils/format-date";
import { Footer } from "@/features/comment/components/comment/footer";
import type { PostResponse } from "@/features/post/types/post-types";
import { Comment } from "@/features/comment/components/comment";
import { formatNumber } from "@/shared/utils/format-numbers";
import { LikeButton } from "@/components/like-button";
import { MessageCircle, Send } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";

interface ContentProps {
  post: PostResponse;
}

export const Content = ({ post }: ContentProps) => {
  const firstFocusableRef = useRef<HTMLDivElement | null>(null);

  const { mutate } = useLikePost();

  const handleLikePost = ({ like }: { like: boolean }) => {
    const data: LikePostRequest = { like };
    mutate(
      { postId: post.id, data },
      {
        onError: ({ message }) => {
          toast.error(message);
        },
      },
    );
  };

  return (
    <div>
      <div className="flex gap-2 px-1 py-2">
        <div className="flex items-center gap-1">
          <LikeButton isLiked={post.isLiked} onLike={() => handleLikePost({ like: !post.isLiked })} />
          <span className="font-semibold text-foreground/85">{formatNumber({ number: post.likeCount })}</span>
        </div>
        <div className="flex items-center gap-1">
          <Drawer>
            <DrawerTrigger asChild>
              <button type="button" className="cursor-pointer">
                <MessageCircle className="size-5 text-foreground/85" />
              </button>
            </DrawerTrigger>
            <DrawerContent
              ref={firstFocusableRef}
              onOpenAutoFocus={(e) => {
                e.preventDefault();
                firstFocusableRef.current?.focus();
              }}
              className="h-160!"
            >
              <DrawerHeader>
                <DrawerTitle>Comentários</DrawerTitle>
                <DrawerDescription />
              </DrawerHeader>
              <Comment postId={post.id} />
              <Footer postId={post.id} />
            </DrawerContent>
          </Drawer>
          <span className="font-semibold text-foreground/85">{formatNumber({ number: post.commentCount })}</span>
        </div>
        <div className="flex items-center gap-1">
          <button type="button" className="cursor-pointer">
            <Send className="size-5 text-foreground/85" />
          </button>
        </div>
      </div>
      <p className="font-medium px-0.5 text-foreground/90">{post.content}</p>
      <span className="block text-right text-xs font-medium text-foreground/75 mt-1.5">
        Publicada há {handleFormatDistanceToNow({ date: post.createdAt })}
      </span>
    </div>
  );
};
