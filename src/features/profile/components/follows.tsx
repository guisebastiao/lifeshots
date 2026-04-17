import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/shared/components/ui/empty";
import type { ProfileResponse } from "@/features/profile/types/profile-types";
import { useGetFollows } from "@/features/follow/hooks/use-get-follows";
import { type FollowType } from "@/features/follow/types/follow-types";
import { Spinner } from "@/shared/components/ui/spinner";
import { Button } from "@/shared/components/ui/button";
import { useCallback, useRef, useMemo } from "react";
import { Avatar } from "@/shared/components/avatar";
import { useNavigate } from "react-router-dom";
import { UserRoundX } from "lucide-react";
import { toast } from "sonner";

interface FollowsProps {
  profile: ProfileResponse;
  type: FollowType;
}

export const Follows = ({ profile, type }: FollowsProps) => {
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage, isError, error } = useGetFollows({
    profileId: profile.id,
    type,
  });

  const observer = useRef<IntersectionObserver | null>(null);
  const navigate = useNavigate();

  const follows = useMemo(() => data?.pages.flatMap((page) => page.data) ?? [], [data]);

  const lastItemRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node) return;

      observer.current?.disconnect();

      observer.current = new IntersectionObserver(([entry]) => {
        if (!entry?.isIntersecting) return;
        if (hasNextPage && !isFetchingNextPage) fetchNextPage();
      });

      observer.current.observe(node);
    },
    [isFetchingNextPage, hasNextPage, fetchNextPage],
  );

  if (isLoading) {
    return (
      <div className="flex justify-center py-3">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    toast.error(error.message);
  }

  if (!data || follows.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <UserRoundX />
          </EmptyMedia>
          <EmptyTitle>Nenhuma conexão ainda</EmptyTitle>
          <EmptyDescription>Quando houver pessoas seguindo ou sendo seguidas, elas aparecerão aqui.</EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <div className="no-scrollbar overflow-y-auto">
      {follows.map((follow, index) => {
        const isLast = index === follows.length - 1;

        return (
          <div
            key={follow.id}
            ref={isLast ? lastItemRef : undefined}
            className="flex justify-between items-center py-2"
          >
            <div className="flex gap-2">
              <Avatar className="size-10" profilePicture={follow.profilePicture} />
              <div className="space-y-px">
                <h2 className="text-[15px] font-semibold text-ellipsis leading-4">{follow.handle}</h2>
                <h3 className="text-sm font-medium text-foreground/75 text-ellipsis">{follow.fullName}</h3>
                <div className="flex items-center gap-1 text-xs font-medium text-foreground/60 leading-5">
                  <span>{follow.postsCount} publicação</span>
                  <span>&bull;</span>
                  <span>{follow.followingCount} seguindo</span>
                  <span>&bull;</span>
                  <span>{follow.followersCount} seguidor</span>
                </div>
              </div>
            </div>
            <Button size="sm" variant="ghost" className="text-xs" onClick={() => navigate(`/profile/${follow.handle}`)}>
              Ver Perfil
            </Button>
          </div>
        );
      })}
      {isFetchingNextPage && (
        <div className="flex justify-center py-3">
          <Spinner />
        </div>
      )}
    </div>
  );
};
