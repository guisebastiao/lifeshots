import { Heart } from "lucide-react";
import { twMerge } from "tailwind-merge";

export const ButtonLike = ({ isLiked, size = 22 }) => {
  return (
    <Heart
      size={size}
      className={twMerge(
        isLiked
          ? "stroke-red-600 fill-red-600 animate-like"
          : "stroke-zinc-50 animate-deslike",
        "transition-all duration-300"
      )}
    />
  );
};
