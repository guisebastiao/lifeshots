import { useParams } from "react-router-dom";

import { usePost } from "@/hooks/usePost";

import { Post as PostComponent } from "@/components/Post";
import { Loading } from "@/components/Loading";

export const Post = ({}) => {
  const { postId } = useParams();

  const { getPost } = usePost();
  const { data: post, isLoading } = getPost({ postId });

  return (
    <main className="relative w-screen h-screen flex items-center justify-center">
      <section className="absolute top-14 flex max-w-md w-full h-container flex-col items-center justify-center pt-5 px-4">
        {isLoading ? <Loading /> : <PostComponent post={post} />}
      </section>
    </main>
  );
};
