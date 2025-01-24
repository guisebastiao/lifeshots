import * as React from "react";
import { Eye, EyeOff } from "lucide-react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  const [changeType, setChangeType] = React.useState("password");

  const toggleVisibility = () => {
    setChangeType((prevType) => {
      return prevType === "password" ? "text" : "password";
    });
  };

  if (type === "password") {
    return (
      <div>
        <input
          type={changeType}
          className={cn(
            "relative flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-base",
            className
          )}
          ref={ref}
          {...props}
        />
        {type === "password" && (
          <button
            type="button"
            className="absolute top-2 right-0 aspect-square h-9 flex items-center justify-center rounded-md"
            onClick={toggleVisibility}>
            {changeType === "password" ? (
              <Eye size={20} />
            ) : (
              <EyeOff size={20} />
            )}
          </button>
        )}
      </div>
    );
  }

  return (
    <input
      type={type}
      className={cn(
        "relative flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
