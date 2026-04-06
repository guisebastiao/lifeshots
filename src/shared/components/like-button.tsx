import { twMerge } from "tailwind-merge";
import { motion } from "motion/react";
import { Heart } from "lucide-react";

interface LikeButtonProps {
  className?: string;
  isLiked: boolean;
  onLike: React.MouseEventHandler<HTMLButtonElement>;
}

export function LikeButton({ className, isLiked, onLike }: LikeButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.85 }}
      onClick={onLike}
      className="relative flex items-center justify-center cursor-pointer"
    >
      <motion.div
        animate={{
          scale: isLiked ? [1, 1.4, 1] : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 10,
        }}
      >
        <Heart
          data-liked={isLiked}
          className={twMerge(
            "data-[liked=true]:fill-red-500 data-[liked=true]:text-red-500 text-foreground/85 fill-transparent transition-all duration-200",
            className,
          )}
        />
      </motion.div>
    </motion.button>
  );
}
