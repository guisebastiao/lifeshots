import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

import { useLikePost } from "@/hooks/useLikePost";
import { useBlock } from "@/hooks/useBlock";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselDots,
} from "@/components/ui/carousel";
import {
  EllipsisVertical,
  Send,
  MessageCircle,
  ShieldOff,
  User,
  Trash,
  PencilRuler,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Drawer, DrawerTrigger, DrawerContent } from "@/components/ui/drawer";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ButtonLike } from "@/components/ButtonLike";
// import { Comment } from "@/components/Comment";
import { Loading } from "@/components/Loading";

export const Post = ({ post }) => {
  const { likePost, getLikesPost } = useLikePost();
  const { blockUser } = useBlock();

  const { mutate: mutateLikePost } = likePost();
  const { data, isLoading, fetchNextPage, hasNextPage } = getLikesPost({
    postId: post.id,
  });
  const { mutate: mutateBlock, isPending } = blockUser();

  const navigate = useNavigate();

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  const handleLike = ({ postId }) => {
    const data = { postId };
    mutateLikePost({ data });
  };

  const formatDistance = (date) => {
    return formatDistanceToNow(new Date(date), {
      addSuffix: true,
      locale: ptBR,
    });
  };

  const handleBlock = ({ blocked }) => {
    const data = { blocked };
    mutateBlock({ data });
  };

  const editPost = ({ postId }) => {
    console.log(postId);
  };

  const deletePost = ({ postId }) => {
    console.log(postId);
  };

  return (
    <section className="w-full flex flex-col">
      <div className="w-full flex py-2">
        <div className="w-full flex items-center gap-2 pl-1">
          <Avatar className="w-8 h-8">
            <AvatarImage src={post.author?.profilePicture} />
            <AvatarFallback>
              <img src="/notUserPicture.png" alt="user-not-picture" />
            </AvatarFallback>
          </Avatar>
          <span className="text-sm text-zinc-50">{post.author.username}</span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <EllipsisVertical size={20} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {post.isMyPost ? (
              <>
                <DropdownMenuItem onClick={() => editPost({ postId: post.id })}>
                  <PencilRuler size={18} />
                  <span>Editar</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => deletePost({ postId: post.id })}>
                  <Trash size={18} />
                  <span>Excluir</span>
                </DropdownMenuItem>
              </>
            ) : (
              <>
                <DropdownMenuItem
                  onClick={() => navigate(`/user/${post.author.username}`)}>
                  <User size={18} />
                  <span>Ver Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    handleBlock({ blocked: post.author.username })
                  }>
                  {isPending ? (
                    <Loading className="w-5 h-5 text-zinc-50 border-2" />
                  ) : (
                    <ShieldOff size={18} />
                  )}
                  <span>Bloquear</span>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Carousel>
        <CarouselContent className="relative aspect-square">
          {post.postImages.map((image) => (
            <CarouselItem key={image.id}>
              <img
                src={image.url}
                alt="post-image"
                className="absolute w-full h-full object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselDots />
      </Carousel>
      <div className="w-full flex py-3 justify-between">
        <div className="flex gap-4">
          <div className="flex items-center gap-1">
            <button onClick={() => handleLike({ postId: post.id })}>
              <ButtonLike isLiked={post.isLiked} />
            </button>
            <span className="text-zinc-200 text-[13px]">
              {post.amountLikes}
            </span>
          </div>
          <div>
            <div className="flex items-center gap-1">
              <Drawer>
                <DrawerTrigger asChild>
                  <button>
                    <MessageCircle size={22} className="text-zinc-50" />
                  </button>
                </DrawerTrigger>
                <DrawerContent className="flex items-center">
                  {/* <Comment postId={post.id} isMyPost={post.isMyPost} /> */}
                </DrawerContent>
              </Drawer>
              <span className="text-zinc-200 text-[13px]">
                {post.amountComments}
              </span>
            </div>
          </div>
          <button className="flex items-center">
            <Send size={20} className="text-zinc-50" />
          </button>
        </div>
        <span className="text-xs text-zinc-400">
          publicada {formatDistance(post.createdAt)}
        </span>
      </div>
      <p className="text-sm text-zinc-50 py-1">{post.content}</p>
      <Dialog>
        <DialogTrigger>
          {post.amountLikes >= 1 && (
            <div className="flex items-center gap-1 py-2 cursor-pointer">
              <Avatar className="w-6 h-6">
                <AvatarImage
                  src={post.likes[0].userLikedPost?.profilePicture}
                />
                <AvatarFallback>
                  <img src="/notUserPicture.png" alt="user-not-picture" />
                </AvatarFallback>
              </Avatar>
              <span className="text-zinc-400 text-xs">
                {post.amountLikes === 1 ? (
                  <>
                    Curtido por{" "}
                    <span className="text-zinc-300 text-xs font-semibold">
                      {post.likes[0].userLikedPost.username}
                    </span>
                  </>
                ) : (
                  <>
                    Curtido por{" "}
                    <span className="text-zinc-300 text-xs font-semibold">
                      {post.likes[0].userLikedPost.username}
                    </span>{" "}
                    e outras pessoas
                  </>
                )}
              </span>
            </div>
          )}
        </DialogTrigger>
        <DialogContent className="h-[88%]" posClose="right-3 top-2">
          <DialogHeader>
            <div className="py-3">
              <DialogTitle className="text-center">Curtidas</DialogTitle>
              <DialogDescription />
            </div>
          </DialogHeader>
          <div className="flex flex-col flex-1 overflow-y-scroll h-full gap-3 px-4 pt-3">
            {isLoading ? (
              <Loading className="w-5 h-5 text-zinc-50 border-2" />
            ) : (
              data.pages.map((page) =>
                page.likesPost.map((like) => (
                  <div key={like.id} className="flex items-center">
                    <div className="w-full flex items-center gap-2">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={like.userLikedPost.profilePicture} />
                        <AvatarFallback>
                          <img
                            src="/notUserPicture.png"
                            alt="user-not-picture"
                          />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col w-full">
                        <span className="text-sm text-zinc-50">
                          {like.userLikedPost.username}
                        </span>
                        <div className="flex gap-2">
                          <div className="h-4 flex items-center">
                            <span className="text-xs text-zinc-200 font-bold">
                              {like.userLikedPost.amountFollowers}
                            </span>
                            <span className="text-xs text-zinc-400 ml-1">
                              {like.userLikedPost.amountFollowers === 1
                                ? "Seguidor"
                                : "Seguidores"}
                            </span>
                          </div>
                          <div className="h-4 flex items-center">
                            <span className="text-xs text-zinc-200 font-bold">
                              {like.userLikedPost.amountPosts}
                            </span>
                            <span className="text-xs text-zinc-400 ml-1">
                              {like.userLikedPost.amountPosts === 1
                                ? "Publicação"
                                : "Publicações"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <EllipsisVertical size={20} />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          onClick={() =>
                            navigate(`/user/${like.userLikedPost.username}`)
                          }>
                          <User size={18} />
                          <span>Ver Perfil</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))
              )
            )}
            {hasNextPage && (
              <div ref={ref} className="flex items-center justify-center px-1">
                <Loading className="w-5 h-5 text-zinc-50 border-2" />
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};
