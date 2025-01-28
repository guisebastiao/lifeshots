import { useEffect } from "react";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";

import { useAuth } from "@/context/AuthProvider";

import { useRecommendUser } from "@/hooks/useRecommendUser";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Loading } from "./Loading";

export const RecommendedUser = () => {
  const { username } = useAuth();

  const { getAllRecommendUsers } = useRecommendUser();
  const { data, isLoading, fetchNextPage, hasNextPage } =
    getAllRecommendUsers();

  const navigate = useNavigate();

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  const handleNavigate = ({ userId }) => {
    if (username.toLowerCase() === userId.toLowerCase().trim()) {
      navigate("/profile");
    } else {
      navigate(`/user/${userId}`);
    }
  };

  return (
    <div className="flex gap-2 overflow-x-scroll">
      {!isLoading &&
        data.pages[0].users.length > 0 &&
        data.pages.map((page) =>
          page.users.map((user) => (
            <div
              key={user.username}
              className="flex justify-around items-center flex-col max-w-28 h-32 w-full bg-zinc-900 border rounded-md">
              <Avatar className="w-11 h-11">
                <AvatarImage src={user.profilePicture?.url} />
                <AvatarFallback>
                  <img src="/notUserPicture.png" alt="user-not-picture" />
                </AvatarFallback>
              </Avatar>
              <span className="text-xs">{user.username}</span>
              <Button
                className="w-5/6 h-7 text-xs z-30 font-semibold"
                onClick={() => handleNavigate({ userId: user.username })}>
                <User />
                <span>Ver perfil</span>
              </Button>
            </div>
          ))
        )}
      {hasNextPage && (
        <div ref={ref} className="flex items-center justify-center px-1">
          <Loading />
        </div>
      )}
    </div>
  );
};
