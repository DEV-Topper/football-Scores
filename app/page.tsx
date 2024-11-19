import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Aboutus from "./components/Aboutus/index";

import Wework from "./components/Wework/index";
import { Leagues } from "./components/Leagues";
import { Matches } from "./components/Matches";
import { LiveScores } from "./components/Livescores";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
    <h1 className="text-4xl font-bold mb-8 text-center">Football Dashboard</h1>
    <Tabs defaultValue="leagues" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="leagues">Leagues</TabsTrigger>
        <TabsTrigger value="matches">Matches</TabsTrigger>
        <TabsTrigger value="live-scores">Live Scores</TabsTrigger>
      </TabsList>
      <TabsContent value="leagues">
        <Leagues />
      </TabsContent>
      <TabsContent value="matches">
        <Matches />
      </TabsContent>
      <TabsContent value="live-scores">
        <LiveScores />
      </TabsContent>
    </Tabs>
  </div>
  );
}
