import { type Submission } from "@prisma/client";
import { TRPCError } from "@trpc/server";

import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

import { pusherServer } from "~/lib/pusher";
import {
  startPuzzleZ,
  submitPuzzleZ,
  helpPuzzleZ,
  quitPuzzleZ,
} from "~/zod/submissionsZ";

const submissionRouter = createTRPCRouter({
  resetAllPuzzle: adminProcedure.mutation(async ({ ctx }) => {
    await ctx.db.submission.updateMany({
      where: {
        userId: {
          equals: ctx.session.user.id,
        },
      },
      data: {
        status: "PENDING",
      },
    });
  }),

  startPuzzle: protectedProcedure
    .input(startPuzzleZ)
    .query(async ({ input, ctx }) => {
      const activePuzzle = await ctx.db.submission.findMany({
        where: {
          AND: [
            {
              userId: ctx.session.user.id,
            },
            {
              status: "PENDING",
            },
          ],
        },
        select: {
          Puzzle: {
            select: {
              route: true,
            },
          },
        },
      });

      if (
        activePuzzle.length > 0 &&
        activePuzzle[0]!.Puzzle.route !== input.route
      ) {
        console.log(activePuzzle);
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You already have an active puzzle",
        });
      }

      const puzzle = await ctx.db.puzzle.findUniqueOrThrow({
        where: {
          route: input.route,
        },
        select: {
          id: true,
          devName: true,
          round: true,
          difficulty: true,
          route: true,
          minusPoints: true,
          plusPoints: true,
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
      if (!input.manualSubmission) {
        // input.puzzleId == puzzle.route != puzzle.id
        const puzzle = await ctx.db.puzzle.findUniqueOrThrow({
          where: {
            route: input.puzzleId,
          },
        });
        input.puzzleId = puzzle.id;
      }

      const submission = await ctx.db.submission.findUniqueOrThrow({
        where: {
          userId_puzzleId: {
            userId: ctx.session.user.id,
            puzzleId: input.puzzleId,
          },
        },
        select: {
          hintTaken: true,
          Puzzle: {
            select: {
              solution: true,
              plusPoints: true,
              minusPoints: true,
            },
          },
        },
      });

      if (
        submission.Puzzle.solution.toLowerCase() !== input.answer.toLowerCase()
      )
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid answer",
        });

      const newSubmission = await ctx.db.submission.update({
        where: {
          userId_puzzleId: {
            userId: ctx.session.user.id,
            puzzleId: input.puzzleId,
          },
        },
        data: {
          points:
            submission.Puzzle.plusPoints -
            (submission.hintTaken ? submission.Puzzle.minusPoints : 0),
          status: "ACCEPTED",
          endTime: new Date(),
        },
      });

      await pusherServer.trigger("submissions", "newSubmission", newSubmission);
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
            minusPoints: true,
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

        // TODO(Omkar): Needed?
        await pusherServer.trigger(
          "submissions",
          "newSubmission",
          newSubmission,
        );

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
