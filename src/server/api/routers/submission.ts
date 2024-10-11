import { type Submission } from "@prisma/client";
import { TRPCError } from "@trpc/server";

import { ee } from "~/utils/eventEmitter";
import {
  startPuzzleZ,
  submitPuzzleZ,
  helpPuzzleZ,
  quitPuzzleZ,
} from "~/zod/submissionsZ";

import { createTRPCRouter, protectedProcedure } from "../trpc";

const submissionRouter = createTRPCRouter({
  startPuzzle: protectedProcedure
    .input(startPuzzleZ)
    .query(async ({ input, ctx }) => {
      const puzzle = await ctx.db.puzzle.findUniqueOrThrow({
        where: {
          route: input.route,
        },
        select: {
          id: true,
          difficulty: true,
          hintDeduction: true,
          name: true,
          puzzleRound: true,
          puzzleType: true,
          route: true,
          Submission: {
            where: {
              userId: ctx.session.user.id,
            },
          },
        },
      });

      if (puzzle.Submission.length <= 0) {
        const submission = await ctx.db.submission.create({
          data: {
            userId: ctx.session.user.id,
            puzzleId: puzzle.id,
          },
        });

        return {
          ...puzzle,
          Submission: [submission] as [Submission],
        };
      }

      return {
        ...puzzle,
        Submission: puzzle.Submission as [Submission, ...Submission[]],
      };
    }),

  submitPuzzle: protectedProcedure
    .input(submitPuzzleZ)
    .mutation(async ({ ctx, input }) => {
      const submission = await ctx.db.submission.findUniqueOrThrow({
        where: {
          userId_puzzleId: {
            userId: ctx?.session.user?.id ?? "123",
            puzzleId: input.puzzleId,
          },
        },
        include: {
          Puzzle: true,
        },
      });

      if (
        submission.Puzzle.solution.toLowerCase() !== input.answer.toLowerCase()
      )
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid answer",
        });

      const timeTakenMinutes = Math.floor(
        // BUG(Omkar): server time and client time are not in sync, UTC & IST
        (Date.now() - submission.startTime.getTime()) / 60000,
      );

      const DEDUCTION_RATE = {
        HARD: 0.06,
        MEDIUM: 0.04,
        EASY: 0.02,
      } as const;

      const initialPoints = submission.Puzzle.points;
      const deductedPoints =
        initialPoints *
        // BUG(Omkar): what logic is this, correct??
        (1 - DEDUCTION_RATE[submission.Puzzle.difficulty] * timeTakenMinutes);
      const finalPoints = Math.floor(Math.max(0, deductedPoints));

      const newSubmission = await ctx.db.submission.update({
        where: {
          userId_puzzleId: {
            userId: ctx?.session?.user?.id ?? "123",
            puzzleId: input.puzzleId,
          },
        },
        data: {
          points: Math.max(submission.Puzzle.minimumPoints, finalPoints),
          status: "ACCEPTED",
          endTime: new Date(),
        },
      });

      ee.emit("newSubmission", newSubmission);
    }),

  helpPuzzle: protectedProcedure
    .input(helpPuzzleZ)
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.$transaction(async (db) => {
        const puzzle = await db.puzzle.findUniqueOrThrow({
          where: {
            id: input.puzzleId,
          },
          select: {
            hint: true,
            hintDeduction: true,
          },
        });

        const newSubmission = await db.submission.update({
          where: {
            userId_puzzleId: {
              userId: ctx.session.user.id,
              puzzleId: input.puzzleId,
            },
          },
          data: {
            hintTaken: true,
          },
        });

        ee.emit("newSubmission", newSubmission);

        return puzzle;
      });
    }),

  quitPuzzle: protectedProcedure
    .input(quitPuzzleZ)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.submission.update({
        where: {
          userId_puzzleId: {
            userId: ctx.session.user.id,
            puzzleId: input.puzzleId,
          },
        },
        data: {
          points: 0,
          endTime: new Date(),
          status: "QUIT",
        },
      });
    }),
});

export default submissionRouter;
