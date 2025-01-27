import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";
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

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ButtonLike } from "@/components/ButtonLike";
import { Loading } from "@/components/Loading";

export const CommentTree = ({ commentId, isMyPost }) => {
  const { username } = useAuth();

  const { getAllCommentTree } = useCommentTree();
  const { likeCommentTree } = useLikeCommentTree();
  const { blockUser } = useBlock();

  const { mutate: mutateLikeCommentTree } = likeCommentTree();
  const { mutate: mutateBlock, isPending: pendingBlock } = blockUser();
  const { data, fetchNextPage, isFetching, isLoading } = getAllCommentTree({
    commentId,
  });

  const navigate = useNavigate();

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
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <EllipsisVertical size={20} />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {commentTree.isMyCommentTree ? (
                            <>
                              <DropdownMenuItem>
                                <PencilRuler size={17} />
                                <span>Editar</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Trash size={17} />
                                <span>Excluir</span>
                              </DropdownMenuItem>
                            </>
                          ) : (
                            <>
                              {!!isMyPost && (
                                <DropdownMenuItem>
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
