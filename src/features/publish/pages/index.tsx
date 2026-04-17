import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { PublishHeader } from "@/features/publish/components/publish-header";
import { PublishContentField } from "@/features/publish/components/publish-content-field";
import { PublishActions } from "@/features/publish/components/publish-actions";
import { ImageUploadField } from "@/features/publish/components/image-upload-field";
import { createPostSchema } from "@/features/post/schemas/create-post-schema";
import type { CreatePostRequest } from "@/features/post/types/post-types";
import { useCreatePost } from "@/features/post/hooks/use-create-post";

const MAX_FILES = 10;

const buildFormData = (data: CreatePostRequest): FormData => {
  const formData = new FormData();
  formData.append("content", data.content ?? "");
  data.files.forEach((file) => formData.append("files", file));
  return formData;
};

export const Publish = () => {
  const { mutate, isPending } = useCreatePost();

  const form = useForm<CreatePostRequest>({
    resolver: zodResolver(createPostSchema),
    mode: "onChange",
    defaultValues: { content: "", files: [] },
  });

  const handleSubmit = (data: CreatePostRequest) => {
    mutate(
      { data: buildFormData(data) },
      {
        onSuccess: () => {
          toast.success("Publicação enviada com sucesso");
          form.reset();
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
        <ImageUploadField form={form} disabled={isPending} maxFiles={MAX_FILES} />
        <PublishContentField control={form.control} disabled={isPending} />
        <PublishActions isPending={isPending} isDirty={form.formState.isDirty} onDiscard={form.reset} />
      </form>
    </section>
  );
};
