import React, { forwardRef, useState, useCallback, useEffect, useRef, type ImgHTMLAttributes } from "react";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { twMerge } from "tailwind-merge";

type LazyImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  wrapperClassName?: string;
};

export const LazyImage = forwardRef<HTMLImageElement, LazyImageProps>(
  ({ className, wrapperClassName, onLoad, onError, alt = "", src, ...props }, ref) => {
    const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");

    const internalRef = useRef<HTMLImageElement | null>(null);

    const handleRef = (node: HTMLImageElement | null) => {
      internalRef.current = node;

      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    };

    useEffect(() => {
      setStatus("loading");
    }, [src]);

    useEffect(() => {
      if (internalRef.current?.complete && src) {
        setStatus("loaded");
      }
    }, [src]);

    const handleLoad = useCallback(
      (e: React.SyntheticEvent<HTMLImageElement>) => {
        setStatus("loaded");
        onLoad?.(e);
      },
      [onLoad],
    );

    const handleError = useCallback(
      (e: React.SyntheticEvent<HTMLImageElement>) => {
        setStatus("error");
        onError?.(e);
      },
      [onError],
    );

    return (
      <div className={twMerge("relative overflow-hidden", wrapperClassName)}>
        {status === "loading" && <Skeleton className="absolute inset-0 rounded-[inherit]" />}
        {status === "error" && (
          <div className="absolute inset-0 flex items-center justify-center text-xs text-muted-foreground">
            Falha ao carregar
          </div>
        )}
        <img
          ref={handleRef}
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          data-status={status}
          onLoad={handleLoad}
          onError={handleError}
          className={twMerge(
            "w-full h-full object-cover transition-opacity duration-300 select-none",
            "data-[status=loading]:opacity-0",
            "data-[status=loaded]:opacity-100",
            "data-[status=error]:opacity-0",
            className,
          )}
          {...props}
        />
      </div>
    );
  },
);

LazyImage.displayName = "LazyImage";
