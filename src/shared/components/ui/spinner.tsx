import * as React from "react";
import { twMerge } from "tailwind-merge";

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  lines?: number;
}

const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(({ className, lines = 12, ...props }, ref) => {
  return (
    <span
      ref={ref}
      role="status"
      aria-label="Loading"
      className={twMerge("relative inline-flex items-center justify-center size-4.5 text-foreground", className)}
      {...props}
    >
      {Array.from({ length: lines }).map((_, i) => {
        const rotate = (360 / lines) * i;
        const delay = -((lines - i) / lines);

        return (
          <span key={i} className="absolute inset-0" style={{ transform: `rotate(${rotate}deg)` }}>
            <span
              className="absolute left-1/2 -translate-x-1/2 top-[5%] w-[9%] h-[27%] rounded-full bg-current animate-spinner-fade"
              style={{ animationDelay: `${delay}s` }}
            />
          </span>
        );
      })}
    </span>
  );
});

Spinner.displayName = "Spinner";

export { Spinner };
