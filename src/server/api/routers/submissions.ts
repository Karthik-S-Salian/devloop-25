import { TRPCError } from "@trpc/server";

import { startPuzzleZ, submitPuzzleZ } from "~/zod/submission";

import { createTRPCRouter, protectedProcedure } from "../trpc";

const submissionRouter = createTRPCRouter({
  startPuzzle: protectedProcedure
    .input(startPuzzleZ)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.submission.create({
        data: {
          userId: input.userId,
          puzzleId: input.puzzleId,
        },
      });
    }),

  submitPuzzle: protectedProcedure
    .input(submitPuzzleZ)
    .mutation(async ({ ctx, input }) => {
      const submission = await ctx.db.submission.findUnique({
        where: {
          userId_puzzleId: {
            userId: input.userId,
            puzzleId: input.puzzleId,
          },
        },
      });

      if (!submission) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "You have to start puzzle before submitting",
        });
      }

      // await ctx.db.submission.update({
      //   where: {
      //     userId_puzzleId: {
      //       userId: input.userId,
      //       puzzleId: input.puzzleId,
      //     },
      //     data: {
      //       points
      //     }
      //   }
      // })
    }),

  getSubmission: protectedProcedure
    .input(startPuzzleZ)
    .query(async ({ ctx, input }) => {
      return await ctx.db.submission.findUnique({
        where: {
          userId_puzzleId: {
            userId: input.userId,
            puzzleId: input.puzzleId,
          },
        },
      });
    }),
});

export default submissionRouter;
