"use client";

import { type Puzzle } from "@prisma/client";
import React, { useState } from "react";

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

const Hint = ({ puzzle }: { puzzle: Puzzle }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger asChild>
        <Button className="bg-blue-500 hover:bg-blue-600">Hint</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure yu need a hint?</DialogTitle>
          <DialogDescription>
            <p>Taking a hint is a disadvantage</p>
            <p>Points deduction: {puzzle.hintDeduction}</p>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button className="bg-green-500 hover:bg-green-600">Confirm</Button>
          <Button
            className="bg-red-500 hover:bg-red-600"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Hint;
