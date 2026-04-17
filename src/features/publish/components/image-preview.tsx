import { ImageDeleteDialog } from "@/features/publish/components/image-delete-dialog";
import { ImageEmptyState } from "@/features/publish/components/image-empty-state";

interface ImagePreviewProps {
  url: string | null;
  onDelete: () => void;
}

export const ImagePreview = ({ url, onDelete }: ImagePreviewProps) => (
  <div className="h-fit order-1">
    <div className="relative w-full aspect-square">
      {!url ? (
        <ImageEmptyState />
      ) : (
        <>
          <img src={url} alt="preview" className="absolute size-full object-cover rounded-md select-none" />
          <ImageDeleteDialog onConfirm={onDelete} />
        </>
      )}
    </div>
  </div>
);
