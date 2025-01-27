import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SquarePlus } from "lucide-react";
import { useForm } from "react-hook-form";

import { mimetypes } from "@/utils/mimetypes";

import { useStories } from "@/hooks/useStories";

import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/Loading";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselDots,
} from "@/components/ui/carousel";
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

  const [filePreview, setFilePreview] = useState(null);

  const { createStory } = useStories();
  const { mutate, isPending } = createStory();

  const fileRef = sendForm.register("file");

  useEffect(() => {
    const file = sendForm.watch("file")?.[0] || null;

    if (file) {
      const url = URL.createObjectURL(file);
      setFilePreview(url);

      return () => URL.revokeObjectURL(url);
    }
  }, [sendForm.watch("file")]);

  const handleSend = () => {
    const formData = new FormData();
    const { content, file } = sendForm.watch();

    formData.append("storyImage", file[0]);
    formData.append("content", content);

    mutate({ data: formData });
    sendForm.reset();
  };

  return (
    <div className="w-full h-full flex">
      <Form {...sendForm}>
        <form
          onSubmit={sendForm.handleSubmit(handleSend)}
          className="max-w-md w-full h-full flex flex-col justify-center items-center py-6 px-4 gap-4">
          <FormField
            control={sendForm.control}
            name="file"
            render={() => (
              <Carousel className="w-full">
                <CarouselContent className="relative aspect-square">
                  <CarouselItem>
                    <SquarePlus className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 ml-2 pointer-events-none" />
                    <FormItem className="relative w-full h-full bg-zinc-900 flex items-center justify-center">
                      <FormControl>
                        <Input
                          type="file"
                          accept={mimetypes.join(",")}
                          className="absolute w-14 h-14 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-zinc-400"
                          {...fileRef}
                        />
                      </FormControl>
                      <FormMessage className="absolute left-0 top-3/4 w-full text-center text-red-500" />
                    </FormItem>
                    <SquarePlus className="absolute" />
                  </CarouselItem>
                  {filePreview && (
                    <CarouselItem>
                      <div className="absolute w-full h-full object-cover">
                        <img
                          src={filePreview}
                          alt="preview-image"
                          className="absolute w-full h-full object-cover"
                        />
                      </div>
                    </CarouselItem>
                  )}
                </CarouselContent>
                <CarouselDots />
              </Carousel>
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
    </div>
  );
};
