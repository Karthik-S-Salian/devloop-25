import { TRPCError } from "@trpc/server";

import { idZ } from "~/zod/generalZ";

import { createTRPCRouter, protectedProcedure } from "../trpc";

const submissionRouter = createTRPCRouter({
  startPuzzle: protectedProcedure
    .input(idZ)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.submission.create({
        data: {
          userId: ctx.session.user.id,
          puzzleId: input.id,
        },
      });
    }),

  submitPuzzle: protectedProcedure
    .input(idZ)
    .mutation(async ({ ctx, input }) => {
      const submission = await ctx.db.submission.findUnique({
        where: {
          userId_puzzleId: {
            userId: ctx.session.user.id,
            puzzleId: input.id,
          },
        },
        include: {
          Puzzle: true,
        },
      });

      if (!submission)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "You have to start puzzle before submitting",
        });

      const timeTakenMinutes = Math.floor(
        (Date.now() - submission.startTime.getTime()) / 60000,
      );

      let deductionRate;
      switch (submission.Puzzle.difficulty) {
        case "HARD":
          deductionRate = 0.06;
          break;
        case "MEDIUM":
          deductionRate = 0.04;
          break;
        case "EASY":
          deductionRate = 0.02;
          break;
        default:
          throw new Error("Invalid puzzle difficulty");
      }

      const initialPoints = submission.Puzzle.points;
      const deductedPoints =
        initialPoints * (1 - deductionRate * timeTakenMinutes);
      const finalPoints = Math.floor(Math.max(0, deductedPoints));

      await ctx.db.submission.update({
        where: {
          userId_puzzleId: {
            userId: ctx.session.user.id,
            puzzleId: input.id,
          },
        },
        data: {
          points: Math.max(submission.Puzzle.minimumPoints, finalPoints),
          endTime: new Date(),
        },
      });
    }),

  getSubmission: protectedProcedure.input(idZ).query(async ({ ctx, input }) => {
    return await ctx.db.submission.findUnique({
      where: {
        userId_puzzleId: {
          userId: ctx.session.user.id,
          puzzleId: input.id,
        },
      },
    });
  }),
});

export default submissionRouter;
