import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { twMerge } from "tailwind-merge";
import { useProfilePicture } from "@/hooks/useProfilePicture";

export const PictureNav = ({ className }) => {
  const { getProfilePicture } = useProfilePicture();
  const { data } = getProfilePicture;

  return (
    <Avatar className={twMerge("w-6 h-6 border-2", className)}>
      <AvatarImage src={data?.profilePicture} alt="profile-picture" />
      <AvatarFallback>
        <img src="/notUserPicture.png" alt="user-not-picture" />
      </AvatarFallback>
    </Avatar>
  );
};
