import { UploadProfilePicture } from "@/features/profile-picture/components/upload-profile-picture";
import { Tabs, TabsContent, TabsTrigger, TabsList } from "@/components/ui/tabs";
import { UpdateProfile } from "@/features/profile/components/update-profile";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

const PARAM_NAME = "tab";
const TABS = {
  editProfile: "edit-profile",
  notification: "notification",
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
    <section className="max-w-lg w-full mx-auto px-3 py-8">
      <header className="w-full">
        <h1 className="text-lg font-medium tracking-tight text-balance">Configurações</h1>
      </header>
      <Tabs value={active} onValueChange={handleChangeTab}>
        <TabsList className="my-2" variant="line">
          <TabsTrigger value={TABS.editProfile}>Editar perfil</TabsTrigger>
          <TabsTrigger value={TABS.notification}>Notificações</TabsTrigger>
        </TabsList>
        <TabsContent value={TABS.editProfile} className="space-y-1">
          <UploadProfilePicture />
          <UpdateProfile />
        </TabsContent>
        <TabsContent value={TABS.notification} className="space-y-1"></TabsContent>
      </Tabs>
    </section>
  );
};
