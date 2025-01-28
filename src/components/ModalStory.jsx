import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import {
  Heart,
  EllipsisVertical,
  PencilRuler,
  Trash,
  Plus,
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { ptBR } from "date-fns/locale";

import { useProfilePicture } from "@/hooks/useProfilePicture";
import { useStories } from "@/hooks/useStories";

import { Loading } from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { editStorySchema } from "@/schemas/editStorySchema";

export const ModalStory = ({ story }) => {
  const editStoryForm = useForm({
    resolver: zodResolver(editStorySchema),
    mode: "onSubmit",
    defaultValues: {
      content: "",
    },
  });

  const [storyCurrent, setStoryCurrent] = useState(0);
  const [isAlertDeleteOpen, setIsAlertDeleteOpen] = useState(false);
  const [isAlertUpdateOpen, setIsAlertUpdateOpen] = useState(false);

  const { deleteStory, updateStory } = useStories();
  const { getProfilePicture } = useProfilePicture();

  const { mutate: mutateUpdate, isLoading: loadingUpdate } = updateStory();
  const { mutate: mutateDelete, isLoading: loadingDelete } = deleteStory();
  const { data, isLoading } = getProfilePicture();

  const navigate = useNavigate();

  const handlePrev = () => {
    if (storyCurrent > 0) {
      setStoryCurrent((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (storyCurrent < story.length - 1) {
      setStoryCurrent((prev) => prev + 1);
    }
  };

  const formatDistance = ({ date }) => {
    return formatDistanceToNow(date, { addSuffix: true, locale: ptBR });
  };

  const handleOpen = () => {
    setStoryCurrent(0);
  };

  const handleUpdate = () => {
    const { id } = story[storyCurrent];
    const { content } = editStoryForm.watch();
    const data = { content };
    mutateUpdate({ data: data, storyId: id });
    setIsAlertUpdateOpen(false);
  };

  const handleDelete = () => {
    const { id } = story[storyCurrent];
    mutateDelete({ storyId: id });
    setIsAlertDeleteOpen(false);
  };

  return (
    <Dialog onOpenChange={handleOpen}>
      <DialogTrigger disabled={story.length <= 0} asChild>
        <div
          className={twMerge(
            "relative w-[52px] h-[52px] rounded-full cursor-pointer",
            story.length > 0 ? "bg-gradient" : "bg-zinc-500"
          )}>
          <Avatar className="absolute w-full h-full border-[3px] border-transparent">
            <AvatarImage src={!isLoading && data?.profilePicture} />
            <AvatarFallback>
              <img src="/notUserPicture.png" alt="user-not-picture" />
            </AvatarFallback>
          </Avatar>
          <button
            className="absolute -right-[2px] -bottom-[2px] w-[22px] h-[22px] rounded-full bg-blue-500 flex items-center justify-center"
            onClick={() => navigate("/send-story")}>
            <Plus />
          </button>
        </div>
      </DialogTrigger>
      {story.length > 0 && (
        <DialogContent
          className="media-448:h-screen media-448:border-none px-0"
          posClose="right-4 top-7">
          <DialogHeader>
            <div className="w-full h-full space-y-1.5 z-20 bg-gradient-opacity">
              <DialogTitle />
              <DialogDescription />
              <div className="w-full h-[2px] flex items-center justify-center px-1 gap-1">
                {story.map((_, i) => (
                  <span
                    key={i}
                    className={twMerge(
                      "w-full h-[2px] rounded",
                      storyCurrent >= i ? "bg-zinc-50" : "bg-zinc-400"
                    )}
                  />
                ))}
              </div>
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    className="absolute right-12 top-[29px]"
                    asChild>
                    <button>
                      <EllipsisVertical size={21} />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => setIsAlertUpdateOpen(true)}>
                      <PencilRuler />
                      <span>Editar</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setIsAlertDeleteOpen(true)}>
                      <Trash />
                      <span>Excluir</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <Dialog
                open={isAlertUpdateOpen}
                onOpenChange={setIsAlertUpdateOpen}>
                <DialogTrigger asChild>
                  <button className="hidden" />
                </DialogTrigger>
                <DialogContent
                  className="media-448:h-auto px-4 py-5 flex flex-col justify-center"
                  posClose="right-3 top-[11px]">
                  <DialogHeader>
                    <DialogTitle>Editar Story</DialogTitle>
                    <DialogDescription>
                      Editar a descrição do seu story
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex w-full py-4">
                    <Form {...editStoryForm}>
                      <form
                        className="w-full space-y-3"
                        onSubmit={editStoryForm.handleSubmit(handleUpdate)}>
                        <FormField
                          control={editStoryForm.control}
                          name="content"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Textarea
                                  placeholder="Descrição"
                                  className="h-20 resize-none text-sm"
                                  maxLength={150}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-red-500" />
                            </FormItem>
                          )}
                        />
                        <div className="flex justify-end gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsAlertUpdateOpen(false)}>
                            Cancelar
                          </Button>
                          <Button type="submit" disabled={loadingUpdate}>
                            {loadingUpdate ? (
                              <>
                                <Loading />
                                <span>Salvando</span>
                              </>
                            ) : (
                              <span className="font-semibold">Salvar</span>
                            )}
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </div>
                </DialogContent>
              </Dialog>
              <AlertDialog
                open={isAlertDeleteOpen}
                onOpenChange={setIsAlertDeleteOpen}>
                <AlertDialogTrigger asChild>
                  <button className="hidden" />
                </AlertDialogTrigger>
                <AlertDialogContent className="max-w-md">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Excluir Story</AlertDialogTitle>
                    <AlertDialogDescription>
                      Você tem certeza que deseja excluir esse story?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      className="bg-red-500 hover:bg-red-600 text-white">
                      {loadingDelete ? (
                        <Loading className="w-4 h-4" />
                      ) : (
                        <span>Excluir</span>
                      )}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <div className="flex gap-2 px-3 py-1 pb-5">
                <Avatar className="w-10 h-10">
                  <AvatarImage
                    src={story[storyCurrent].author.profilePicture?.url}
                  />
                  <AvatarFallback>
                    <img src="/notUserPicture.png" alt="user-not-picture" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm">
                    {story[storyCurrent].author.username}
                  </span>
                  <span className="text-xs text-zinc-300 text-left">
                    {formatDistance({ date: story[storyCurrent].createdAt })}
                  </span>
                </div>
              </div>
            </div>
          </DialogHeader>
          <section className="absolute top-0 w-full h-[92%] rounded-b-lg bg-zinc-800 overflow-hidden">
            <img
              src={story[storyCurrent].storyImages[0]?.url}
              alt="story-image"
              className="absolute top-0 w-full h-full object-cover"
            />
            <div className="absolute bottom-0 w-full h-[90.5%]">
              <button onClick={handlePrev} className="w-2/4 h-full z-20" />
              <button
                onClick={handleNext}
                className="w-2/4 h-full left-1/2 z-20"
              />
            </div>
          </section>
          <DialogFooter className="absolute bottom-0 w-full h-[8%]">
            <div className="flex flex-col items-center justify-center px-2">
              <div className="flex gap-1">
                <Heart size={16} className="fill-red-600 stroke-red-600" />
                <span className="text-[11px] font-medium">
                  {story[storyCurrent].amountLikes}
                </span>
              </div>
              <span className="text-xs text-zinc-400">Curtidas</span>
            </div>
            <div className="w-full flex items-center">
              <p className="text-sm pr-2">{story[storyCurrent].content}</p>
            </div>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
};
