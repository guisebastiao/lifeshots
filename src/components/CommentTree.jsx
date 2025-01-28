import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ptBR } from "date-fns/locale";
import {
  EllipsisVertical,
  PencilRuler,
  Trash,
  User,
  ShieldBan,
} from "lucide-react";

import { useAuth } from "@/context/AuthProvider";

import { useCommentTree } from "@/hooks/useCommentTree";
import { useLikeCommentTree } from "@/hooks/useLikeCommentTree";
import { useBlock } from "@/hooks/useBlock";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ButtonLike } from "@/components/ButtonLike";
import { Loading } from "@/components/Loading";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
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

import { editCommentTreeSchema } from "@/schemas/editCommentTreeSchema";

export const CommentTree = ({ commentId, isMyPost }) => {
  const editCommentTreeForm = useForm({
    resolver: zodResolver(editCommentTreeSchema),
    mode: "onSubmit",
    defaultValues: {
      content: "",
    },
  });

  const { username } = useAuth();

  const [commentTreeId, setCommentTreeId] = useState(null);
  const [modalDeleteCommentIsOpen, setModalDeleteCommentIsOpen] =
    useState(null);
  const [modalUpdateCommentIsOpen, setModalUpdateCommentIsOpen] =
    useState(null);
  const [commentContent, setCommentContent] = useState(null);

  const { getAllCommentTree, updateCommentTree, deleteCommentTree } =
    useCommentTree();
  const { likeCommentTree } = useLikeCommentTree();
  const { blockUser } = useBlock();

  const { mutate: mutateLikeCommentTree } = likeCommentTree();
  const { mutate: mutateBlock, isPending: pendingBlock } = blockUser();
  const { data, fetchNextPage, isFetching, isLoading } = getAllCommentTree({
    commentId,
  });
  const { mutate: mutateUpdateCommentFn, isPending: updatePending } =
    updateCommentTree();
  const { mutate: mutateDeleteComment, isPending: deletePending } =
    deleteCommentTree();

  const navigate = useNavigate();

  useEffect(() => {
    if (commentContent) {
      editCommentTreeForm.setValue("content", commentContent);
    }
  }, [commentContent]);

  const updateCommentTreeFn = () => {
    const { content } = editCommentTreeForm.getValues();
    const data = { content };
    mutateUpdateCommentFn({ data, commentTreeId });
    setModalUpdateCommentIsOpen(false);
  };

  const deleteCommentTreeFn = ({ commentTreeId }) => {
    mutateDeleteComment({ commentTreeId });
    setModalDeleteCommentIsOpen(false);
  };

  const handleLikeTree = ({ commentTreeId }) => {
    const data = { commentTreeId };
    mutateLikeCommentTree({ data });
  };

  const formatDistance = (date) => {
    return formatDistanceToNow(new Date(date), {
      addSuffix: true,
      locale: ptBR,
    });
  };

  const handleNavigate = ({ userId }) => {
    document.body.style.pointerEvents = "auto";

    if (username.toLowerCase() === userId.toLowerCase().trim()) {
      navigate("/profile");
    } else {
      navigate(`/user/${userId}`);
    }
  };

  const handleBlock = ({ blocked }) => {
    const data = { blocked };
    mutateBlock({ data });
  };

  const handleNext = () => {
    fetchNextPage();
  };

  return (
    <div className="flex w-full flex-col gap-1">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {data.pages.map((page, index) => (
            <div key={index} className="flex flex-col">
              {page.commentsTree.map((commentTree) => (
                <div
                  key={commentTree.id}
                  className="flex flex-col w-full px-5 py-2">
                  <div className="flex">
                    <div className="flex items-center w-full gap-1">
                      <Avatar className="w-6 h-6">
                        <AvatarImage
                          src={commentTree.userCommentsTree.profilePicture?.url}
                          alt="profile-picture"
                        />
                        <AvatarFallback>
                          <img
                            src="/notUserPicture.png"
                            alt="user-not-picture"
                          />
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs">
                        {commentTree.userCommentsTree.username}
                      </span>
                      <span className="text-[11px] text-zinc-400 pl-2">
                        {formatDistance(commentTree.createdAt)}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() =>
                          handleLikeTree({
                            commentTreeId: commentTree.id,
                          })
                        }>
                        <ButtonLike isLiked={commentTree.isLiked} size={14} />
                        <span className="text-[9px] text-zinc-50">
                          {commentTree.amountLikes}
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
                            <Form {...editCommentTreeForm}>
                              <form
                                className="w-full space-y-3"
                                onSubmit={editCommentTreeForm.handleSubmit(
                                  updateCommentTreeFn
                                )}>
                                <FormField
                                  control={editCommentTreeForm.control}
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
                                  <Button
                                    type="submit"
                                    disabled={updatePending}>
                                    {updatePending ? (
                                      <>
                                        <Loading />
                                        <span>Salvando</span>
                                      </>
                                    ) : (
                                      <span className="font-semibold">
                                        Salvar
                                      </span>
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
                            <AlertDialogTitle>
                              Excluir Comentário
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Você tem certeza que deseja excluir esse
                              comentário?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() =>
                                deleteCommentTreeFn({ commentTreeId })
                              }
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
                          <EllipsisVertical size={20} />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {commentTree.isMyCommentTree ? (
                            <>
                              <DropdownMenuItem
                                onClick={() => {
                                  setModalUpdateCommentIsOpen(true);
                                  setCommentTreeId(commentTree.id);
                                  setCommentContent(commentTree.content);
                                }}>
                                <PencilRuler size={17} />
                                <span>Editar</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setModalDeleteCommentIsOpen(true);
                                  setCommentTreeId(commentTree.id);
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
                                    setCommentTreeId(commentTree.id);
                                  }}>
                                  <Trash size={17} />
                                  <span>Excluir</span>
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem
                                onClick={() =>
                                  handleNavigate({
                                    userId:
                                      commentTree.userCommentsTree.username,
                                  })
                                }>
                                <User size={17} />
                                <span>Ver perfil</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  handleBlock({
                                    blocked:
                                      commentTree.userCommentsTree.username,
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
                  </div>
                  <p className="text-xs py-1 w-full">{commentTree.content}</p>
                </div>
              ))}
            </div>
          ))}
          {data.pages[data.pages.length - 1].paging.next && (
            <button
              className="text-xs font-light text-zinc-200 self-center mt-2"
              onClick={handleNext}
              disabled={isFetching}>
              {isFetching ? <Loading /> : "Mostrar mais"}
            </button>
          )}
        </>
      )}
    </div>
  );
};
