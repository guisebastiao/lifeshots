import type { ProfileResponse } from "@/features/profile/types/profile-types";
import { Avatar } from "@/shared/components/avatar";

interface ContainerProps {
  profile: ProfileResponse;
}

export const Container = ({ profile }: ContainerProps) => {
  return (
    <div className="relative space-y-3">
      <Avatar className="size-20 mx-auto mb-2" profilePicture={profile.profilePicture} />
      <h1 className="text-lg text-center font-extrabold tracking-tight text-balance">{profile.handle}</h1>
      <span className="block text-sm text-muted-foreground text-center">{profile.fullName}</span>
      <p className="text-[13px] text-muted-foreground mt-3">{profile.bio}</p>
    </div>
  );
};
