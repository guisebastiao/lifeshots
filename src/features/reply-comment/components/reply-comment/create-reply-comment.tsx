import { InputGroup, InputGroupTextarea, InputGroupAddon, InputGroupText } from "@/shared/components/ui/input-group";
import { createReplyCommentSchema } from "@/features/reply-comment/schema/create-reply-comment-schema";
import type { CreateReplyCommentRequest } from "@/features/reply-comment/types/reply-comment-types";
import { useCreateReplyComment } from "@/features/reply-comment/hooks/use-create-reply-comment";
import { Field, FieldError, FieldGroup } from "@/shared/components/ui/field";
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

interface CreateReplyCommentProps {
  commentId: string;
}

export const CreateReplyComment = ({ commentId }: CreateReplyCommentProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<CreateReplyCommentRequest>({
    resolver: zodResolver(createReplyCommentSchema),
    values: {
      content: "",
    },
  });

  const { mutate, isPending } = useCreateReplyComment();

  const handleCreateReplyComment = (data: CreateReplyCommentRequest) => {
    mutate(
      { data, commentId },
      {
        onSuccess: () => {
          form.reset();
          setIsOpen(false);
        },
        onError: ({ code, details, message }) => {
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

  const onOpenChange = () => {
    form.reset();
    setIsOpen((prev) => !prev);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <button className="font-semibold text-foreground/75 text-[13px] cursor-pointer">Responder</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl gap-0">
        <DialogHeader>
          <DialogTitle>Responder comentário</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleCreateReplyComment)}>
          <Controller
            name="content"
            control={form.control}
            render={({ field, fieldState }) => (
              <FieldGroup className="my-3">
                <Field>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      disabled={isPending}
                      placeholder="Escreva uma resposta para esse comentário"
                      className="min-h-9 no-scrollbar"
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
              <span>Responder</span>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
