import type { ProfileResponse } from "@/features/profile/types/profile-types";
import type { FollowRequest } from "@/features/follow/types/follow-types";
import { useFollow } from "@/features/follow/hooks/use-follow";
import { Spinner } from "@/shared/components/ui/spinner";
import { Button } from "@/shared/components/ui/button";
import { Avatar } from "@/shared/components/avatar";
import { EllipsisVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { DeletePost } from "@/features/post/components/delete-post";

interface HeaderProps {
  postId: string;
  profile: ProfileResponse;
}

export const Header = ({ postId, profile }: HeaderProps) => {
  const { mutate, isPending } = useFollow();

  const navigate = useNavigate();

  const handleFollow = ({ follow }: { follow: boolean }) => {
    const data: FollowRequest = { follow };
    mutate(
      { profileId: profile.id, data },
      {
        onError: ({ message }) => {
          toast.error(message);
        },
      },
    );
  };

  return (
    <header className="flex justify-between items-center pb-2">
      <div className="flex gap-1.5 items-center">
        <Avatar profilePicture={profile.profilePicture} />
        <h2 className="font-semibold">{profile.handle}</h2>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon-sm">
            <EllipsisVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-38">
          <DropdownMenuLabel>Publicação</DropdownMenuLabel>
          {profile.isOwnProfile ? (
            <>
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                  navigate(`/update-post/${postId}`);
                }}
              >
                <span>Editar</span>
              </DropdownMenuItem>
              <DeletePost postId={postId} />
            </>
          ) : (
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                navigate(`/profile/${profile.handle}`);
              }}
            >
              <span>Ver perfil</span>
            </DropdownMenuItem>
          )}
          {!profile.isOwnProfile &&
            (profile.isFollowing ? (
              <DropdownMenuItem
                variant="destructive"
                onSelect={() => handleFollow({ follow: false })}
                disabled={isPending}
              >
                {isPending && <Spinner />}
                <span>Deixar de Seguir</span>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onSelect={() => handleFollow({ follow: true })} disabled={isPending}>
                {isPending && <Spinner />}
                <span>Seguir</span>
              </DropdownMenuItem>
            ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};
