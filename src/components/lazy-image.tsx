import React, { forwardRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { twMerge } from "tailwind-merge";

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

export const LazyImage = forwardRef<HTMLImageElement, LazyImageProps>(({ className, ...props }, ref) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <React.Fragment>
      {!loaded && <Skeleton className="size-full rounded-md" />}
      <img
        ref={ref}
        loading="lazy"
        decoding="async"
        data-loaded={loaded}
        onLoad={() => setLoaded(true)}
        className={twMerge(
          "data-[loaded=false]:opacity-0 data-[loaded=true]:opacity-100 transition-opacity duration-200",
          className,
        )}
        {...props}
      />
    </React.Fragment>
  );
});

LazyImage.displayName = "LazyImage";
