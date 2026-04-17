import { Form } from "@/features/profile-picture/components/form";
import { Spinner } from "@/shared/components/ui/spinner";
import { useMe } from "@/features/profile/hooks/use-me";
import { Button } from "@/shared/components/ui/button";
import { Avatar } from "@/shared/components/avatar";
import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";

export const UploadProfilePicture = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { data, isLoading, isError, error } = useMe();

  if (isError) {
    toast.error(error.message);
  }

  return (
    <div className="mt-2">
      <div className="flex justify-center mb-3">
        {isLoading || !data ? (
          <div className="size-20 flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <Avatar className="size-20" profilePicture={data.profilePicture} />
        )}
      </div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="secondary" className="w-full">
            Escolher Foto de Perfil
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Enviar Foto de Perfil</DialogTitle>
            <DialogDescription>Envie sua foto de perfil aqui.</DialogDescription>
          </DialogHeader>
          <Form setIsOpen={setIsOpen} />
        </DialogContent>
      </Dialog>
    </div>
  );
};
