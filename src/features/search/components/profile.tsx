import type { ProfileResponse } from "@/features/profile/types/profile-types";
import { Button } from "@/shared/components/ui/button";
import { Avatar } from "@/shared/components/avatar";
import { useNavigate } from "react-router-dom";
import { forwardRef } from "react";

interface ProfileProps {
  profile: ProfileResponse;
}

export const Profile = forwardRef<HTMLDivElement, ProfileProps>(({ profile }, ref) => {
  const navigate = useNavigate();

  return (
    <div ref={ref} className="flex justify-between items-center py-2">
      <div className="flex gap-2">
        <Avatar className="size-10" profilePicture={profile.profilePicture} />
        <div className="space-y-px">
          <h2 className="text-[15px] font-semibold text-ellipsis leading-4">{profile.handle}</h2>
          <h3 className="text-sm font-medium text-foreground/75 text-ellipsis">{profile.fullName}</h3>
          <div className="flex items-center gap-1 text-xs font-medium text-foreground/60 leading-5">
            <span>{profile.postsCount} publicação</span>
            <span>&bull;</span>
            <span>{profile.followingCount} seguindo</span>
            <span>&bull;</span>
            <span>{profile.followersCount} seguidor</span>
          </div>
        </div>
      </div>
      <Button size="sm" variant="ghost" className="text-xs" onClick={() => navigate(`/profile/${profile.handle}`)}>
        Ver Perfil
      </Button>
    </div>
  );
});
