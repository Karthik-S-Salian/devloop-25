"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Puzzle } from "@prisma/client";
import { LucidePlus } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { type z } from "zod";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Form } from "~/components/ui/form";

import { api } from "~/trpc/react";
import { solvePuzzleZ } from "~/zod/submissionZ";

const Submission = ({ puzzle }: { puzzle: Puzzle }) => {
  const [open, setOpen] = useState(false);

  const solvePuzzle = api.submission.solvePuzzle.useMutation();

  const formSchema = solvePuzzleZ;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      puzzleId: puzzle.id,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    toast.loading("Adding Stock...");
    solvePuzzle.mutate(
      {
        puzzleId: values.puzzleId,
      },
      {
        onSuccess: () => {
          toast.dismiss();
          toast.success("Stock Added Successfully");
          setOpen(false);
        },
        onError: (error) => {
          toast.dismiss();
          toast.error(error.message);
          setOpen(false);
        },
      },
    );
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        form.reset();
      }}
    >
      <DialogTrigger asChild>
        <Button>Submission</Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <DialogHeader>
              <DialogTitle>Add Submission</DialogTitle>
            </DialogHeader>

            <DialogFooter>
              <Button type="submit">Add</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default Submission;
