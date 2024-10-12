"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type inferProcedureOutput } from "@trpc/server";
import { Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { type z } from "zod";

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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

import { useSubmission } from "~/store";
import { api } from "~/trpc/react";
import { submitPuzzleZ } from "~/zod/submissionsZ";

const Submission = ({
  puzzle,
}: {
  puzzle: inferProcedureOutput<AppRouter["submission"]["startPuzzle"]>;
}) => {
  const { manualSubmission } = useSubmission();

  const [open, setOpen] = useState<boolean>(false);

  const submitPuzzle = api.submission.submitPuzzle.useMutation();
  const startPuzzle = api.useUtils().submission.startPuzzle;

  const formSchema = submitPuzzleZ;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      puzzleId: puzzle.id,
      answer: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    toast.loading("Submitting puzzle...");
    submitPuzzle.mutate(
      {
        puzzleId: values.puzzleId,
        answer: values.answer,
      },
      {
        onSuccess: () => {
          toast.dismiss();
          toast.success("Submitted Puzzle Successfully");
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
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        form.reset();
      }}
    >
      {manualSubmission && (
        <DialogTrigger asChild>
          <Button className="bg-green-500 hover:bg-green-600">
            <Send />
          </Button>
        </DialogTrigger>
      )}
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <DialogHeader>
              <DialogTitle>Puzzle Submission</DialogTitle>
              <DialogDescription className="flex flex-col">
                <span>
                  If answer is correct, depending on time usage and hint usage
                  points will be awarded
                </span>
                <span>
                  If answer is wrong, no points will be awarded or deducted
                </span>
              </DialogDescription>
            </DialogHeader>

            <FormField
              control={form.control}
              name="answer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Answer</FormLabel>
                  <FormControl>
                    <Input placeholder="Answer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit" className="bg-green-500 hover:bg-green-600">
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default Submission;
