import { useParams } from "react-router-dom";
import { CameraOff } from "lucide-react";

import { usePost } from "@/hooks/usePost";

import { Post as PostComponent } from "@/components/Post";
import { Loading } from "@/components/Loading";

export const Post = ({}) => {
  const { postId } = useParams();

  const { getPost } = usePost();
  const { data: post, isLoading } = getPost({ postId });

  return (
    <main className="relative w-screen h-screen flex items-center justify-center">
      {isLoading ? (
        <Loading />
      ) : !post ? (
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 border rounded-full border-white flex items-center justify-center">
            <CameraOff />
          </div>
          <h1 className="text-lg">Essa publicação não está presente</h1>
        </div>
      ) : (
        <section className="absolute top-14 flex max-w-md w-full h-container flex-col items-center justify-center pt-5 px-4">
          <PostComponent post={post} />
        </section>
      )}
    </main>
  );
};
