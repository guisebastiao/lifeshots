import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Heart, EllipsisVertical, PencilRuler, Trash } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { ptBR } from "date-fns/locale";

import { useProfilePicture } from "@/hooks/useProfilePicture";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const ModalStory = ({ data }) => {
  const [storyCurrent, setStoryCurrent] = useState(0);

  const { getProfilePicture } = useProfilePicture();
  const { data: profilePicture, isLoading } = getProfilePicture;

  const handlePrev = () => {
    if (storyCurrent > 0) {
      setStoryCurrent((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (storyCurrent < data.length - 1) {
      setStoryCurrent((prev) => prev + 1);
    }
  };

  const formatDistance = ({ date }) => {
    return formatDistanceToNow(date, { addSuffix: true, locale: ptBR });
  };

  const handleOpen = () => {
    setStoryCurrent(0);
  };

  return (
    <Dialog onOpenChange={handleOpen}>
      <DialogTrigger disabled={data.length <= 0}>
        <div
          className={twMerge(
            "relative w-[52px] h-[52px] rounded-full",
            data.length > 0 ? "bg-gradient" : "bg-zinc-500"
          )}>
          <Avatar className="absolute w-full h-full border-[3px] border-transparent">
            <AvatarImage src={!isLoading && profilePicture} />
            <AvatarFallback>
              <img src="/notUserPicture.png" alt="user-not-picture" />
            </AvatarFallback>
          </Avatar>
        </div>
      </DialogTrigger>
      {data.length > 0 && (
        <DialogContent
          className="h-full border-none px-0"
          posClose="right-4 top-7">
          <DialogHeader>
            <div className="w-full h-full space-y-1.5 z-20 bg-gradient-opacity">
              <DialogTitle />
              <DialogDescription />
              <div className="w-full h-[2px] flex items-center justify-center px-1 gap-1">
                {data.map((_, i) => (
                  <span
                    key={i}
                    className={twMerge(
                      "w-full h-[2px] rounded",
                      storyCurrent >= i ? "bg-zinc-50" : "bg-zinc-400"
                    )}
                  />
                ))}
              </div>
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    className="absolute right-12 top-[29px]"
                    asChild>
                    <button>
                      <EllipsisVertical size={21} />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <PencilRuler />
                      <span>Editar</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Trash />
                      <span>Excluir</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex gap-2 px-3 py-1 pb-5">
                <Avatar className="w-10 h-10">
                  <AvatarImage
                    src={data[storyCurrent].author?.profilePicture}
                  />
                  <AvatarFallback>
                    <img src="/notUserPicture.png" alt="user-not-picture" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm">
                    {data[storyCurrent].author.username}
                  </span>
                  <span className="text-xs text-zinc-300">
                    {formatDistance({ date: data[storyCurrent].createdAt })}
                  </span>
                </div>
              </div>
            </div>
          </DialogHeader>
          <section className="absolute top-0 w-full h-[92%] rounded-b-lg bg-zinc-800 overflow-hidden">
            <img
              src={data[storyCurrent].storyImages[0].url}
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
            <div className="flex flex-col items-center justify-center px-2">
              <div className="flex gap-1">
                <Heart size={16} className="fill-red-600 stroke-red-600" />
                <span className="text-[11px] font-medium">
                  {data[storyCurrent].amountLikes}
                </span>
              </div>
              <span className="text-xs text-zinc-400">Curtidas</span>
            </div>
            <div className="w-full flex items-center">
              <p className="text-sm pr-2">{data[storyCurrent].content}</p>
            </div>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
};
