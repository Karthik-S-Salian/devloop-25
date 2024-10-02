"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type Puzzle } from "@prisma/client";
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
import { idZ } from "~/zod/generalZ";

const Submission = ({ puzzle }: { puzzle: Puzzle }) => {
  const [open, setOpen] = useState(false);

  const submitPuzzle = api.submission.submitPuzzle.useMutation();

  const formSchema = idZ;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: puzzle.id,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    toast.loading("Submitting puzzle...");
    submitPuzzle.mutate(
      {
        id: values.id,
      },
      {
        onSuccess: () => {
          toast.dismiss();
          toast.success("Submitted Puzzle Successfully");
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
              <DialogTitle>Puzzle Submission</DialogTitle>
            </DialogHeader>

            <DialogFooter>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default Submission;
