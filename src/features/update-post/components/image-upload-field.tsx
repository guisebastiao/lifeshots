import { ImageThumbnailStrip } from "@/features/update-post/components/image-thumbnail-strip";
import type { PostPictureResponse } from "@/features/post-picture/types/post-picture-types";
import { ImagePreview } from "@/features/update-post/components/image-preview";
import type { UpdatePostRequest } from "@/features/post/types/post-types";
import { useWatch, type UseFormReturn } from "react-hook-form";
import { FieldError } from "@/shared/components/ui/field";
import { useEffect, useMemo, useState } from "react";

interface ImageUploadFieldProps {
  form: UseFormReturn<UpdatePostRequest>;
  pictures: PostPictureResponse[];
  disabled?: boolean;
  maxFiles?: number;
}

type LocalPreview = {
  localFile: true;
  preview: {
    index: number;
    file: File;
    url: string;
  };
};

type RemotePreview = {
  localFile: false;
  preview: {
    id: string;
    fileKey: string;
    mimeType: string;
    url: string;
  };
};

export type AllPreviewType = (LocalPreview | RemotePreview)[];

export const ImageUploadField = ({ form, pictures, disabled = false, maxFiles = 10 }: ImageUploadFieldProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const files = useWatch({ control: form.control, name: "newFiles" }) ?? [];
  const removeFiles = useWatch({ control: form.control, name: "removeFiles" }) ?? [];

  const previews = useMemo(() => {
    return files.map((file, index) => ({
      index,
      file,
      url: URL.createObjectURL(file),
    }));
  }, [files]);

  useEffect(() => {
    return () => previews.forEach((p) => URL.revokeObjectURL(p.url));
  }, [previews]);

  const allPreviews: AllPreviewType = useMemo(() => {
    const local = previews.map((p) => ({
      localFile: true as const,
      preview: p,
    }));

    const remote = (pictures ?? [])
      .filter((pic) => !removeFiles.includes(pic.id))
      .map((pic) => ({
        localFile: false as const,
        preview: {
          id: pic.id,
          fileKey: pic.fileKey,
          mimeType: pic.mimeType,
          url: pic.url,
        },
      }));

    return [...remote, ...local];
  }, [previews, pictures, removeFiles]);

  useEffect(() => {
    if (selectedIndex >= allPreviews.length) {
      setSelectedIndex(Math.max(0, allPreviews.length - 1));
    }
  }, [allPreviews.length, selectedIndex]);

  const handleRemove = (index: number) => {
    const item = allPreviews[index];
    if (!item) return;

    if (item.localFile) {
      const updated = files.filter((_, i) => i !== item.preview.index);
      form.setValue("newFiles", updated, { shouldDirty: true });
    } else {
      const current = form.getValues("removeFiles") ?? [];
      form.setValue("removeFiles", [...current, item.preview.id], {
        shouldDirty: true,
      });
    }
  };

  const fileErrors = form.formState.errors.newFiles;
  const normalizedErrors = Array.isArray(fileErrors) ? fileErrors : fileErrors ? [fileErrors] : [];

  return (
    <div className="flex flex-1 gap-2">
      <div className="flex-1 grid grid-cols-1 md:grid-cols-[15%_85%]">
        <ImageThumbnailStrip
          previews={allPreviews}
          selectedIndex={selectedIndex}
          form={form}
          disabled={disabled}
          maxFiles={maxFiles}
          onSelect={setSelectedIndex}
        />
        <ImagePreview
          url={allPreviews[selectedIndex]?.preview.url ?? null}
          onDelete={() => handleRemove(selectedIndex)}
        />
      </div>
      <FieldError errors={normalizedErrors} />
    </div>
  );
};
