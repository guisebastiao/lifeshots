import { ImageCrop, ImageCropApply, ImageCropContent, ImageCropReset } from "@/shared/components/kibo-ui/image-crop";
import { uploadProfilePictureSchema } from "@/features/profile-picture/schemas/upload-profile-picture-schema";
import type { UploadProfilePictureRequest } from "@/features/profile-picture/types/profile-picture-types";
import { useUploadProfilePicture } from "@/features/profile-picture/hooks/use-upload-profile-picture";
import { Dropzone, DropzoneContent, DropzoneEmptyState } from "@/shared/components/kibo-ui/dropzone";
import { Field, FieldError, FieldLabel } from "@/shared/components/ui/field";
import { ACCEPTED_MIMETYPES } from "@/shared/utils/accept-mimetypes";
import { ACCEPT_FILESIZE } from "@/shared/utils/accept-filesize";
import { base64ToFile } from "@/shared/utils/base64-to-file";
import { Spinner } from "@/shared/components/ui/spinner";
import { Button } from "@/shared/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";

interface FormProps {
  setIsOpen: (isOpen: boolean) => void;
}

export const Form = ({ setIsOpen }: FormProps) => {
  const [isCropped, setIsCropped] = useState(false);

  const { mutate, isPending } = useUploadProfilePicture();

  const form = useForm<UploadProfilePictureRequest>({
    resolver: zodResolver(uploadProfilePictureSchema),
    values: {
      file: null,
    },
  });

  const handleUploadProfilePicture = (data: UploadProfilePictureRequest) => {
    if (!data.file) return;

    const formData = new FormData();
    formData.append("file", data.file);

    mutate(
      { data: formData },
      {
        onSuccess: () => {
          setIsOpen(false);
        },
        onError: ({ code, message, details }) => {
          if (code === "VALIDATION_ERROR") {
            details.forEach((err) => {
              form.setError(err.field, {
                message: err.error,
              });
            });

            return;
          }

          toast.error(message);
        },
      },
    );
  };

  const handleCancelCrop = () => {
    form.setValue("file", null);
    setIsOpen(false);
  };

  const handleOnCrop = (croppedImage: string) => {
    setIsCropped(true);
    form.setValue("file", base64ToFile(croppedImage));
  };

  const file = form.watch("file");

  if (!file) {
    const accept = Object.fromEntries(ACCEPTED_MIMETYPES.map((type) => [type, []]));

    const handleDrop = (files: File[]) => {
      const file = files[0];
      if (!file) return;

      form.setValue("file", file, {
        shouldValidate: true,
        shouldDirty: true,
      });
    };

    return (
      <Dropzone accept={accept} maxFiles={1} maxSize={ACCEPT_FILESIZE} onDrop={handleDrop} src={file ? [file] : []}>
        <DropzoneEmptyState />
        <DropzoneContent />
      </Dropzone>
    );
  }

  return (
    <form className="w-full space-y-3" onSubmit={form.handleSubmit(handleUploadProfilePicture)}>
      <Controller
        name="file"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-={fieldState.invalid}>
            <FieldLabel htmlFor="file">Foto de Perfil</FieldLabel>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            <ImageCrop
              key={field.value?.name}
              aspect={1}
              file={field.value!}
              maxImageSize={ACCEPT_FILESIZE}
              disabled={isPending}
              onCrop={handleOnCrop}
            >
              {isCropped ? (
                <>
                  <img src={URL.createObjectURL(file)} alt="profile-image-cropped" />
                  <div className="flex flex-col gap-2 mt-3">
                    <ImageCropReset asChild>
                      <Button type="button" variant="outline" disabled={isPending} onClick={handleCancelCrop}>
                        Cancelar
                      </Button>
                    </ImageCropReset>
                    <Button type="submit" disabled={isPending || !isCropped}>
                      {isPending && <Spinner className="text-white" />}
                      <span>Salvar</span>
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <ImageCropContent className="max-w-md max-h-[70vh]" />
                  <div className="flex flex-col gap-2 mt-3">
                    <ImageCropReset asChild>
                      <Button type="button" variant="outline" disabled={isPending} onClick={handleCancelCrop}>
                        Cancelar
                      </Button>
                    </ImageCropReset>
                    <ImageCropApply type="button" disabled={isPending || isCropped} asChild>
                      <Button>Cortar</Button>
                    </ImageCropApply>
                  </div>
                </>
              )}
            </ImageCrop>
          </Field>
        )}
      />
    </form>
  );
};
