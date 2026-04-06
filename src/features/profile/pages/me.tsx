import { Publications } from "@/features/profile/components/publications";
import { Container } from "@/features/profile/components/container";
import { followTypes } from "@/features/follow/types/follow-types";
import { Follows } from "@/features/profile/components/follows";
import { Posts } from "@/features/profile/components/posts";
import { Spinner } from "@/shared/components/ui/spinner";
import { useMe } from "@/features/profile/hooks/use-me";
import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/shared/components/ui/dialog";

export const Me = () => {
  const [activePostId, setActivePostId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const { data, isLoading, isError, error } = useMe();

  if (isLoading || !data) {
    return (
      <div className="w-full flex justify-center py-8">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    toast.error(error.message);
  }

  return (
    <section className="max-w-lg flex-1 w-full mx-auto px-3 py-8">
      <Container profile={data} />
      <div className="grid grid-cols-3 h-16 my-2">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <div className="flex justify-center items-center flex-col hover:bg-foreground/5 h-full cursor-pointer transition rounded-md">
              <span className="font-bold">{data.postsCount}</span>
              <span className="text-xs font-medium text-foreground/75">Publicações</span>
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-xl h-[75vh] flex flex-col">
            <DialogHeader>
              <DialogTitle>Publicações</DialogTitle>
              <DialogDescription>Veja as publicações de {data.handle}</DialogDescription>
            </DialogHeader>
            <Posts profile={data} activePostId={activePostId} setActivePostId={setActivePostId} />
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger>
            <div className="flex justify-center items-center flex-col hover:bg-foreground/5 h-full cursor-pointer transition rounded-md">
              <span className="font-bold">{data.followersCount}</span>
              <span className="text-xs font-medium text-foreground/75">Seguidores</span>
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-xl h-[75vh] flex flex-col">
            <DialogHeader>
              <DialogTitle>Seguidores</DialogTitle>
              <DialogDescription>Veja quem está seguindo {data.handle}.</DialogDescription>
            </DialogHeader>
            <Follows profile={data} type={followTypes.FOLLOWERS} />
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger>
            <div className="flex justify-center items-center flex-col hover:bg-foreground/5 h-full cursor-pointer transition rounded-md">
              <span className="font-bold">{data.followingCount}</span>
              <span className="text-xs font-medium text-foreground/75">Seguindo</span>
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-xl h-[75vh] flex flex-col">
            <DialogHeader>
              <DialogTitle>Seguindo</DialogTitle>
              <DialogDescription>Veja os perfils que {data.handle} está seguindo.</DialogDescription>
            </DialogHeader>
            <Follows profile={data} type={followTypes.FOLLOWING} />
          </DialogContent>
        </Dialog>
      </div>
      <Publications profileId={data.id} setActivePostId={setActivePostId} setIsOpen={setIsOpen} />
    </section>
  );
};
