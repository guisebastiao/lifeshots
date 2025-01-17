import { Stories } from "@/components/Stories";

export const Feed = () => {
  return (
    <main className="relative w-screen h-screen flex items-center justify-center">
      <section className="absolute top-16 max-w-md w-full h-container">
        <Stories />
      </section>
    </main>
  );
};
