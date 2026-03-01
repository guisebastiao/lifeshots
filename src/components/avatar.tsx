import { Avatar as RootAvatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { ProfileResponse } from "@/types/profile-types";
import { type ComponentProps } from "react";

interface AvatarProps extends ComponentProps<typeof RootAvatar> {
  classname?: string;
  profile: ProfileResponse;
}

export const Avatar = ({ className, profile, ...props }: AvatarProps) => {
  return (
    <RootAvatar className={className} {...props}>
      <AvatarImage src={profile.profilePicture?.url ?? undefined} />
      <AvatarFallback className="overflow-hidden">
        <img src="/not-picture.svg" alt="not-picture" />
      </AvatarFallback>
    </RootAvatar>
  );
};
