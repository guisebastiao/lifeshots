import { Avatar as RootAvatar, AvatarFallback, AvatarImage, AvatarBadge } from "@/components/ui/avatar";
import type { ProfilePictureResponse } from "@/features/profile-picture/types/profile-picture-types";
import React, { type ComponentProps } from "react";

interface AvatarProps extends ComponentProps<typeof RootAvatar> {
  profilePicture: ProfilePictureResponse | null;
  children?: React.ReactNode;
}

export const Avatar = ({ className, profilePicture, children, ...props }: AvatarProps) => {
  const badge = React.Children.toArray(children).find((child) => {
    return React.isValidElement(child) && child.type === AvatarBadge;
  });

  return (
    <RootAvatar className={className} {...props}>
      <AvatarImage src={profilePicture?.url ?? undefined} />
      <AvatarFallback className="overflow-hidden">
        <img src="/not-picture.svg" alt="not-picture" />
      </AvatarFallback>
      {badge}
    </RootAvatar>
  );
};

Avatar.Badge = AvatarBadge;
