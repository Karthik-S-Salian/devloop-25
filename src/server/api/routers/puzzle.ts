import { type PuzzleDifficulty, type SubmissionStatus } from "@prisma/client";
import { TRPCError } from "@trpc/server";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

const puzzleRouter = createTRPCRouter({
  // Get(Retrieve), NOTE: infiniteQuery is always preferred
  getPuzzles: protectedProcedure.query(async ({ ctx }) => {
    try {
      const serverSettings = await ctx.db.serverSettings.findFirst();

      if (!serverSettings?.roundOneLive)
        return [] as unknown as
          | {
            id: string;
            name: string;
            route: string;
            difficulty: PuzzleDifficulty;
            minPoints: number;
            minusPoints: number;
            plusPoints: number;
            Submission: {
              id: string;
              createdAt: Date;
              updatedAt: Date;
              status: SubmissionStatus;
              startTime: Date;
              endTime: Date | null;
              hintTaken: boolean;
              points: number | null;
              answer: string | null;
              userId: string;
              puzzleId: string;
            };
          }[]
          | {
            id: string;
            name: string;
            route: string;
            difficulty: PuzzleDifficulty;
            minPoints: number;
            minusPoints: number;
            plusPoints: number;
            Submission: undefined;
          }[];

      const puzzles = await ctx.db.puzzle.findMany({
        select: {
          id: true,
          name: true,
          difficulty: true,
          route: true,
          minPoints: true,
          minusPoints: true,
          plusPoints: true,
          Submission: {
            where: {
              userId: {
                equals: ctx.session.user.id,
              },
            },
          },
        },
      });

      const refinedPuzzles = [];

      for (const puzzle of puzzles) {
        if (puzzle.Submission.length <= 0)
          refinedPuzzles.push({
            ...puzzle,
            Submission: undefined,
          });
        else
          refinedPuzzles.push({
            ...puzzle,
            Submission: puzzle.Submission[0]!,
          });
      }

      return refinedPuzzles;
    } catch (error) {
      console.log(error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong",
      });
    }
  }),
});

export default puzzleRouter;
