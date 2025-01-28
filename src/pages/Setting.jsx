import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LogOut, User, Users, Upload } from "lucide-react";

import { useAuth } from "@/context/AuthProvider";

import { useUser } from "@/hooks/useUser";
import { useProfilePicture } from "@/hooks/useProfilePicture";
import { useSettings } from "@/hooks/useSettings";

import { Loading } from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
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

import { editUserSchema } from "@/schemas/editUserSchema";
import { mimetypes } from "@/utils/mimetypes";

export const Setting = () => {
  const settingsUserForm = useForm({
    resolver: zodResolver(editUserSchema),
    mode: "onSubmit",
    defaultValues: {
      file: null,
      name: "",
      surname: "",
      bio: "",
    },
  });

  const [accountActions, setAccountActions] = useState({
    privateAccount: null,
  });

  const [notificationsActions, setNotificationsActions] = useState({
    notifyLikePost: null,
    notifyLikeComment: null,
    notifyLikeCommentTree: null,
    notifyCommentPost: null,
    notifyCommentTree: null,
    notifyNewFollows: null,
    notifyStory: null,
  });

  const { username, logout } = useAuth();

  const { getUser, updateUser, updatePrivateAccount, deleteUser } = useUser();
  const { sendProfilePicture } = useProfilePicture();
  const { getSettings, updateSettings } = useSettings();

  const { data: settingsData } = getSettings();
  const { mutate: updateSettingsFn } = updateSettings();
  const { mutate: updatePrivateAccountFn } = updatePrivateAccount();
  const { data, isLoading } = getUser({ userId: username });
  const { mutate: updateUserFn, isPending: updatePending } = updateUser();
  const { mutate: deleteUserFn, isPending: deletePending } = deleteUser();
  const { mutate: sendProfilePictureFn, isPending: profilePicturePending } =
    sendProfilePicture();

  useEffect(() => {
    if (!isLoading) {
      settingsUserForm.setValue("name", data.name);
      settingsUserForm.setValue("surname", data.surname);
      settingsUserForm.setValue("bio", data.bio || "");
    }
  }, [isLoading, data]);

  const handleSaveProfile = () => {
    const { name, surname, bio, file } = settingsUserForm.getValues();
    const data = { name, surname, bio };
    updateUserFn({ data });

    if (file) {
      const formData = new FormData();
      formData.append("profilePicture", file);
      sendProfilePictureFn({ data: formData });
    }
  };

  const handleDeleteAccount = () => {
    deleteUserFn();
  };

  const handleSwitchChange = (field) => (value) => {
    if (field === "privateAccount") {
      setAccountActions((prev) => ({
        ...prev,
        [field]: value,
      }));
    } else {
      setNotificationsActions((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  useEffect(() => {
    if (settingsData) {
      setNotificationsActions(settingsData);
    }

    if (data) {
      setAccountActions({ privateAccount: data.privateAccount });
    }
  }, [settingsData, data]);

  useEffect(() => {
    if (Object.values(notificationsActions).every((value) => value !== null)) {
      updateSettingsFn({ data: notificationsActions });
    }

    if (Object.values(accountActions).every((value) => value !== null)) {
      updatePrivateAccountFn({ data: accountActions });
    }
  }, [notificationsActions, accountActions]);

  return (
    <main className="relative w-screen h-screen flex items-center justify-center">
      <section className="absolute top-14 flex max-w-md w-full h-container flex-col items-center justify-start overflow-y-scroll px-4 gap-9 pb-5">
        <Form {...settingsUserForm}>
          <form
            onSubmit={settingsUserForm.handleSubmit(handleSaveProfile)}
            className="w-full flex flex-col items-center gap-2">
            <div className="w-full flex justify-between items-center">
              <h2 className="inline py-2 text-lg font-semibold">Perfil</h2>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button type="button" className="flex items-center gap-1">
                    <LogOut size={18} className="rotate-180 stroke-red-500" />
                    <span className="text-sm text-zinc-200">Sair</span>
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Sair</AlertDialogTitle>
                    <AlertDialogDescription>
                      Você deseja realmente sair?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-red-500 hover:bg-red-600 text-white"
                      onClick={() => logout()}>
                      Sair
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            <FormField
              control={settingsUserForm.control}
              name="file"
              render={({ field }) => (
                <FormItem className="w-full flex justify-center items-center flex-col mb-2">
                  <Avatar className="relative w-20 h-20 border-2 border-zinc-700">
                    <button className="absolute w-full h-full flex items-center justify-center rounded-full opacity-0 hover:opacity-100 bg-transparent-color z-10 transition-all duration-200 overflow-hidden">
                      <Upload className="stroke-zinc-400" />
                      <FormControl>
                        <Input
                          type="file"
                          accept={mimetypes.join(",")}
                          className="absolute w-full h-full"
                          onChange={(e) => {
                            const file = e.target.files?.[0] || null;
                            field.onChange(file);
                          }}
                        />
                      </FormControl>
                    </button>
                    <AvatarImage src={data?.profilePicture?.url} />
                    <AvatarFallback>
                      <img src="/notUserPicture.png" alt="user-not-picture" />
                    </AvatarFallback>
                  </Avatar>
                  <FormMessage className="absolute left-0 top-3/4 w-full text-center text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={settingsUserForm.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="relative flex justify-between items-center">
                      <User size={18} className="absolute ml-2" />
                      <Input
                        maxLength={50}
                        autoComplete="off"
                        placeholder="Nome"
                        className="pl-8 h-8"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={settingsUserForm.control}
              name="surname"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="relative flex justify-between items-center">
                      <Users size={18} className="absolute ml-2" />
                      <Input
                        maxLength={100}
                        autoComplete="off"
                        placeholder="Sobrenome"
                        className="pl-8 h-8"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={settingsUserForm.control}
              name="bio"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Textarea
                      maxLength={150}
                      placeholder="Biografia"
                      className="h-20 resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              size="sm"
              disabled={updatePending || profilePicturePending}
              className="mt-2">
              {updatePending || profilePicturePending ? (
                <>
                  <Loading className="border-black w-4 h-4" />
                  <span>Salvando Perfil</span>
                </>
              ) : (
                <span className="font-semibold">Salvar Perfil</span>
              )}
            </Button>
          </form>
        </Form>
        <div className="w-full flex flex-col gap-3">
          <div className="w-full">
            <h2 className="w-full text-lg font-semibold">Privacidade</h2>
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm">Conta Privada</p>
              <p className="text-xs text-zinc-400">
                Alternar minha conta para Conta Privada
              </p>
            </div>
            <Switch
              checked={accountActions.privateAccount}
              onCheckedChange={handleSwitchChange("privateAccount")}
            />
          </div>
        </div>
        <div className="w-full flex flex-col gap-3">
          <div className="w-full">
            <h2 className="w-full text-lg font-semibold">Notificações</h2>
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm">Curtidas nas Publicações</p>
              <p className="text-xs text-zinc-400">
                Notificar novas curtidas em suas publicações
              </p>
            </div>
            <Switch
              checked={notificationsActions.notifyLikePost}
              onCheckedChange={handleSwitchChange("notifyLikePost")}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm">Curtidas nos Comentários</p>
              <p className="text-xs text-zinc-400">
                Notificar novas curtidas em comentários de suas publicações
              </p>
            </div>
            <Switch
              checked={notificationsActions.notifyLikeComment}
              onCheckedChange={handleSwitchChange("notifyLikeComment")}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm">Curtidas nos Comentários Aninhados</p>
              <p className="text-xs text-zinc-400">
                Notificar novas curtidas em seus comentários aninhados
              </p>
            </div>
            <Switch
              checked={notificationsActions.notifyLikeCommentTree}
              onCheckedChange={handleSwitchChange("notifyLikeCommentTree")}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm">Comentários em Publicações</p>
              <p className="text-xs text-zinc-400">
                Notificar novos comentários em suas publicações
              </p>
            </div>
            <Switch
              checked={notificationsActions.notifyCommentPost}
              onCheckedChange={handleSwitchChange("notifyCommentPost")}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm">Notificar Comentários Aninhados</p>
              <p className="text-xs text-zinc-400">
                Notificar quando alguém comentar em seus comentários
              </p>
            </div>
            <Switch
              checked={notificationsActions.notifyCommentTree}
              onCheckedChange={handleSwitchChange("notifyCommentTree")}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm">Novos Seguidores</p>
              <p className="text-xs text-zinc-400">
                Notificar quanda há novos seguidores
              </p>
            </div>
            <Switch
              checked={notificationsActions.notifyNewFollows}
              onCheckedChange={handleSwitchChange("notifyNewFollows")}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm">Curtida nos Stories</p>
              <p className="text-xs text-zinc-400">
                Notificar novas curtidas em seus stories
              </p>
            </div>
            <Switch
              checked={notificationsActions.notifyStory}
              onCheckedChange={handleSwitchChange("notifyStory")}
            />
          </div>
        </div>
        <div className="w-full flex flex-col gap-3">
          <div className="w-full">
            <h2 className="w-full text-lg font-semibold">Excluir Conta</h2>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <div className="py-2">
                <Button variant="destructive">
                  {deletePending ? (
                    <>
                      <Loading className="w-4 h-4" />
                      <span>Excluindo Conta</span>
                    </>
                  ) : (
                    <span>Excluir Conta</span>
                  )}
                </Button>
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Excluir Conta</AlertDialogTitle>
                <AlertDialogDescription>
                  Ao excluir sua conta, você perdera tudo o que já foi feito,
                  você realmente deseja excluir sua conta?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-500 hover:bg-red-600 text-white"
                  onClick={handleDeleteAccount}>
                  Excluir
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </section>
    </main>
  );
};
