import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bolt, Heart, MessageCircle } from "lucide-react";
import { useInView } from "react-intersection-observer";

import { useUser } from "@/hooks/useUser";
import { usePost } from "@/hooks/usePost";
import { useFollow } from "@/hooks/useFollow";

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

export const Profile = () => {
  const { username } = JSON.parse(localStorage.getItem("auth"));
  const [type, setType] = useState(null);

  const navigate = useNavigate();

  const { getUser } = useUser();
  const { getAllPosts } = usePost();
  const { getAllFollows } = useFollow();

  const { data: userData, isLoading: loadingUser } = getUser({
    userId: username,
  });
  const {
    data: postData,
    isLoading: loadingPost,
    fetchNextPage: fetchPosts,
    hasNextPage: hasPosts,
  } = getAllPosts({ userId: username });
  const {
    data: followData,
    isLoading: loadingFollow,
    fetchNextPage: fetchFollow,
    hasNextPage: hasFollow,
  } = getAllFollows({ userId: username, type });

  const handleNavigate = ({ userId }) => {
    document.body.style.pointerEvents = "auto";

    if (username.toLowerCase() === userId.toLowerCase().trim()) {
      navigate("/profile");
    } else {
      navigate(`/user/${userId}`);
    }
  };

  const { ref: refPosts, inView: inViewPosts } = useInView();
  const { ref: refFollow, inView: inViewFollow } = useInView();

  useEffect(() => {
    if (inViewPosts) {
      fetchPosts();
    }
  }, [inViewPosts]);

  useEffect(() => {
    if (inViewFollow) {
      fetchFollow();
    }
  }, [inViewFollow]);

  return (
    <main className="relative w-screen h-screen flex items-center justify-center">
      <section className="absolute top-14 flex max-w-md w-full h-container flex-col items-center justify-start pt-5 px-4 gap-2 overflow-y-scroll">
        {loadingUser ? (
          <Loading />
        ) : (
          <>
            <button className="absolute right-3 top-3">
              <Bolt size={22} />
            </button>
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
            <p className="text-zinc-300 w-full text-sm text-center font-medium py-2">
              {userData.bio}
            </p>
            <div className="w-full flex justify-evenly gap-2 pb-4">
              <Dialog>
                <DialogTrigger>
                  <div className="flex flex-col items-center cursor-pointer">
                    <span className="text-base text-zinc-100 font-semibold">
                      {userData.amountPosts}
                    </span>
                    <span className="text-xs text-zinc-300">Publicações</span>
                  </div>
                </DialogTrigger>
                <DialogContent
                  className="h-[88%] flex flex-col gap-2 rounded-lg px-5"
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
                      postData.pages.map((page) =>
                        page.posts.map((post) => (
                          <Post key={post.id} post={post} />
                        ))
                      )}
                  </div>
                  {hasPosts && (
                    <div
                      ref={refPosts}
                      className="py-1 flex items-center justify-center">
                      <Loading />
                    </div>
                  )}
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger onClick={() => setType("followers")}>
                  <div className="flex flex-col items-center cursor-pointer">
                    <span className="text-base text-zinc-100 font-semibold">
                      {userData.amountFollowers}
                    </span>
                    <span className="text-xs text-zinc-300">Seguidores</span>
                  </div>
                </DialogTrigger>
                <DialogContent
                  className="h-[88%] flex flex-col gap-2 rounded-lg px-5"
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
                    <Loading />
                  ) : (
                    followData &&
                    type === "followers" && (
                      <div className="flex flex-col gap-1">
                        {followData.pages.map((page) =>
                          page.followers.map((following) => (
                            <div
                              key={following.username}
                              className="flex flex-col overflow-y-scroll gap-2">
                              <div className="w-full flex items-center gap-2 px-1 py-1 bg-zinc-900 rounded-md border">
                                <div className="flex w-full gap-2">
                                  <Avatar className="w-10 h-10">
                                    <AvatarImage
                                      src={following.profilePicture}
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
                                    handleNavigate({
                                      userId: following.username,
                                    })
                                  }>
                                  Ver Perfil
                                </Button>
                              </div>
                            </div>
                          ))
                        )}
                        {hasFollow && (
                          <div
                            ref={refFollow}
                            className="py-1 flex items-center justify-center">
                            <Loading />
                          </div>
                        )}
                      </div>
                    )
                  )}
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger onClick={() => setType("following")}>
                  <div className="flex flex-col items-center cursor-pointer">
                    <span className="text-base text-zinc-100 font-semibold">
                      {userData.amountFollowing}
                    </span>
                    <span className="text-xs text-zinc-300">Seguindo</span>
                  </div>
                </DialogTrigger>
                <DialogContent
                  className="h-[88%] flex flex-col gap-2 rounded-lg px-5"
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
                    <Loading />
                  ) : (
                    followData &&
                    type === "following" && (
                      <div className="flex flex-col gap-1">
                        {followData.pages.map((page) =>
                          page.following.map((followers) => (
                            <div
                              key={followers.username}
                              className="flex flex-col overflow-y-scroll gap-2">
                              <div className="w-full flex items-center gap-2 px-1 py-1 bg-zinc-900 rounded-md border">
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
                                    handleNavigate({
                                      userId: followers.username,
                                    })
                                  }>
                                  Ver Perfil
                                </Button>
                              </div>
                            </div>
                          ))
                        )}
                        {hasFollow && (
                          <div
                            ref={refFollow}
                            className="py-1 flex items-center justify-center">
                            <Loading />
                          </div>
                        )}
                      </div>
                    )
                  )}
                </DialogContent>
              </Dialog>
            </div>
            <div className="w-full h-full pb-3 rounded">
              <div className="w-full h-full grid grid-cols-3 gap-1">
                {!loadingPost &&
                  postData.pages.length > 0 &&
                  postData.pages.map((page) =>
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
                                <Heart size={17} className="fill-zinc-200" />
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
                          className="h-[88%] flex flex-col gap-2 rounded-lg px-5"
                          posClose="right-3 top-[11px]">
                          <DialogHeader>
                            <div className="p-4">
                              <DialogTitle className="text-center">
                                Publicações
                              </DialogTitle>
                            </div>
                            <DialogDescription />
                          </DialogHeader>
                          <div className="overflow-y-scroll">
                            <Post post={post} />
                          </div>
                        </DialogContent>
                      </Dialog>
                    ))
                  )}
              </div>
              {hasPosts && (
                <div
                  ref={refPosts}
                  className="py-1 flex items-center justify-center">
                  <Loading />
                </div>
              )}
            </div>
          </>
        )}
      </section>
    </main>
  );
};
