import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from "@/shared/components/ui/input-group";
import { updateReplyCommentSchema } from "@/features/reply-comment/schema/update-reply-comment-schema";
import { useReplyUpdateComment } from "@/features/reply-comment/hooks/use-update-reply-comment";
import { Field, FieldError, FieldGroup } from "@/shared/components/ui/field";
import { DropdownMenuItem } from "@/shared/components/ui/dropdown-menu";
import { Spinner } from "@/shared/components/ui/spinner";
import { Button } from "@/shared/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { twMerge } from "tailwind-merge";
import { useState } from "react";
import { toast } from "sonner";
import type {
  ReplyCommentResponse,
  UpdateReplyCommentRequest,
} from "@/features/reply-comment/types/reply-comment-types";
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

interface UpdateReplyCommentProps {
  replyComment: ReplyCommentResponse;
}

export const UpdateReplyComment = ({ replyComment }: UpdateReplyCommentProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<UpdateReplyCommentRequest>({
    resolver: zodResolver(updateReplyCommentSchema),
    values: {
      content: replyComment.content,
    },
  });

  const { mutate, isPending } = useReplyUpdateComment();

  const handleUpdateReplyComment = (data: UpdateReplyCommentRequest) => {
    mutate(
      { replyCommentId: replyComment.id, data },
      {
        onSuccess: () => {
          setIsOpen(false);
        },
        onError: ({ message }) => {
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
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Editar</DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl gap-0">
        <DialogHeader>
          <DialogTitle>Editar resposta comentário</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleUpdateReplyComment)}>
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
                      placeholder="Escreva seu comentário..."
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
              <span>Salvar</span>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
