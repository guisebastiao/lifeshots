import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SquarePlus, Trash } from "lucide-react";
import { useForm } from "react-hook-form";

import { mimetypes } from "@/utils/mimetypes";

import { usePost } from "@/hooks/usePost";

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

import { sendPostSchema } from "@/schemas/sendPostSchema";

export const SendPost = () => {
  const sendForm = useForm({
    resolver: zodResolver(sendPostSchema),
    mode: "onSubmit",
    defaultValues: {
      files: [],
      content: "",
    },
  });

  const [filePreviews, setFilePreviews] = useState([]);

  const { createPost } = usePost();
  const { mutate, isPending } = createPost();

  useEffect(() => {
    const files = Array.from(sendForm.watch("files") || []);
    const urls = files.map((file) => URL.createObjectURL(file));
    setFilePreviews(urls);

    return () => urls.forEach((url) => URL.revokeObjectURL(url));
  }, [sendForm.watch("files")]);

  const handleFileChange = (event) => {
    const currentFiles = Array.from(sendForm.getValues("files") || []);
    const newFiles = Array.from(event.target.files || []);

    const allFiles = [...currentFiles, ...newFiles];

    const dataTransfer = new DataTransfer();
    allFiles.forEach((file) => dataTransfer.items.add(file));

    sendForm.setValue("files", dataTransfer.files);
  };

  const handleSend = () => {
    const formData = new FormData();
    const { content, files } = sendForm.watch();

    Array.from(files).forEach((file) => formData.append("postImages", file));
    formData.append("content", content);

    mutate({ data: formData });
    sendForm.reset();
  };

  const handleDelete = ({ index }) => {
    const currentFiles = sendForm.getValues("files");
    const newFiles = Array.from(currentFiles).filter((_, i) => i !== index);

    const dataTransfer = new DataTransfer();
    newFiles.forEach((file) => dataTransfer.items.add(file));

    sendForm.setValue("files", dataTransfer.files);
  };

  return (
    <div className="w-full h-full flex flex-col">
      <Form {...sendForm}>
        <form
          onSubmit={sendForm.handleSubmit(handleSend)}
          className="max-w-md w-full h-full flex flex-col justify-center items-center py-6 px-4 gap-4">
          <FormField
            control={sendForm.control}
            name="files"
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
                          multiple
                          className="absolute w-14 h-14 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-zinc-400"
                          onChange={handleFileChange}
                        />
                      </FormControl>
                      <FormMessage className="absolute left-0 top-3/4 w-full text-center text-red-500" />
                    </FormItem>
                  </CarouselItem>
                  {filePreviews.map((preview, index) => (
                    <CarouselItem key={index}>
                      <div className="absolute w-full h-full object-cover">
                        <Button
                          variant="destructive"
                          type="button"
                          className="absolute w-9 h-9 z-50 right-2 top-2"
                          onClick={() => handleDelete({ index })}>
                          <Trash />
                        </Button>
                        <img
                          src={preview}
                          alt="preview-image"
                          className="absolute w-full h-full object-cover"
                        />
                      </div>
                    </CarouselItem>
                  ))}
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
                    placeholder="Digite uma descrição para sua publicação"
                    maxLength={300}
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
