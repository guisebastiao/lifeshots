import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search as SearchIcon, X } from "lucide-react";
import { useForm } from "react-hook-form";

import { useSearch } from "@/hooks/useSearch";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Loading } from "@/components/Loading";

import { searchSchema } from "@/schemas/searchSchema";

export const Search = () => {
  const { username } = JSON.parse(localStorage.getItem("auth"));

  const searchForm = useForm({
    resolver: zodResolver(searchSchema),
    mode: "onSubmit",
    defaultValues: {
      search: "",
    },
  });

  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const { getSearch } = useSearch();

  const { data, isLoading, fetchNextPage, hasNextPage } = getSearch();

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  const handleSearch = () => {
    const { search } = searchForm.watch();
    setSearchParams({ search });
  };

  const handleNavigate = ({ userId }) => {
    document.body.style.pointerEvents = "auto";

    if (username.toLowerCase() === userId.toLowerCase().trim()) {
      navigate("/profile");
    } else {
      navigate(`/user/${userId}`);
    }
  };

  return (
    <main className="relative w-screen h-screen flex items-center justify-center">
      <section className="absolute top-14 flex max-w-md w-full h-container flex-col items-center justify-start py-5 px-4 gap-1">
        <Form {...searchForm}>
          <form
            onSubmit={searchForm.handleSubmit(handleSearch)}
            className="w-full flex items-center px-2 rounded-md border bg-zinc-900 border-zinc-700 mb-5">
            <SearchIcon size={20} />
            <FormField
              control={searchForm.control}
              name="search"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="pesquisar perfil..."
                      autoComplete="off"
                      {...field}
                      className="border-none w-full focus-visible:ring-0 px-2 h-8 pb-[6px]"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              variant="outline"
              onClick={() => setSearchParams({})}
              className="absolute w-5 h-5 rounded-sm p-0 bg-transparent hover:bg-transparent hover:border-zinc-500 right-6">
              <X size={18} />
            </Button>
          </form>
        </Form>
        {isLoading ? (
          <Loading />
        ) : data.pages[0].users.length <= 0 && searchParams.get("search") ? (
          <span>Nenhum usuário foi encontrado</span>
        ) : (
          <div className="w-full h-full flex flex-col gap-1">
            {data.pages.map((page) =>
              page.users.map((user) => (
                <div
                  key={user.username}
                  className="w-full flex items-center gap-2 px-1 py-2 bg-zinc-900 rounded-md border">
                  <div className="flex w-full gap-2">
                    <Avatar className="w-10 h-10">
                      <AvatarImage
                        src={user.profilePicture}
                        alt="profile-picture"
                      />
                      <AvatarFallback>
                        <img src="/notUserPicture.png" alt="user-not-picture" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm">{user.username}</span>
                      <div className="flex gap-2">
                        <div className="flex gap-1 items-center">
                          <span className="text-[11px] text-zinc-300 font-bold">
                            {user.amountPosts}
                          </span>
                          <span className="text-[10px] text-zinc-400">
                            {user.amountPosts === 1
                              ? "Publicação"
                              : "Publicações"}
                          </span>
                        </div>
                        <div className="flex gap-1 items-center">
                          <span className="text-[11px] text-zinc-300 font-bold">
                            {user.amountFollowers}
                          </span>
                          <span className="text-[10px] text-zinc-400">
                            {user.amountFollowers === 1
                              ? "Seguidor"
                              : "Seguidores"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button
                    className="px-2 h-7 text-xs font-bold mr-2"
                    onClick={() => handleNavigate({ userId: user.username })}>
                    Ver perfil
                  </Button>
                </div>
              ))
            )}
            {hasNextPage && (
              <div ref={ref} className="flex items-center justify-center py-1">
                <Loading />
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  );
};
