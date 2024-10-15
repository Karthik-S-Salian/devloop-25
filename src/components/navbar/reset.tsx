"use client";

import React from "react";
import { toast } from "sonner";

import { Button } from "~/components/ui/button";

import { api } from "~/trpc/react";

const Reset = () => {
  const resetAllPuzzle = api.submission.resetAllPuzzle.useMutation();

  const getRoundPuzzles = api.useUtils().puzzle.getRoundPuzzles;

  return (
    <Button
      onClick={() => {
        toast.loading("Resetting all puzzles");
        resetAllPuzzle.mutate(void null, {
          onSuccess: () => {
            toast.dismiss();
            void getRoundPuzzles.refetch();
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
