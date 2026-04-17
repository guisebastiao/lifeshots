import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { PublishHeader } from "@/features/update-post/components/publish-header";
import { PublishContentField } from "@/features/update-post/components/publish-content-field";
import { PublishActions } from "@/features/update-post/components/publish-actions";
import { ImageUploadField } from "@/features/update-post/components/image-upload-field";
import { updatePostSchema } from "@/features/post/schemas/update-post-schema";
import type { UpdatePostRequest } from "@/features/post/types/post-types";
import { useUpdatePost } from "@/features/post/hooks/use-update-post";
import { useNavigate, useParams } from "react-router-dom";
import { useGetPost } from "@/features/post/hooks/use-get-post";
import { Spinner } from "@/shared/components/ui/spinner";

const MAX_FILES = 10;

const buildFormData = (data: UpdatePostRequest): FormData => {
  const formData = new FormData();
  formData.append("content", data.content ?? "");
  data.newFiles.forEach((newFile) => formData.append("newFiles", newFile));
  data.removeFiles.forEach((removeFile) => formData.append("removeFiles", removeFile));
  return formData;
};

export const UpdatePost = () => {
  const { postId } = useParams();

  const { data, isLoading, isError, error } = useGetPost({ postId: postId! });

  const { mutate, isPending } = useUpdatePost();

  const navigate = useNavigate();

  const form = useForm<UpdatePostRequest>({
    resolver: zodResolver(updatePostSchema),
    mode: "onChange",
    values: {
      content: data?.content ?? "",
      newFiles: [],
      removeFiles: [],
    },
  });

  if (isLoading) {
    return (
      <div className="w-full flex justify-center py-3">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    toast.error(error.message);
  }

  if (!postId || !data) return null;

  const handleSubmit = (data: UpdatePostRequest) => {
    mutate(
      { data: buildFormData(data), postId },
      {
        onSuccess: () => {
          toast.success("Sua publicação foi editada com sucesso");
          form.reset();
          navigate(-1);
        },
        onError: ({ code, message, details }) => {
          if (code === "VALIDATION_ERROR") {
            details.forEach(({ field, error }) => form.setError(field, { message: error }));
            return;
          }
          toast.error(message);
        },
      },
    );
  };

  return (
    <section className="max-w-2xl flex flex-col flex-1 w-full mx-auto p-3">
      <PublishHeader />
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex-1 flex flex-col gap-3">
        <ImageUploadField form={form} pictures={data.postPictures} disabled={isPending} maxFiles={MAX_FILES} />
        <PublishContentField control={form.control} disabled={isPending} />
        <PublishActions isPending={isPending} isDirty={form.formState.isDirty} onDiscard={form.reset} />
      </form>
    </section>
  );
};
