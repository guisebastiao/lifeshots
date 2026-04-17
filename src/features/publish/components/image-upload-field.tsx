import { ImageThumbnailStrip } from "@/features/publish/components/image-thumbnail-strip";
import { ImagePreview } from "@/features/publish/components/image-preview";
import type { CreatePostRequest } from "@/features/post/types/post-types";
import { useWatch, type UseFormReturn } from "react-hook-form";
import { FieldError } from "@/shared/components/ui/field";
import { useEffect, useMemo, useState } from "react";

interface ImageUploadFieldProps {
  form: UseFormReturn<CreatePostRequest>;
  disabled?: boolean;
  maxFiles?: number;
}

export const ImageUploadField = ({ form, disabled = false, maxFiles = 10 }: ImageUploadFieldProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const files = useWatch({ control: form.control, name: "files" }) ?? [];

  const previews = useMemo(() => files.map((file) => ({ file, url: URL.createObjectURL(file) })), [files]);

  useEffect(() => {
    return () => previews.forEach((p) => URL.revokeObjectURL(p.url));
  }, [previews]);

  const handleRemove = (index: number) => {
    const updated = files.filter((_, i) => i !== index);
    form.setValue("files", updated, { shouldDirty: true });
    setSelectedIndex((prev) => Math.min(prev, Math.max(0, updated.length - 1)));
  };

  const fileErrors = form.formState.errors.files;
  const normalizedErrors = Array.isArray(fileErrors) ? fileErrors : fileErrors ? [fileErrors] : [];

  return (
    <div className="flex flex-1 gap-2">
      <div className="flex-1 grid grid-cols-1 md:grid-cols-[15%_85%]">
        <ImageThumbnailStrip
          previews={previews}
          selectedIndex={selectedIndex}
          form={form}
          disabled={disabled}
          maxFiles={maxFiles}
          onSelect={setSelectedIndex}
        />
        <ImagePreview url={previews[selectedIndex]?.url ?? null} onDelete={() => handleRemove(selectedIndex)} />
      </div>
      <FieldError errors={normalizedErrors} />
    </div>
  );
};
