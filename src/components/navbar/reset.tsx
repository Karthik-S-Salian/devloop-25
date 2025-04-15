"use client";

import React from "react";
import { toast } from "sonner";

import { Button } from "~/components/ui/button";

import { api } from "~/trpc/react";

const Reset = () => {
  const resetAllPuzzle = api.submission.resetAllPuzzle.useMutation();

  const getPuzzles = api.useUtils().puzzle.getPuzzles;

  return (
    <Button
      className="bg-cyan-500 text-white transition-colors hover:bg-cyan-600"
      onClick={() => {
        toast.loading("Resetting all puzzles");
        resetAllPuzzle.mutate(void null, {
          onSuccess: () => {
            toast.dismiss();
            void getPuzzles.refetch();
            toast.success("All puzzles reset");
          },
          onError: (error) => {
            toast.dismiss();
            toast.error(error.message);
          },
        });
      }}
    >
      Reset
    </Button>
  );
};

export default Reset;
