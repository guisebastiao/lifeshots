import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { SquarePlus, Trash } from "lucide-react";
import { useForm } from "react-hook-form";

import { usePost } from "@/hooks/usePost";
import { usePostImage } from "@/hooks/usePostImage";

import { Loading } from "@/components/Loading";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselDots,
} from "@/components/ui/carousel";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { editPostSchema } from "@/schemas/editPostSchema";
import { mimetypes } from "@/utils/mimetypes";

export const EditPost = () => {
  const { postId } = useParams();

  const { getPost, updatePost } = usePost();
  const { deletePostImage } = usePostImage();

  const { data, isLoading } = getPost({ postId });
  const { mutate: mutateUpdate, isPending: updatePending } = updatePost();
  const { mutate: mutateDelete, isPending: deletePending } = deletePostImage();

  const navigate = useNavigate();

  const editPostForm = useForm({
    resolver: zodResolver(editPostSchema),
    mode: "onSubmit",
    defaultValues: {
      files: [],
      content: "",
    },
  });

  const [filePreviews, setFilePreviews] = useState([]);

  useEffect(() => {
    const files = Array.from(editPostForm.watch("files") || []);
    const urls = files.map((file) => URL.createObjectURL(file));
    setFilePreviews(urls);

    return () => urls.forEach((url) => URL.revokeObjectURL(url));
  }, [editPostForm.watch("files")]);

  useEffect(() => {
    if (!isLoading) {
      editPostForm.setValue("content", data?.content);
    }
  }, [data, isLoading]);

  const handleFileChange = (event) => {
    const currentFiles = Array.from(editPostForm.getValues("files") || []);
    const newFiles = Array.from(event.target.files || []);

    const allFiles = [...currentFiles, ...newFiles];

    const dataTransfer = new DataTransfer();
    allFiles.forEach((file) => dataTransfer.items.add(file));

    editPostForm.setValue("files", dataTransfer.files);
  };

  const handleEditPost = () => {
    const formData = new FormData();
    const { content, files } = editPostForm.watch();

    Array.from(files).forEach((file) => formData.append("postImages", file));
    formData.append("content", content);

    mutateUpdate({ data: formData, postId });
    editPostForm.reset();
  };

  const handleDelete = ({ index }) => {
    const currentFiles = editPostForm.getValues("files");
    const newFiles = Array.from(currentFiles).filter((_, i) => i !== index);

    const dataTransfer = new DataTransfer();
    newFiles.forEach((file) => dataTransfer.items.add(file));

    editPostForm.setValue("files", dataTransfer.files);
  };

  const handlePostImageDeletePostPublished = ({ postImageId }) => {
    mutateDelete({ postImageId });
  };

  useEffect(() => {
    if (!isLoading && !data) {
      navigate("/");
    }
  }, [isLoading, data, navigate]);

  return (
    <main className="relative w-screen h-screen flex items-center justify-center">
      {isLoading ? (
        <Loading />
      ) : (
        <section className="absolute top-14 max-w-md w-full h-container">
          <Form {...editPostForm}>
            <form
              onSubmit={editPostForm.handleSubmit(handleEditPost)}
              className="max-w-md w-full h-full flex flex-col justify-center items-center overflow-y-scroll py-6 px-4 gap-4">
              <FormField
                control={editPostForm.control}
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
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="destructive"
                                  type="button"
                                  className="absolute w-9 h-9 z-50 right-2 top-2">
                                  <Trash />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent className="max-w-md">
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Excluir Imagem
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Você tem certeza que deseja excluir a imagem
                                    dessa publicação?
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>
                                    Cancelar
                                  </AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDelete({ index })}
                                    className="bg-red-500 hover:bg-red-600 text-white">
                                    {deletePending ? (
                                      <Loading className="w-4 h-4" />
                                    ) : (
                                      <span>Excluir</span>
                                    )}
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                            <img
                              src={preview}
                              alt="preview-image"
                              className="absolute w-full h-full object-cover"
                            />
                          </div>
                        </CarouselItem>
                      ))}
                      {data?.postImages.map((image) => (
                        <CarouselItem key={image.id}>
                          <div className="absolute w-full h-full object-cover">
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="destructive"
                                  type="button"
                                  className="absolute w-9 h-9 z-50 right-2 top-2">
                                  <Trash />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent className="max-w-md">
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Excluir Imagem
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Você tem certeza que deseja excluir a imagem
                                    dessa publicação?
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>
                                    Cancelar
                                  </AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() =>
                                      handlePostImageDeletePostPublished({
                                        postImageId: image.id,
                                      })
                                    }
                                    className="bg-red-500 hover:bg-red-600 text-white">
                                    {deletePending ? (
                                      <Loading className="w-4 h-4" />
                                    ) : (
                                      <span>Excluir</span>
                                    )}
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>

                            <img
                              src={image.url}
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
                control={editPostForm.control}
                name="content"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Textarea
                        placeholder="Edite a descrição da publicação"
                        maxLength={300}
                        className="h-36 resize-none text-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={updatePending}>
                {updatePending ? (
                  <>
                    <Loading className="border-black" />
                    <span>Salvando</span>
                  </>
                ) : (
                  <span className="font-semibold">Salvar</span>
                )}
              </Button>
            </form>
          </Form>
        </section>
      )}
    </main>
  );
};
