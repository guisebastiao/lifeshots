import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

import { useCommentTree } from "@/hooks/useCommentTree";
import { useLikeCommentTree } from "@/hooks/useLikeCommentTree";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ButtonLike } from "@/components/ButtonLike";
import { Loading } from "@/components/Loading";

export const CommentTree = ({ commentId }) => {
  const { getAllCommentTree } = useCommentTree();
  const { likeCommentTree } = useLikeCommentTree();

  const { data, fetchNextPage, isFetching, isLoading } = getAllCommentTree({
    commentId,
  });
  const { mutate: mutateLikeCommentTree } = likeCommentTree();

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
                          src={commentTree.userCommentsTree.profilePicture}
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
