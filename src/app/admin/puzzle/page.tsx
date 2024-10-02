import { type NextPage } from "next";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

import AddPuzzle from "~/app/admin/puzzle/_components/addPuzzle";

const Test: NextPage = () => {
  return (
    <Tabs defaultValue="view" className="w-full">
      <TabsList className="w-full">
        <TabsTrigger
          value="view"
          className="w-1/3 transition-all duration-300 data-[state=active]:w-2/3"
        >
          View
        </TabsTrigger>
        <TabsTrigger
          value="add"
          className="w-1/3 transition-all duration-300 data-[state=active]:w-2/3"
        >
          Add
        </TabsTrigger>
      </TabsList>
      <TabsContent value="view" className="container">
        {/* <ViewPuzzle /> */}
      </TabsContent>
      <TabsContent value="add" className="container">
        <AddPuzzle />
      </TabsContent>
    </Tabs>
  );
};

export default Test;
