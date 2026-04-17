import type { AllPreviewType } from "@/features/update-post/components/image-upload-field";
import { Carousel, CarouselContent, CarouselItem } from "@/shared/components/ui/carousel";
import { UploadImage } from "@/features/update-post/components/upload-image";
import type { UpdatePostRequest } from "@/features/post/types/post-types";
import { LazyImage } from "@/shared/components/lazy-image";
import type { UseFormReturn } from "react-hook-form";
import { useEffect, useState } from "react";

interface ImageThumbnailStripProps {
  previews: AllPreviewType;
  selectedIndex: number;
  form: UseFormReturn<UpdatePostRequest>;
  disabled?: boolean;
  maxFiles?: number;
  onSelect: (index: number) => void;
}

export const ImageThumbnailStrip = ({
  previews,
  selectedIndex,
  form,
  disabled = false,
  maxFiles,
  onSelect,
}: ImageThumbnailStripProps) => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");

    const handleChange = () => setIsDesktop(media.matches);

    handleChange();
    media.addEventListener("change", handleChange);

    return () => media.removeEventListener("change", handleChange);
  }, []);

  return (
    <div className="md:mr-1.5 not-md:mt-1.5 md:h-auto h-20 order-2 md:order-1">
      <Carousel orientation={isDesktop ? "vertical" : "horizontal"} className="h-full">
        <CarouselContent className="no-scrollbar md:h-0">
          {previews.map((item, index) => {
            const key = item.localFile ? item.preview.url : item.preview.id;

            return (
              <CarouselItem
                key={key}
                data-active={index === selectedIndex}
                className="group cursor-pointer basis-auto"
                onClick={() => onSelect(index)}
              >
                <div className="p-px rounded-md group-data-[active=true]:border-2 border-primary h-full aspect-square group-data-[active=true]:opacity-100 opacity-75">
                  <LazyImage
                    src={item.preview.url}
                    alt={`preview-${index + 1}`}
                    className="h-full aspect-square object-cover rounded-md"
                  />
                </div>
              </CarouselItem>
            );
          })}
          <CarouselItem className="basis-auto">
            <UploadImage form={form} disabled={disabled} maxFiles={maxFiles} />
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  );
};
