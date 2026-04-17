import { InputGroup, InputGroupAddon, InputGroupInput } from "@/shared/components/ui/input-group";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/shared/components/ui/field";
import type { DeleteAccountRequest } from "@/features/account/types/delete-account-types";
import { deleteAccountSchema } from "@/features/account/schemas/delete-account-schema";
import { useDeleteAccount } from "@/features/account/hooks/use-delete-account";
import { Eye, EyeOff, Lock, TriangleAlert } from "lucide-react";
import { Spinner } from "@/shared/components/ui/spinner";
import { Button } from "@/shared/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useSession } from "@/app/hooks/use-session";
import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";

export const DeleteAccount = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { logout } = useSession();

  const { mutate, isPending } = useDeleteAccount();

  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<DeleteAccountRequest>({
    resolver: zodResolver(deleteAccountSchema),
    mode: "onChange",
    values: {
      password: "",
    },
  });

  const handleDeleteAccount = (data: DeleteAccountRequest) => {
    mutate(
      { data },
      {
        onSuccess: () => {
          form.reset();
          logout();
          toast.success("Sua conta foi excluida com sucesso.");
        },
        onError: ({ code, message, details }) => {
          if (code === "VALIDATION_ERROR") {
            details.forEach((err) => {
              form.setError(err.field, {
                message: err.error,
              });
            });

            return;
          }

          toast.error(message);
        },
      },
    );
  };

  const onOpenChange = () => {
    if (isOpen) form.reset();
    setIsOpen((prev) => !prev);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="destructive" className="w-full">
          <TriangleAlert />
          Excluir Conta
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <form onSubmit={form.handleSubmit(handleDeleteAccount)}>
          <DialogHeader>
            <DialogTitle>Excluir Conta</DialogTitle>
            <DialogDescription>Você tem certeza que deseja excluir sua conta?</DialogDescription>
          </DialogHeader>
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Senha</FieldLabel>
                <FieldDescription>Para confirmar a exclusão da conta, informe sua senha abaixo.</FieldDescription>
                <InputGroup>
                  <InputGroupInput
                    {...field}
                    type={showPassword ? "text" : "password"}
                    disabled={isPending}
                    placeholder="Informe sua nova senha."
                    aria-invalid={fieldState.invalid}
                  />
                  <InputGroupAddon>
                    <Lock />
                  </InputGroupAddon>
                  <InputGroupAddon align="inline-end">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </Button>
                  </InputGroupAddon>
                </InputGroup>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <DialogFooter className="mt-3.5">
            <DialogClose asChild>
              <Button variant="outline" disabled={isPending}>
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit" variant="destructive" disabled={isPending}>
              {isPending && <Spinner className="text-destructive" />}
              Excluir
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
