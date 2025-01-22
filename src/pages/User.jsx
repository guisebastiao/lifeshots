import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useParams, useNavigate } from "react-router-dom";
import {
  EllipsisVertical,
  Heart,
  MessageCircle,
  ShieldBan,
  UserRoundPlus,
  ShieldX,
  UserRoundX,
  UserRoundSearch,
  Lock,
  Camera,
  UsersRound,
} from "lucide-react";

import { useUser } from "@/hooks/useUser";
import { usePost } from "@/hooks/usePost";
import { useBlock } from "@/hooks/useBlock";
import { useFollow } from "@/hooks/useFollow";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/Loading";
import { Post } from "@/components/Post";

export const User = () => {
  const { username } = JSON.parse(localStorage.getItem("auth"));
  const [type, setType] = useState(null);

  const { userId } = useParams();
  const navigate = useNavigate();

  const { getUser } = useUser();
  const { blockUser } = useBlock();
  const { createFollow, getAllFollows } = useFollow();
  const { getAllPosts } = usePost();

  const { data: userData, isLoading: loadingUser } = getUser({ userId });

  const { mutate: mutateBlock, isPending: pendingBlock } = blockUser();
  const { mutate: mutateFollow, isPending: pendingFollow } = createFollow();
  const {
    data: postData,
    isLoading: loadingPost,
    fetchNextPage,
    hasNextPage,
  } = getAllPosts({ userId });
  const { data: followData, isLoading: loadingFollow } = getAllFollows({
    userId,
    type,
  });

  const handleBlock = ({ blocked }) => {
    const data = { blocked };
    mutateBlock({ data });
  };

  const handleFollow = ({ userId }) => {
    const data = { userId };
    mutateFollow({ data });
  };

  const handleNavigate = ({ userId }) => {
    const { username } = JSON.parse(localStorage.getItem("auth"));
    document.body.style.pointerEvents = "auto";

    if (username.toLowerCase() === userId.toLowerCase().trim()) {
      navigate("/profile");
    } else {
      navigate(`/user/${userId}`);
    }
  };

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <main className="relative w-screen h-screen flex items-center justify-center">
      <section className=" absolute top-14 max-w-md w-full h-container flex flex-col items-center justify-start pt-5 px-4 gap-2 overflow-y-scroll">
        {loadingUser ? (
          <Loading />
        ) : !userData ? (
          <div className="text-center">
            <div className="w-14 h-14 rounded-full border border-white flex items-center justify-center">
              <UserRoundSearch strokeWidth={1} />
            </div>
            <span className="text-xl font-black">
              {username} não está em LifeShots
            </span>
          </div>
        ) : (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger className="absolute right-2 top-3">
                <EllipsisVertical size={22} />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => handleBlock({ blocked: userData.username })}>
                  {userData.isBlockedUser ? (
                    <>
                      {pendingBlock ? (
                        <Loading className="w-4 h-4" />
                      ) : (
                        <ShieldX size={18} />
                      )}
                      <span>Desbloquear</span>
                    </>
                  ) : (
                    <>
                      {pendingBlock ? (
                        <Loading className="w-4 h-4" />
                      ) : (
                        <ShieldBan size={18} />
                      )}
                      <span>Bloquear</span>
                    </>
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleFollow({ userId: userData.username })}>
                  {userData.followingAccount ? (
                    <>
                      {pendingFollow ? (
                        <Loading className="w-4 h-4" />
                      ) : (
                        <UserRoundX size={18} />
                      )}
                      <span>Parar de Seguir</span>
                    </>
                  ) : (
                    <>
                      {pendingFollow ? (
                        <Loading className="w-4 h-4" />
                      ) : (
                        <UserRoundPlus size={18} />
                      )}
                      <span>Seguir</span>
                    </>
                  )}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Avatar className="w-24 h-24 border-4 border-zinc-700">
              <AvatarImage
                src={userData.profilePicture}
                alt="profile-picture"
              />
              <AvatarFallback>
                <img src="/notUserPicture.png" alt="user-not-picture" />
              </AvatarFallback>
            </Avatar>
            <h1 className="text-lg font-bold text-zinc-50">
              {userData.username}
            </h1>
            <span className="text-sm text-zinc-400">
              {userData.name + " " + userData.surname}
            </span>
            <p className="text-zinc-300 text-center w-full text-[13px] font-medium py-2">
              {userData.bio}
            </p>
            <div className="w-full flex justify-evenly gap-2 pb-4">
              <Dialog>
                <DialogTrigger
                  disabled={
                    (userData.privateAccount && !userData.followedAccount) ||
                    userData.isBlockedUser
                  }>
                  <div className="flex flex-col items-center cursor-pointer">
                    <span className="text-base text-zinc-100 font-semibold">
                      {userData.amountPosts}
                    </span>
                    <span className="text-xs text-zinc-300">Publicações</span>
                  </div>
                </DialogTrigger>
                <DialogContent
                  className="flex flex-col h-[88%] rounded-lg px-5"
                  posClose="right-3 top-[11px]">
                  <DialogHeader>
                    <div className="p-4">
                      <DialogTitle className="text-center">
                        Publicações
                      </DialogTitle>
                      <DialogDescription />
                    </div>
                  </DialogHeader>
                  <div className="flex-1 overflow-y-scroll">
                    {!loadingPost &&
                      postData?.pages.map((page) =>
                        page.posts.map((post) => (
                          <Post key={post.id} post={post} />
                        ))
                      )}
                  </div>
                  {hasNextPage && (
                    <div
                      ref={ref}
                      className="py-1 flex items-center justify-center">
                      <Loading />
                    </div>
                  )}
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger
                  disabled={
                    (userData.privateAccount && !userData.followedAccount) ||
                    userData.isBlockedUser
                  }
                  onClick={() => setType("followers")}>
                  <div className="flex flex-col items-center cursor-pointer">
                    <span className="text-base text-zinc-100 font-semibold">
                      {userData.amountFollowers}
                    </span>
                    <span className="text-xs text-zinc-300">Seguidores</span>
                  </div>
                </DialogTrigger>
                <DialogContent
                  className="h-[88%] flex flex-col gap-2 rounded-lg px-4"
                  posClose="right-3 top-[11px]">
                  <DialogHeader>
                    <div className="p-4">
                      <DialogTitle className="text-center">
                        Seguidores
                      </DialogTitle>
                      <DialogDescription />
                    </div>
                  </DialogHeader>
                  {loadingFollow ? (
                    <Loading className="self-center" />
                  ) : (
                    followData &&
                    type === "followers" &&
                    followData.pages.map((page) =>
                      page.followers.length <= 0 ? (
                        <div
                          key={userId}
                          className="flex items-center justify-center flex-col gap-2">
                          <div className="w-12 h-12 flex items-center justify-center border border-white rounded-full">
                            <UsersRound size={22} strokeWidth={1} />
                          </div>
                          <span className="text-sm">
                            Esse perfil não possui nenhum seguidor ainda
                          </span>
                        </div>
                      ) : (
                        page.followers.map((following) => (
                          <div
                            key={following.username}
                            className="flex flex-col gap-2">
                            <div className="w-full flex items-center gap-2 px-1 py-2 bg-zinc-900 rounded-md border">
                              <div className="flex w-full gap-2">
                                <Avatar className="w-10 h-10">
                                  <AvatarImage
                                    src={following?.profilePicture}
                                    alt="profile-picture"
                                  />
                                  <AvatarFallback>
                                    <img
                                      src="/notUserPicture.png"
                                      alt="user-not-picture"
                                    />
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col">
                                  <span className="text-sm">
                                    {following.username}
                                  </span>
                                  <div className="flex gap-2">
                                    <div className="flex gap-1 items-center">
                                      <span className="text-[11px] text-zinc-300 font-bold">
                                        {following.amountPosts}
                                      </span>
                                      <span className="text-[10px] text-zinc-400">
                                        {following.amountPosts === 1
                                          ? "Publicação"
                                          : "Publicações"}
                                      </span>
                                    </div>
                                    <div className="flex gap-1 items-center">
                                      <span className="text-[11px] text-zinc-300 font-bold">
                                        {following.amountFollowers}
                                      </span>
                                      <span className="text-[10px] text-zinc-400">
                                        {following.amountFollowers === 1
                                          ? "Seguidor"
                                          : "Seguidores"}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <Button
                                className="px-2 h-7 text-xs font-bold mr-2"
                                onClick={() =>
                                  handleNavigate({ userId: following.username })
                                }>
                                Ver Perfil
                              </Button>
                            </div>
                          </div>
                        ))
                      )
                    )
                  )}
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger
                  disabled={
                    (userData.privateAccount && !userData.followedAccount) ||
                    userData.isBlockedUser
                  }
                  onClick={() => setType("following")}>
                  <div className="flex flex-col items-center cursor-pointer">
                    <span className="text-base text-zinc-100 font-semibold">
                      {userData.amountFollowing}
                    </span>
                    <span className="text-xs text-zinc-300">Seguindo</span>
                  </div>
                </DialogTrigger>
                <DialogContent
                  className="h-[88%] flex flex-col gap-2 rounded-lg px-4"
                  posClose="right-3 top-[11px]">
                  <DialogHeader>
                    <div className="p-4">
                      <DialogTitle className="text-center">
                        Seguindo
                      </DialogTitle>
                      <DialogDescription />
                    </div>
                  </DialogHeader>
                  {loadingFollow ? (
                    <Loading className="self-center" />
                  ) : (
                    followData &&
                    type === "following" &&
                    followData.pages.map((page) =>
                      page.following.length <= 0 ? (
                        <div
                          key={userId}
                          className="flex items-center justify-center flex-col gap-2">
                          <div className="w-12 h-12 flex items-center justify-center border border-white rounded-full">
                            <UsersRound size={22} strokeWidth={1} />
                          </div>
                          <span className="text-sm">
                            Esse perfil ainda não segue ninguém
                          </span>
                        </div>
                      ) : (
                        page.following.map((followers) => (
                          <div
                            key={followers.username}
                            className="flex flex-col overflow-y-scroll gap-2">
                            <div className="w-full flex items-center gap-2 px-1 py-2 bg-zinc-900 rounded-md border">
                              <div className="flex w-full gap-2">
                                <Avatar className="w-10 h-10">
                                  <AvatarImage
                                    src={followers.profilePicture}
                                    alt="profile-picture"
                                  />
                                  <AvatarFallback>
                                    <img
                                      src="/notUserPicture.png"
                                      alt="user-not-picture"
                                    />
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col">
                                  <span className="text-sm">
                                    {followers.username}
                                  </span>
                                  <div className="flex gap-2">
                                    <div className="flex gap-1 items-center">
                                      <span className="text-[11px] text-zinc-300 font-bold">
                                        {followers.amountPosts}
                                      </span>
                                      <span className="text-[10px] text-zinc-400">
                                        {followers.amountPosts === 1
                                          ? "Publicação"
                                          : "Publicações"}
                                      </span>
                                    </div>
                                    <div className="flex gap-1 items-center">
                                      <span className="text-[11px] text-zinc-300 font-bold">
                                        {followers.amountFollowers}
                                      </span>
                                      <span className="text-[10px] text-zinc-400">
                                        {followers.amountFollowers === 1
                                          ? "Seguidor"
                                          : "Seguidores"}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <Button
                                className="px-2 h-7 text-xs font-bold mr-2"
                                onClick={() =>
                                  handleProfile({
                                    username: followers.username,
                                  })
                                }>
                                Ver Perfil
                              </Button>
                            </div>
                          </div>
                        ))
                      )
                    )
                  )}
                </DialogContent>
              </Dialog>
            </div>
            {userData.isBlockedUser ? (
              <div className="w-full flex items-center flex-col gap-2 py-3">
                <div className="w-14 h-14 rounded-full border border-zinc-50 flex items-center justify-center">
                  <ShieldBan strokeWidth={1} />
                </div>
                <span className="text-xl font-semibold">
                  Você bloqueou esse usuário
                </span>
              </div>
            ) : userData.privateAccount && !userData.followedAccount ? (
              <div className="w-full flex items-center flex-col gap-2 py-3">
                <div className="w-14 h-14 rounded-full border border-zinc-50 flex items-center justify-center">
                  <Lock strokeWidth={1} />
                </div>
                <span className="text-xl font-semibold">
                  Esse perfil é privado
                </span>
              </div>
            ) : !loadingPost && postData.pages[0].posts.length <= 0 ? (
              <div className="w-full flex items-center flex-col gap-2 py-3">
                <div className="w-14 h-14 rounded-full border border-zinc-50 flex items-center justify-center">
                  <Camera strokeWidth={1} />
                </div>
                <span className="text-xl font-semibold">
                  Ainda não há nenhuma publicação
                </span>
              </div>
            ) : (
              <div className="w-full h-full pb-3">
                <div className="w-full grid grid-cols-3 gap-1">
                  {!loadingPost && postData.pages[0].posts.length > 0 && (
                    <>
                      {postData.pages.map((page) =>
                        page.posts.map((post) => (
                          <Dialog key={post.id}>
                            <DialogTrigger className="flex">
                              <div className="relative aspect-square w-full rounded-sm overflow-hidden group cursor-pointer">
                                <img
                                  src={post.postImages[0].url}
                                  alt="post-user"
                                  className="absolute w-full h-full object-cover"
                                />
                                <div className="absolute w-full h-full flex justify-center items-center bg-transparent-color opacity-0 group-hover:opacity-100 transition-all duration-300 gap-2">
                                  <div className="flex items-center gap-1">
                                    <span className="text-sm text-zinc-200 font-semibold">
                                      {post.amountLikes}
                                    </span>
                                    <Heart
                                      size={17}
                                      className="fill-zinc-200"
                                    />
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <span className="text-sm text-zinc-50 font-semibold">
                                      {post.amountComments}
                                    </span>
                                    <MessageCircle
                                      size={17}
                                      className="fill-zinc-200"
                                    />
                                  </div>
                                </div>
                              </div>
                            </DialogTrigger>
                            <DialogContent
                              className="h-[88%] rounded-lg px-5"
                              posClose="right-3 top-[11px]">
                              <DialogHeader>
                                <div className="p-4">
                                  <DialogTitle className="text-center">
                                    Publicações
                                  </DialogTitle>
                                  <DialogDescription />
                                </div>
                              </DialogHeader>
                              <div className="overflow-y-scroll">
                                <Post post={post} />
                              </div>
                            </DialogContent>
                          </Dialog>
                        ))
                      )}
                    </>
                  )}
                </div>
                {hasNextPage && (
                  <div
                    ref={ref}
                    className="py-1 flex items-center justify-center">
                    <Loading />
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
};
