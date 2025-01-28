import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { useForm } from "react-hook-form";
import { ptBR } from "date-fns/locale";
import {
  MessageCircleOff,
  SendHorizontal,
  EllipsisVertical,
  PencilRuler,
  Trash,
  User,
  ShieldBan,
} from "lucide-react";

import { useAuth } from "@/context/AuthProvider";

import { useComment } from "@/hooks/useComment";
import { useLikeComment } from "@/hooks/useLikeComment";
import { useBlock } from "@/hooks/useBlock";

import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/Loading";
import { ButtonLike } from "@/components/ButtonLike";
import { CommentTree } from "@/components/CommentTree";
import { CommentTreeData } from "@/components/CommentTreeData";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { commentSchema } from "@/schemas/commentSchema";
import { editCommentSchema } from "@/schemas/editCommentSchema";

export const Comment = ({ postId, isMyPost }) => {
  const commentForm = useForm({
    resolver: zodResolver(commentSchema),
    mode: "onSubmit",
    defaultValues: {
      content: "",
    },
  });

  const editCommentForm = useForm({
    resolver: zodResolver(editCommentSchema),
    mode: "onSubmit",
    defaultValues: {
      content: "",
    },
  });

  const { username } = useAuth();

  const [commentId, setCommentId] = useState(null);
  const [modalDeleteCommentIsOpen, setModalDeleteCommentIsOpen] =
    useState(null);
  const [modalUpdateCommentIsOpen, setModalUpdateCommentIsOpen] =
    useState(null);
  const [commentContent, setCommentContent] = useState(null);

  const { ref, inView } = useInView();
  const navigate = useNavigate();

  const { createComment, getAllComments, updateComment, deleteComment } =
    useComment();
  const { likeComment } = useLikeComment();
  const { blockUser } = useBlock();

  const { mutate: mutateComment, isPending: pendingComment } = createComment();
  const { mutate: mutateLikeComment } = likeComment();
  const { data, fetchNextPage, hasNextPage, isLoading } = getAllComments({
    postId,
  });
  const { mutate: mutateUpdateCommentFn, isPending: updatePending } =
    updateComment();
  const { mutate: mutateDeleteComment, isPending: deletePending } =
    deleteComment();

  const { mutate: mutateBlock, isPending: pendingBlock } = blockUser();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  useEffect(() => {
    if (commentContent) {
      editCommentForm.setValue("content", commentContent);
    }
  }, [commentContent]);

  const handleComment = () => {
    const { content } = commentForm.watch();
    const data = { content, postId };
    mutateComment({ data });
    commentForm.reset();
  };

  const updateCommentFn = () => {
    const { content } = editCommentForm.getValues();
    const data = { content };
    mutateUpdateCommentFn({ data, commentId });
    setModalUpdateCommentIsOpen(false);
  };

  const deleteCommentFn = ({ commentId }) => {
    mutateDeleteComment({ commentId });
    setModalDeleteCommentIsOpen(false);
  };

  const handleLike = ({ commentId }) => {
    const data = { commentId };
    mutateLikeComment({ data });
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

  const handleNavigate = ({ userId }) => {
    document.body.style.pointerEvents = "auto";

    if (username.toLowerCase() === userId.toLowerCase().trim()) {
      navigate("/profile");
    } else {
      navigate(`/user/${userId}`);
    }
  };

  return (
    <>
      <DrawerHeader>
        <DrawerTitle>Comentários</DrawerTitle>
        <DrawerDescription />
      </DrawerHeader>
      <div className="max-w-md w-full flex flex-col gap-4 overflow-y-scroll">
        {isLoading ? (
          <Loading />
        ) : data.pages[0].commentsPosts.length <= 0 ? (
          <div className="flex items-center justify-center flex-col gap-3">
            <div className="w-12 h-12 flex items-center justify-center border border-white rounded-full">
              <MessageCircleOff size={22} strokeWidth={1} />
            </div>
            <span className="text-sm font-light text-zinc-200">
              Essa publicação não possui nenhum comentário
            </span>
          </div>
        ) : (
          data.pages.map((pages) =>
            pages.commentsPosts.map((comment) => (
              <div key={comment.id} className="flex flex-col items-center px-2">
                <div className="flex w-full gap-1">
                  <div className="flex w-full items-center gap-1">
                    <Avatar className="w-8 h-8">
                      <AvatarImage
                        src={comment.userComments.profilePicture?.url}
                        alt="profile-picture"
                      />
                      <AvatarFallback>
                        <img src="/notUserPicture.png" alt="user-not-picture" />
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-zinc-50">
                      {comment.userComments.username}
                    </span>
                    <span className="text-xs text-zinc-400 pl-2">
                      {formatDistance(comment.createdAt)}
                    </span>
                  </div>
                  <button onClick={() => handleLike({ commentId: comment.id })}>
                    <ButtonLike isLiked={comment.isLiked} size={16} />
                    <span className="text-[10px] text-zinc-50">
                      {comment.amountLikes}
                    </span>
                  </button>
                  <Dialog
                    open={modalUpdateCommentIsOpen}
                    onOpenChange={setModalUpdateCommentIsOpen}>
                    <DialogTrigger asChild>
                      <button className="hidden" />
                    </DialogTrigger>
                    <DialogContent
                      className="media-448:h-auto px-4 py-5 flex flex-col justify-center"
                      posClose="right-3 top-[11px]">
                      <DialogHeader>
                        <DialogTitle>Editar Comentário</DialogTitle>
                        <DialogDescription>
                          Editar a descrição do seu comentário
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex w-full py-4">
                        <Form {...editCommentForm}>
                          <form
                            className="w-full space-y-3"
                            onSubmit={editCommentForm.handleSubmit(
                              updateCommentFn
                            )}>
                            <FormField
                              control={editCommentForm.control}
                              name="content"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      placeholder="Descrição"
                                      autoComplete="off"
                                      maxLength={300}
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage className="text-red-500" />
                                </FormItem>
                              )}
                            />
                            <div className="flex justify-end gap-2">
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsAlertUpdateOpen(false)}>
                                Cancelar
                              </Button>
                              <Button type="submit" disabled={updatePending}>
                                {updatePending ? (
                                  <>
                                    <Loading />
                                    <span>Salvando</span>
                                  </>
                                ) : (
                                  <span className="font-semibold">Salvar</span>
                                )}
                              </Button>
                            </div>
                          </form>
                        </Form>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <AlertDialog
                    open={modalDeleteCommentIsOpen}
                    onOpenChange={setModalDeleteCommentIsOpen}>
                    <AlertDialogTrigger asChild>
                      <button className="hidden" />
                    </AlertDialogTrigger>
                    <AlertDialogContent className="max-w-md">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Excluir Comentário</AlertDialogTitle>
                        <AlertDialogDescription>
                          Você tem certeza que deseja excluir esse comentário?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deleteCommentFn({ commentId })}
                          className="bg-red-500 hover:bg-red-600 text-white">
                          {deletePending ? (
                            <Loading className="w-4 h-4" />
                          ) : (
                            <span>Excluir</span>
                          )}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <EllipsisVertical size={22} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {comment.isMyComment ? (
                        <>
                          <DropdownMenuItem
                            onClick={() => {
                              setModalUpdateCommentIsOpen(true);
                              setCommentId(comment.id);
                              setCommentContent(comment.content);
                            }}>
                            <PencilRuler size={17} />
                            <span>Editar</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setModalDeleteCommentIsOpen(true);
                              setCommentId(comment.id);
                            }}>
                            <Trash size={17} />
                            <span>Excluir</span>
                          </DropdownMenuItem>
                        </>
                      ) : (
                        <>
                          {!!isMyPost && (
                            <DropdownMenuItem
                              onClick={() => {
                                setModalDeleteCommentIsOpen(true);
                                setCommentId(comment.id);
                              }}>
                              <Trash size={17} />
                              <span>Excluir</span>
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem
                            onClick={() => {
                              handleNavigate({
                                userId: comment.userComments.username,
                              });
                            }}>
                            <User size={17} />
                            <span>Ver perfil</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleBlock({
                                blocked: comment.userComments.username,
                              })
                            }>
                            {pendingBlock ? (
                              <Loading />
                            ) : (
                              <ShieldBan size={17} />
                            )}
                            <span>Bloquear</span>
                          </DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="relative flex w-full gap-2">
                  <p className="w-full text-sm text-zinc-50 py-2">
                    {comment.content}
                  </p>
                </div>
                <div className="flex justify-start items-center w-full gap-3">
                  <CommentTreeData commentId={comment.id} />
                  {comment.amountCommentTree > 0 && (
                    <button
                      className="self-start text-xs text-zinc-400"
                      onClick={() => setCommentId(comment.id)}>
                      Mostrar mais {comment.amountCommentTree}
                    </button>
                  )}
                </div>
                {comment.id === commentId && (
                  <CommentTree commentId={commentId} isMyPost={isMyPost} />
                )}
              </div>
            ))
          )
        )}
        {hasNextPage && (
          <div ref={ref} className="py-1 flex items-center justify-center">
            <Loading />
          </div>
        )}
      </div>
      <DrawerFooter className="max-w-md w-full bg-zinc-950 py-3">
        <Form {...commentForm}>
          <form
            onSubmit={commentForm.handleSubmit(handleComment)}
            className="flex gap-2 items-end">
            <FormField
              control={commentForm.control}
              name="content"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormMessage className="text-red-500" />
                  <FormControl>
                    <Input
                      placeholder="Adicionar um comentário..."
                      maxLength={300}
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={pendingComment}
              variant="secondary"
              className="w-9 h-9 px-0 py-0">
              {pendingComment ? (
                <Loading className="w-5 h-5 text-zinc-50 border-2" />
              ) : (
                <SendHorizontal />
              )}
            </Button>
          </form>
        </Form>
      </DrawerFooter>
    </>
  );
};
