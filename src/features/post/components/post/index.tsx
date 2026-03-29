import { Carousel, CarouselContent, CarouselItem, CarouselDots } from "@/components/ui/carousel";
import type { PostResponse } from "@/features/post/types/post-types";
import { Content } from "@/features/post/components/post/content";
import { Header } from "@/features/post/components/post/header";
import { LazyImage } from "@/components/lazy-image";

interface PostProps {
  post: PostResponse;
}

export const Post = ({ post }: PostProps) => {
  return (
    <div className="overflow-hidden h-full rounded-md">
      <Header profile={post.profile} />
      <Carousel>
        <CarouselContent>
          {post.postPictures.map((picture) => (
            <CarouselItem key={picture.id}>
              <div className="relative size-full aspect-square">
                <LazyImage src={picture.url} className="absolute size-full object-cover rounded-md" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselDots />
      </Carousel>
      <Content post={post} />
    </div>
  );
};
