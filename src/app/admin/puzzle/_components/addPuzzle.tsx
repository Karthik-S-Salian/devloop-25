"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { PuzzleType } from "@prisma/client";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { type z } from "zod";

import { Button } from "~/components/ui/button";
import { ComboBox } from "~/components/ui/custom/combobox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

import { api } from "~/trpc/react";
import { addPuzzleZ } from "~/zod/puzzleZ";

const AddPuzzle = () => {
  const addPuzzle = api.puzzle.addPuzzle.useMutation();

  const formSchema = addPuzzleZ;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      route: "",
      isOneTimeUse: undefined,
      puzzleType: "POINTS",
      hint: "",
      hintDeduction: 0,
      solution: "",
      points: 0,
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const toastId = toast.loading("Adding puzzle...");
    addPuzzle.mutate(data, {
      onSuccess: () => {
        toast.dismiss(toastId);
        toast.success("Puzzle added successfully");
        form.reset();
      },
      onError: (error) => {
        console.log(error);
        toast.dismiss(toastId);
        toast.error("Failed to add puzzle");
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="route"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Route</FormLabel>
              <FormControl>
                <Input placeholder="/xyz" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="puzzleType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Puzzle Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.keys(PuzzleType).map((puzzleType, idx) => (
                    <SelectItem key={idx} value={puzzleType}>
                      {puzzleType}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isOneTimeUse"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Redeem Code Usage</FormLabel>
              <FormControl>
                <ComboBox
                  placeholder="Redeem Code Usage"
                  disabled={form.getValues("puzzleType") === "POINTS"}
                  data={[
                    { id: "true", name: "One Time Use" },
                    { id: "false", name: "Multiple Use" },
                  ]}
                  value={
                    field.value ? (field.value ? "true" : "false") : undefined
                  }
                  setValue={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="solution"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Solution</FormLabel>
              <FormControl>
                <Input placeholder="Solution" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="points"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Points</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="10"
                  {...field}
                  onChange={(e) =>
                    field.onChange(parseInt(e.target.value) ?? 0)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="hint"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hint</FormLabel>
              <FormControl>
                <Input placeholder="Hint" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="hintDeduction"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hint Deduction</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="10"
                  {...field}
                  onChange={(e) =>
                    field.onChange(parseInt(e.target.value) ?? 0)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default AddPuzzle;
