import { NotificationSetting } from "@/features/notification-setting/components/notification-setting";
import { UploadProfilePicture } from "@/features/profile-picture/components/upload-profile-picture";
import { DeleteProfilePicture } from "@/features/profile-picture/components/delete-profile-picture";
import { Tabs, TabsContent, TabsTrigger, TabsList } from "@/components/ui/tabs";
import { UpdateProfile } from "@/features/profile/components/update-profile";
import { LogoutAlert } from "@/features/auth/components/logout-alert";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

const PARAM_NAME = "tab";
const TABS = {
  editProfile: "edit-profile",
  notification: "notification",
  privacy: "privacy",
  password: "password",
  logout: "logout",
};

export const Setting = () => {
  const [params, setParams] = useSearchParams();

  const active = params.get(PARAM_NAME) ?? TABS.editProfile;

  const handleChangeTab = (value: string | undefined) => {
    if (!value) return;
    setParams({ [PARAM_NAME]: value });
  };

  useEffect(() => {
    if (!active) {
      setParams({ [PARAM_NAME]: TABS.editProfile });
    }
  }, []);

  return (
    <section className="max-w-lg w-full flex-1 mx-auto px-3 py-8">
      <header className="w-full">
        <h1 className="text-lg font-medium tracking-tight text-balance">Configurações</h1>
      </header>
      <Tabs value={active} onValueChange={handleChangeTab}>
        <TabsList
          className="flex items-start w-full overflow-x-scroll overflow-y-hidden whitespace-nowrap no-scrollbar my-2"
          variant="line"
        >
          <TabsTrigger value={TABS.editProfile}>Editar perfil</TabsTrigger>
          <TabsTrigger value={TABS.notification}>Notificações</TabsTrigger>
          <TabsTrigger value={TABS.privacy}>Privacidade</TabsTrigger>
          <TabsTrigger value={TABS.password}>Atualizar senha</TabsTrigger>
          <TabsTrigger value={TABS.logout}>Sair</TabsTrigger>
        </TabsList>
        <TabsContent value={TABS.editProfile} className="space-y-1">
          <UploadProfilePicture />
          <DeleteProfilePicture />
          <UpdateProfile />
        </TabsContent>
        <TabsContent value={TABS.notification} className="space-y-1">
          <NotificationSetting />
        </TabsContent>
        <TabsContent value={TABS.privacy} className="space-y-1">
          <h1>Privacy</h1>
        </TabsContent>
        <TabsContent value={TABS.password} className="space-y-1">
          <h1>Password</h1>
        </TabsContent>
        <TabsContent value={TABS.logout} className="space-y-1">
          <LogoutAlert />
        </TabsContent>
      </Tabs>
    </section>
  );
};
