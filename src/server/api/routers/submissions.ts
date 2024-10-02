import { TRPCError } from "@trpc/server";

import { idZ } from "~/zod/generalZ";
import { submitPuzzleZ } from "~/zod/submissionsZ";

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
    .input(submitPuzzleZ)
    .mutation(async ({ ctx, input }) => {
      const submission = await ctx.db.submission.findUnique({
        where: {
          userId_puzzleId: {
            userId: ctx.session.user.id,
            puzzleId: input.puzzleId,
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

      if (submission.Puzzle.solution !== input.answer) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid answer",
        });
      }

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
            puzzleId: input.puzzleId,
          },
        },
        data: {
          points: Math.max(submission.Puzzle.minimumPoints, finalPoints),
          status: "ACCEPTED",
          endTime: new Date(),
        },
      });
    }),

  quitPuzzle: protectedProcedure.input(idZ).mutation(async ({ ctx, input }) => {
    await ctx.db.submission.update({
      where: {
        userId_puzzleId: {
          userId: ctx.session.user.id,
          puzzleId: input.id,
        },
      },
      data: {
        status: "QUIT",
        endTime: new Date(),
        points: 0,
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
