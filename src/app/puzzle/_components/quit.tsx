"use client";

import { type inferProcedureOutput } from "@trpc/server";
import { Ban } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

import { type AppRouter } from "~/server/api/root";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

import { api } from "~/trpc/react";

const Quit = ({
  puzzle,
}: {
  puzzle: inferProcedureOutput<AppRouter["submission"]["startPuzzle"]>;
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const quitPuzzle = api.submission.quitPuzzle.useMutation();
  const startPuzzle = api.useUtils().submission.startPuzzle;

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger asChild>
        <Button className="bg-red-500 hover:bg-red-600">
          <Ban />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to quit?</DialogTitle>
          <DialogDescription>
            <span>Once you quit you can never attempt this puzzle again</span>
            <span>You won&apos;t lose any points (even if hint was taken)</span>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            className="bg-red-500 hover:bg-red-600"
            onClick={() => {
              toast.loading("Quiting puzzle...");
              quitPuzzle.mutate(
                {
                  puzzleId: puzzle.id,
                },
                {
                  onSuccess: () => {
                    toast.dismiss();
                    toast.success("Puzzle quited successfully");
                    void startPuzzle.refetch();
                    setOpen(false);
                  },
                  onError: (error) => {
                    toast.dismiss();
                    toast.error(error.message);
                    setOpen(false);
                  },
                },
              );
            }}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Quit;
