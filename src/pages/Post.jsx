import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { SendPost } from "@/components/SendPost";
import { SendStory } from "@/components/SendStory";

export const Post = () => {
  return (
    <main className="relative w-screen h-screen flex items-center justify-center">
      <Tabs
        defaultValue="post"
        className="absolute top-14 max-w-md w-full h-container">
        <TabsList className="flex bg-zinc-900 bg-transparent">
          <TabsTrigger value="post" className="flex-1">
            <span>Publicação</span>
          </TabsTrigger>
          <TabsTrigger value="story" className="flex-1">
            <span>Story</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="post" className="h-container-tabs">
          <SendPost />
        </TabsContent>
        <TabsContent value="story" className="h-container-tabs">
          <SendStory />
        </TabsContent>
      </Tabs>
    </main>
  );
};
