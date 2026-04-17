import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/shared/components/ui/empty";
import { ImageUp } from "lucide-react";

export const ImageEmptyState = () => (
  <div className="flex-1 aspect-square border rounded-md bg-foreground/2 flex">
    <Empty className="my-auto">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <ImageUp />
        </EmptyMedia>
        <EmptyTitle>Sem imagens</EmptyTitle>
        <EmptyDescription>Envie imagens para sua publicação</EmptyDescription>
      </EmptyHeader>
    </Empty>
  </div>
);
