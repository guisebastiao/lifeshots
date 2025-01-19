import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export const NotificationIcon = ({ icon }) => {
  return (
    <Avatar>
      <AvatarImage src={icon} />
      <AvatarFallback>
        <img src="/notUserPicture.png" alt="user-not-picture" />
      </AvatarFallback>
    </Avatar>
  );
};
