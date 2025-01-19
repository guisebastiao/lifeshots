import { twMerge } from "tailwind-merge";

export const Loading = ({ className }) => {
  return (
    <span
      className={twMerge(
        "h-5 w-5 animate-spin rounded-full border-2 border-solid border-white border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]",
        className
      )}
    />
  );
};
