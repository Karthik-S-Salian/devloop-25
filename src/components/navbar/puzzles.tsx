import Link from "next/link";
import React from "react";
import { type UrlObject } from "url";

import { auth } from "~/server/auth";

import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Separator } from "~/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";

import { api } from "~/trpc/server";

const Puzzles = async () => {
  const session = await auth();

  const puzzles = session ? await api.puzzle.getPuzzles() : [];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Puzzles</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Puzzle List</SheetTitle>
          <SheetDescription>
            These are shown only during{" "}
            <span className="underline">development</span> server
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-full py-10">
          <div className="space-y-4">
            <Separator />
            <div className="flex flex-col gap-4">
              {puzzles.map((puzzle, idx) => (
                <Button key={idx} asChild>
                  <Link
                    href={`/puzzle/${puzzle.route}` as unknown as UrlObject}
                  >
                    {puzzle.name}
                  </Link>
                </Button>
              ))}
            </div>
            <Separator />
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default Puzzles;
