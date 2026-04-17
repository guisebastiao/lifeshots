import { Controller, useWatch, type UseFormReturn } from "react-hook-form";
import type { CreatePostRequest } from "@/features/post/types/post-types";
import { ACCEPTED_MIMETYPES } from "@/shared/utils/accept-mimetypes";
import { Dropzone } from "@/shared/components/kibo-ui/dropzone";
import { Field } from "@/shared/components/ui/field";
import { PlusSquare } from "lucide-react";

interface ImageUploadFieldProps {
  form: UseFormReturn<CreatePostRequest>;
  disabled: boolean;
  maxFiles?: number;
}

export const UploadImage = ({ form, maxFiles = 10, disabled }: ImageUploadFieldProps) => {
  const files = useWatch({ control: form.control, name: "files" }) || [];

  const isDisabled = disabled || files.length >= maxFiles;

  const onDrop = (acceptedFiles: File[]) => {
    const remainingSlots = maxFiles - files.length;

    const limitedFiles = acceptedFiles.slice(0, remainingSlots);

    form.setValue("files", [...files, ...limitedFiles], {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const accept = Object.fromEntries(ACCEPTED_MIMETYPES.map((type) => [type, []]));

  return (
    <Controller
      name="files"
      control={form.control}
      render={() => (
        <Field className="relative flex h-full aspect-square border border-dashed border-foreground/25 rounded-md bg-foreground/2 hover:bg-foreground/4 transition cursor-pointer">
          <Dropzone
            multiple
            onDrop={onDrop}
            maxFiles={100}
            accept={accept}
            disabled={isDisabled}
            className="absolute inset-0 opacity-0"
          />
          <PlusSquare className="size-5 text-muted-foreground pointer-events-none mx-auto my-auto" />
        </Field>
      )}
    />
  );
};
