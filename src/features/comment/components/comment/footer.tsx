import { createCommentSchema } from "@/features/comment/schema/create-comment-schema";
import type { CreateCommentRequest } from "@/features/comment/types/comment-types";
import { useCreateComment } from "@/features/comment/hooks/use-create-comment";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { DrawerFooter } from "@/components/ui/drawer";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from "@/components/ui/spinner";
import { twMerge } from "tailwind-merge";
import { Send } from "lucide-react";
import { toast } from "sonner";
import {
  InputGroup,
  InputGroupTextarea,
  InputGroupAddon,
  InputGroupText,
  InputGroupButton,
} from "@/components/ui/input-group";

interface FooterProps {
  postId: string;
}

export const Footer = ({ postId }: FooterProps) => {
  const form = useForm<CreateCommentRequest>({
    resolver: zodResolver(createCommentSchema),
    values: {
      content: "",
    },
  });

  const { mutate, isPending } = useCreateComment();

  const handleCreateComment = (data: CreateCommentRequest) => {
    mutate(
      { data, postId },
      {
        onSuccess: () => {
          form.reset();
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

  return (
    <DrawerFooter className="bg-background z-10">
      <form
        id="create-comment-form"
        className="w-full max-w-xl mx-auto"
        onSubmit={form.handleSubmit(handleCreateComment)}
      >
        <Controller
          name="content"
          control={form.control}
          render={({ field, fieldState }) => (
            <FieldGroup>
              <Field>
                <InputGroup>
                  <InputGroupTextarea
                    {...field}
                    id="content"
                    disabled={isPending}
                    placeholder="Escreva seu comentário..."
                    className="min-h-9 max-h-24 no-scrollbar"
                    aria-invalid={fieldState.invalid}
                  />
                  <InputGroupAddon align="block-end">
                    <InputGroupText className={twMerge(field.value.length > 300 && "text-destructive")}>
                      {field.value.length}/300
                    </InputGroupText>
                    <InputGroupButton
                      type="submit"
                      variant="default"
                      size="icon-sm"
                      className="ml-auto"
                      disabled={isPending}
                    >
                      {isPending ? <Spinner className="text-white" /> : <Send />}
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            </FieldGroup>
          )}
        />
      </form>
    </DrawerFooter>
  );
};
