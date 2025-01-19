import { useState, useEffect, useMemo } from "react";
import { formatDistanceToNow } from "date-fns";
import { twMerge } from "tailwind-merge";
import { ptBR } from "date-fns/locale";

import { useLikeStory } from "@/hooks/useLikeStory";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ButtonLike } from "@/components/ButtonLike";

export const ModalStories = ({ stories }) => {
  const [userCurrent, setUserCurrent] = useState(0);
  const [storyCurrent, setStoryCurrent] = useState(0);
  const [storyData, setStoryData] = useState(null);

  const { likeStory } = useLikeStory();
  const { mutate } = likeStory();

  useEffect(() => {
    if (stories.pages.length > 0) {
      const allStories = stories.pages.flatMap((page) => page.stories);
      setStoryData(allStories);
    }
  }, [stories]);

  const handlePrev = () => {
    if (storyCurrent > 0) {
      setStoryCurrent((prev) => prev - 1);
    } else if (userCurrent > 0) {
      const prevUserIndex = userCurrent - 1;
      setUserCurrent(prevUserIndex);
      setStoryCurrent(storyData[prevUserIndex].stories.length - 1);
    }
  };

  const handleNext = () => {
    if (storyCurrent < storyData[userCurrent].stories.length - 1) {
      setStoryCurrent((prev) => prev + 1);
    } else if (userCurrent < storyData.length - 1) {
      setUserCurrent((prev) => prev + 1);
      setStoryCurrent(0);
    }
  };

  const handleOpen = (index) => {
    setUserCurrent(index);
    setStoryCurrent(0);
  };

  const formatDistance = (date) => {
    return formatDistanceToNow(new Date(date), {
      addSuffix: true,
      locale: ptBR,
    });
  };

  const handleLike = (id) => {
    const data = { id };
    mutate({ data });
  };

  const currentUser = useMemo(
    () => storyData?.[userCurrent],
    [storyData, userCurrent]
  );

  const currentStory = useMemo(
    () => currentUser?.stories?.[storyCurrent],
    [currentUser, storyCurrent]
  );

  if (!storyData) {
    return null;
  }

  return stories.pages.map((page) =>
    page.stories.map((userStory, index) => (
      <Dialog key={userStory.username} onOpenChange={() => handleOpen(index)}>
        <DialogTrigger>
          <div className="relative w-[52px] h-[52px] rounded-full bg-gradient">
            <Avatar className="absolute w-full h-full border-[3px] border-transparent">
              <AvatarImage src={userStory.profilePicture} />
              <AvatarFallback>
                <img src="/notUserPicture.png" alt="user-not-picture" />
              </AvatarFallback>
            </Avatar>
          </div>
        </DialogTrigger>
        {currentUser?.stories.map((story) => (
          <DialogContent
            key={story.id}
            className="h-full border-none px-0"
            posClose="right-4 top-7">
            <DialogHeader>
              <div className="w-full h-full space-y-1.5 z-20 bg-gradient-opacity">
                <DialogTitle />
                <DialogDescription />
                <div className="w-full h-[2px] flex items-center justify-center px-1 gap-1">
                  {currentUser.stories.map((_, i) => (
                    <span
                      key={i}
                      className={twMerge(
                        "w-full h-[2px] rounded",
                        storyCurrent >= i ? "bg-zinc-50" : "bg-zinc-400"
                      )}
                    />
                  ))}
                </div>
                <div className="flex gap-2 px-3 py-1 pb-5">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={currentUser.profilePicture} />
                    <AvatarFallback>
                      <img src="/notUserPicture.png" alt="user-not-picture" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm">{currentUser.username}</span>
                    <span className="text-xs text-zinc-300">
                      {formatDistance(currentStory.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            </DialogHeader>
            <section className="absolute top-0 w-full h-[92%] rounded-b-lg bg-zinc-800 overflow-hidden">
              <img
                src={currentStory.storyImages[0].url}
                alt="story-image"
                className="absolute top-0 w-full h-full object-cover"
              />
              <div className="absolute bottom-0 w-full h-[90.5%]">
                <button onClick={handlePrev} className="w-2/4 h-full z-20" />
                <button
                  onClick={handleNext}
                  className="w-2/4 h-full left-1/2 z-20"
                />
              </div>
            </section>
            <DialogFooter className="absolute bottom-0 w-full h-[8%]">
              <div className="flex justify-center min-w-10">
                <button onClick={() => handleLike(currentStory.id)}>
                  <ButtonLike isLiked={currentStory.isLiked} />
                </button>
              </div>
              <div className="w-full flex items-center">
                <p className="text-sm pr-2">{currentStory.content}</p>
              </div>
            </DialogFooter>
          </DialogContent>
        ))}
      </Dialog>
    ))
  );
};
