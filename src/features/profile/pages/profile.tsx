import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/shared/components/ui/empty";
import { useGetByHandle } from "@/features/profile/hooks/use-get-by-handle";
import { Publications } from "@/features/profile/components/publications";
import { Container } from "@/features/profile/components/container";
import { followTypes } from "@/features/follow/types/follow-types";
import { Follows } from "@/features/profile/components/follows";
import { useFollow } from "@/features/follow/hooks/use-follow";
import { Posts } from "@/features/profile/components/posts";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner } from "@/shared/components/ui/spinner";
import { Button } from "@/shared/components/ui/button";
import { useSession } from "@/app/hooks/use-session";
import { UserRoundX, Lock } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/shared/components/ui/dialog";

export const Profile = () => {
  const { handle } = useParams();

  if (!handle) return;

  const { session } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (handle.toLowerCase().trim() === session.user?.handle.toLowerCase().trim()) {
      navigate("/me", { replace: true });
    }
  }, [handle, session]);

  const [activePostId, setActivePostId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const { data, isLoading, isError, error } = useGetByHandle({ handle });
  const { mutate, isPending } = useFollow();

  if (isError) {
    if (error.code === "NOT_FOUND") {
      return (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <UserRoundX />
            </EmptyMedia>
            <EmptyTitle>Perfil não encontrado</EmptyTitle>
            <EmptyDescription>O perfil que você está procurando não existe ou pode ter sido removido.</EmptyDescription>
          </EmptyHeader>
        </Empty>
      );
    }

    if (error.code === "PRIVATE_PROFILE") {
      return (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Lock />
            </EmptyMedia>
            <EmptyTitle>Perfil privado</EmptyTitle>
            <EmptyDescription>Este perfil é privado. Siga este usuário para ver suas publicações.</EmptyDescription>
          </EmptyHeader>
        </Empty>
      );
    }

    toast.error(error.message);
  }

  if (isLoading || !data) {
    return (
      <div className="w-full flex justify-center py-8">
        <Spinner className="mx-auto" />
      </div>
    );
  }

  const handleFollow = ({ follow }: { follow: boolean }) => {
    mutate(
      { profileId: data.id, data: { follow } },
      {
        onError: ({ message }) => {
          toast.error(message);
        },
      },
    );
  };

  return (
    <section className="max-w-2xl flex-1 w-full mx-auto px-3 py-8">
      <Container profile={data} />
      <div className="grid grid-cols-3 h-16 my-2">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger>
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
      <Button
        variant={data.isFollowing ? "destructive" : "default"}
        className="w-full mb-2"
        disabled={isPending}
        onClick={() => handleFollow({ follow: !data.isFollowing })}
      >
        {isPending && <Spinner className="text-white" />}
        {data.isFollowing ? <span>Deixar de seguir</span> : <span>Seguir</span>}
      </Button>
      <Publications profileId={data.id} setActivePostId={setActivePostId} setIsOpen={setIsOpen} />
    </section>
  );
};
