import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from "@/shared/components/ui/input-group";
import type { CommentResponse, UpdateCommentRequest } from "@/features/comment/types/comment-types";
import { updateCommentSchema } from "@/features/comment/schema/update-comment-schema";
import { useUpdateComment } from "@/features/comment/hooks/use-update-comment";
import { Field, FieldError, FieldGroup } from "@/shared/components/ui/field";
import { DropdownMenuItem } from "@/shared/components/ui/dropdown-menu";
import { Spinner } from "@/shared/components/ui/spinner";
import { Button } from "@/shared/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { twMerge } from "tailwind-merge";
import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";

interface UpdateCommentProps {
  comment: CommentResponse;
}

export const UpdateComment = ({ comment }: UpdateCommentProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<UpdateCommentRequest>({
    resolver: zodResolver(updateCommentSchema),
    values: {
      content: comment.content,
    },
  });

  const { mutate, isPending } = useUpdateComment();

  const handleUpdateComment = (data: UpdateCommentRequest) => {
    mutate(
      { commentId: comment.id, data },
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

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Editar</DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <form onSubmit={form.handleSubmit(handleUpdateComment)}>
          <DialogHeader>
            <DialogTitle>Editar comentário</DialogTitle>
            <DialogDescription />
          </DialogHeader>
          <Controller
            name="content"
            control={form.control}
            render={({ field, fieldState }) => (
              <FieldGroup className="my-3">
                <Field>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id="content"
                      disabled={isPending}
                      placeholder="Escreva seu comentário..."
                      className="min-h-29 no-scrollbar"
                      aria-invalid={fieldState.invalid}
                    />
                    <InputGroupAddon align="block-end">
                      <InputGroupText className={twMerge(field.value.length > 300 && "text-destructive")}>
                        {field.value.length}/300
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              </FieldGroup>
            )}
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button disabled={isPending} variant="outline">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              {isPending && <Spinner className="text-white" />}
              <span>Salvar</span>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
