import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SquarePlus, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { mimetypes } from "@/utils/mimetypes";

import { useStories } from "@/hooks/useStories";

import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/Loading";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { sendStorySchema } from "@/schemas/sendStorySchema";

export const SendStory = () => {
  const sendForm = useForm({
    resolver: zodResolver(sendStorySchema),
    mode: "onChange",
    defaultValues: {
      file: null,
      content: "",
    },
  });

  const { createStory } = useStories();
  const { mutate, isPending } = createStory();

  const [filePreview, setFilePreview] = useState(null);
  const fileRef = sendForm.register("file");

  const navigate = useNavigate();

  useEffect(() => {
    const file = sendForm.getValues("file")?.[0] || null;

    if (file) {
      const url = URL.createObjectURL(file);
      setFilePreview(url);

      return () => URL.revokeObjectURL(url);
    }
  }, [sendForm.getValues("file")]);

  const handleSend = () => {
    const formData = new FormData();
    const { content, file } = sendForm.getValues();

    formData.append("storyImage", file[0]);
    formData.append("content", content);

    mutate({ data: formData });
    sendForm.reset();
    navigate("/");
  };

  const handleDelete = () => {
    sendForm.resetField("file");
    setFilePreview(null);
  };

  return (
    <main className="relative w-screen h-screen flex items-center justify-center">
      <section className="absolute top-14 flex max-w-md w-full h-container flex-col items-center justify-start">
        <Form {...sendForm}>
          <form
            onSubmit={sendForm.handleSubmit(handleSend)}
            className="max-w-md w-full h-full flex flex-col justify-center items-center gap-3 my-5">
            <FormField
              control={sendForm.control}
              name="file"
              render={() => (
                <div className="relative w-full h-full rounded-lg bg-zinc-900 overflow-hidden">
                  {filePreview ? (
                    <>
                      <Button
                        variant="destructive"
                        type="button"
                        className="absolute w-9 h-9 z-50 right-2 top-2"
                        onClick={handleDelete}>
                        <Trash />
                      </Button>
                      <img
                        src={filePreview}
                        alt="send-story-image"
                        className="absolute w-full h-full object-cover"
                      />
                    </>
                  ) : (
                    <FormItem className="relative w-full h-full flex items-center justify-center">
                      <FormControl>
                        <div className="relative flex items-center justify-center">
                          <SquarePlus className="absolute pointer-events-none" />
                          <Input
                            type="file"
                            accept={mimetypes.join(",")}
                            className="absolute w-14 h-14 border-zinc-400"
                            {...fileRef}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="absolute left-0 top-3/4 w-full text-center text-red-500" />
                    </FormItem>
                  )}
                </div>
              )}
            />
            <FormField
              control={sendForm.control}
              name="content"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Textarea
                      placeholder="Digite uma descrição para seu story"
                      maxLength={150}
                      className="h-20 resize-none text-sm"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <Loading className="border-black" />
                  <span>Publicando</span>
                </>
              ) : (
                <span className="font-semibold">Publicar</span>
              )}
            </Button>
          </form>
        </Form>
      </section>
    </main>
  );
};
