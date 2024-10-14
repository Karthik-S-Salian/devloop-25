"use client";

import { type inferProcedureOutput } from "@trpc/server";
import { Lightbulb } from "lucide-react";
import React, { useEffect, useState } from "react";
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

const Hint = ({
  puzzle,
}: {
  puzzle: inferProcedureOutput<AppRouter["submission"]["startPuzzle"]>;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [noHint, setNoHint] = useState<boolean>(false);
  const [hint, setHint] = useState<string | null>(null);

  const helpPuzzle = api.submission.helpPuzzle.useMutation();
  const startPuzzle = api.useUtils().submission.startPuzzle;

  useEffect(() => {
    if (puzzle.Submission[0].hintTaken)
      helpPuzzle.mutate(
        { puzzleId: puzzle.id },
        {
          onSuccess: (dbPuzzle) => {
            setNoHint(dbPuzzle.hint.length === 0);
            setHint(dbPuzzle.hint);
          },
        },
      );
    // helpPuzzle as a dependency will cause infinite render loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [puzzle]);

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger asChild>
        <Button className="bg-blue-500 hover:bg-blue-600">
          <Lightbulb />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you need a hint?</DialogTitle>
          <DialogDescription className="flex flex-col">
            <span>Taking a hint is a disadvantage</span>
            <span>Points deduction: {puzzle.minusPoints ?? 0} Points</span>
          </DialogDescription>
        </DialogHeader>
        {hint && (
          <>
            <p>You have already taken hint for this puzzle</p>
            <p>Hint: {hint}</p>
          </>
        )}
        {noHint && (
          <>
            <p>Sorry, there is no hint for this puzzle</p>
            <p>Chill! No points deducted</p>
          </>
        )}
        <DialogFooter>
          <Button
            className="bg-blue-500 hover:bg-blue-600"
            onClick={() => {
              toast.loading("Receiving hint...");
              helpPuzzle.mutate(
                {
                  puzzleId: puzzle.id,
                },
                {
                  onSuccess: (dbPuzzle) => {
                    toast.dismiss();
                    if (dbPuzzle.hint)
                      toast.success("Hint received successfully");
                    else toast.error("No hint available! No points deducted");
                    void startPuzzle.refetch();
                    setNoHint(dbPuzzle.hint.length === 0);
                    setHint(dbPuzzle.hint);
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
            disabled={!!hint}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Hint;
