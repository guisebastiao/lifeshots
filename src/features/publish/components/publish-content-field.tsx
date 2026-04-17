import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from "@/shared/components/ui/input-group";
import type { CreatePostRequest } from "@/features/post/types/post-types";
import { Field, FieldError } from "@/shared/components/ui/field";
import { Controller, type Control } from "react-hook-form";
import { TypeOutline } from "lucide-react";
import { twMerge } from "tailwind-merge";

interface PublishContentFieldProps {
  control: Control<CreatePostRequest>;
  disabled?: boolean;
  maxLength?: number;
}

const CONTENT_MAX_LENGTH = 300;

export const PublishContentField = ({
  control,
  disabled = false,
  maxLength = CONTENT_MAX_LENGTH,
}: PublishContentFieldProps) => (
  <Controller
    name="content"
    control={control}
    render={({ field, fieldState }) => (
      <Field data-invalid={fieldState.invalid} className="py-2 gap-1">
        <InputGroup>
          <div className="flex w-full">
            <TypeOutline className="size-4.5 text-muted-foreground m-2" />
            <InputGroupTextarea
              {...field}
              disabled={disabled}
              placeholder="Escreva algo para sua publicação..."
              className="min-h-38 no-scrollbar px-0 pr-2"
              aria-invalid={fieldState.invalid}
            />
          </div>
          <InputGroupAddon align="block-end">
            <InputGroupText className={twMerge((field.value?.length ?? 0) > maxLength && "text-destructive")}>
              {field.value?.length ?? 0}/{maxLength}
            </InputGroupText>
          </InputGroupAddon>
        </InputGroup>
        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
      </Field>
    )}
  />
);
