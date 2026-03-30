import { Controller, useForm } from "react-hook-form";
import type { UploadProfilePictureRequest } from "../types/profile-picture-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { uploadProfilePictureSchema } from "../schemas/upload-profile-picture-schema";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { ACCEPTED_MIMETYPES } from "@/shared/utils/accept-mimetypes";
import { useMe } from "@/features/profile/hooks/use-me";
import { useUploadProfilePicture } from "@/features/profile-picture/hooks/use-upload-profile-picture";
import { toast } from "sonner";
import { useEffect, useMemo } from "react";
import { UploadIcon } from "lucide-react";

export const UploadProfilePicture = () => {
  const { data, isLoading, isError, error } = useMe();

  const { mutate, isPending } = useUploadProfilePicture();

  const form = useForm<UploadProfilePictureRequest>({
    resolver: zodResolver(uploadProfilePictureSchema),
    values: {
      file: undefined,
    },
  });

  if (isError) {
    toast.error(error.message);
  }

  const handleUploadProfilePicture = (data: UploadProfilePictureRequest) => {
    console.log(data);
  };

  const file = form.watch("file");

  const preview = useMemo(() => {
    if (!file) return null;
    return URL.createObjectURL(file);
  }, [file]);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <form
      id="update-profile-form"
      onSubmit={form.handleSubmit(handleUploadProfilePicture)}
      className="w-full space-y-3"
    >
      <Controller
        name="file"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-={fieldState.invalid}>
            <FieldLabel htmlFor="file">Foto de Perfil</FieldLabel>
            <div className="flex justify-center">
              <div className="group relative size-20 rounded-full aspect-square border overflow-hidden hover:border-foreground/75 transition">
                <img
                  className="absolute size-full object-cover transition group-hover:opacity-10 rounded-full"
                  src={preview ?? data?.profilePicture?.url ?? "/not-picture.svg"}
                />
                <input
                  id="file"
                  type="file"
                  accept={ACCEPTED_MIMETYPES.join(",")}
                  className="absolute top-0 left-0 z-20 size-full opacity-0 cursor-pointer rounded-full"
                  disabled={isPending}
                  onBlur={field.onBlur}
                  name={field.name}
                  ref={field.ref}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    field.onChange(file);
                  }}
                />
                <UploadIcon className="absolute opacity-0 group-hover:opacity-100 transition size-8 text-foreground/75 top-1/2 left-1/2 -translate-1/2" />
              </div>
            </div>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </form>
  );
};
