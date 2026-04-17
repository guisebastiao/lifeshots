import { NotificationSetting } from "@/features/notification-setting/components/notification-setting";
import { UploadProfilePicture } from "@/features/profile-picture/components/upload-profile-picture";
import { DeleteProfilePicture } from "@/features/profile-picture/components/delete-profile-picture";
import { UpdatePassword } from "@/features/account/components/update-password";
import { UpdateProfile } from "@/features/profile/components/update-profile";
import { UpdatePrivacy } from "@/features/account/components/update-privacy";
import { DeleteAccount } from "@/features/account/components/delete-account";
import { LogoutAlert } from "@/features/auth/components/logout-alert";

export const Setting = () => {
  return (
    <section className="max-w-2xl w-full flex-1 mx-auto p-3">
      <header className="w-full">
        <h1 className="text-base font-medium tracking-tight text-balance">Configurações</h1>
      </header>
      <div className="no-scrollbar">
        <div className="space-y-1">
          <h2 className="text-[15px] font-medium text-foreground/90 mb-2">Perfil</h2>
          <UploadProfilePicture />
          <DeleteProfilePicture />
          <UpdateProfile />
        </div>
        <div className="space-y-1">
          <h2 className="text-[15px] font-medium text-foreground/90 mt-6 mb-2">Notificações</h2>
          <NotificationSetting />
        </div>
        <div className="space-y-1">
          <h2 className="text-[15px] font-medium text-foreground/90 mt-6 mb-2">Privacidade</h2>
          <UpdatePrivacy />
        </div>
        <div className="space-y-1">
          <h2 className="text-[15px] font-medium text-foreground/90 mt-6 mb-2">Atualizar Senha</h2>
          <UpdatePassword />
        </div>
        <div className="space-y-1">
          <h2 className="text-[15px] font-medium text-foreground/90 mt-4 mb-2">Deletar Conta</h2>
          <p className="text-sm text-foreground/75 pb-2">Excluir minha conta agora.</p>
          <DeleteAccount />
        </div>
        <div>
          <h2 className="text-[15px] font-medium text-foreground/90 mt-4 mb-2">Desconectar</h2>
          <p className="text-sm text-foreground/75 pb-2">Desconectar da minha conta.</p>
          <LogoutAlert />
        </div>
      </div>
    </section>
  );
};
