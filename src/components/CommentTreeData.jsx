import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SendHorizontal } from "lucide-react";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { Loading } from "@/components/Loading";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useCommentTree } from "@/hooks/useCommentTree";

import { commentTreeSchema } from "@/schemas/commentTreeSchema";

export const CommentTreeData = ({ commentId }) => {
  const commentTreeForm = useForm({
    resolver: zodResolver(commentTreeSchema),
    mode: "onSubmit",
    defaultValues: {
      content: "",
    },
  });

  const { createCommentTree } = useCommentTree();

  const { mutate, isPending } = createCommentTree();

  const [isOpen, setIsOpen] = useState(false);

  const handleCommentSon = ({ commentId }) => {
    const { content } = commentTreeForm.watch();
    const data = { content, commentId };
    mutate({ data });
    commentTreeForm.reset();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="flex" onClick={() => setIsOpen(true)}>
        <span className="text-xs text-zinc-400">Comentar</span>
      </DialogTrigger>
      <DialogContent posClose="top-[11px] right-3">
        <DialogHeader>
          <div className="py-4 px-3">
            <DialogTitle>Comentar</DialogTitle>
            <DialogDescription />
          </div>
        </DialogHeader>
        <div className="px-3 py-4">
          <Form {...commentTreeForm}>
            <form
              onSubmit={commentTreeForm.handleSubmit(() =>
                handleCommentSon({ commentId })
              )}
              className="flex gap-2 items-end">
              <FormField
                control={commentTreeForm.control}
                name="content"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormMessage className="text-red-500" />
                    <FormControl>
                      <Input
                        placeholder="Adicionar um comentário..."
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={isPending}
                variant="secondary"
                className="w-9 h-9 px-0 py-0">
                {isPending ? <Loading /> : <SendHorizontal />}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
