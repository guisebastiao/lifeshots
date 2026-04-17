import { Carousel, CarouselContent, CarouselItem, CarouselDots } from "@/shared/components/ui/carousel";
import type { PostResponse } from "@/features/post/types/post-types";
import { Content } from "@/features/post/components/post/content";
import { Header } from "@/features/post/components/post/header";
import { LazyImage } from "@/shared/components/lazy-image";

interface PostProps {
  post: PostResponse;
}

export const Post = ({ post }: PostProps) => {
  return (
    <div className="overflow-hidden h-full rounded-md">
      <Header postId={post.id} profile={post.profile} />
      <Carousel className="bg-foreground/3 rounded-md">
        <CarouselContent>
          {post.postPictures.map((picture) => (
            <CarouselItem key={picture.id}>
              <LazyImage src={picture.url} className="object-cover aspect-square" />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselDots />
      </Carousel>
      <Content post={post} />
    </div>
  );
};
