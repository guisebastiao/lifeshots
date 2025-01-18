import { Bell } from "lucide-react";

export const Header = () => {
  return (
    <section className="fixed top-0 w-full h-14 flex justify-center border-b bg-zinc-950">
      <header className="max-w-md w-full h-full flex items-center justify-between px-3">
        <h1 className="text-2xl font-bold text-zinc-50">LifeShots</h1>
        <Bell size={21} />
      </header>
    </section>
  );
};
