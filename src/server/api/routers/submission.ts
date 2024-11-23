import { type Submission } from "@prisma/client";
import { TRPCError } from "@trpc/server";

import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

import { env } from "~/env";
import {
  startPuzzleZ,
  submitPuzzleZ,
  helpPuzzleZ,
  quitPuzzleZ,
} from "~/zod/submissionsZ";

const submissionRouter = createTRPCRouter({
  startPuzzle: protectedProcedure
    .input(startPuzzleZ)
    .query(async ({ input, ctx }) => {
      try {
        if (env.NODE_ENV !== "development") {
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
        }

        const puzzle = await ctx.db.puzzle.findUniqueOrThrow({
          where: {
            route: input.route,
          },
          select: {
            id: true,
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
      } catch (error) {
        console.log(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }
    }),

  submitPuzzle: protectedProcedure
    .input(submitPuzzleZ)
    .mutation(async ({ ctx, input }) => {
      try {
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
            startTime: true,
            endTime: true,
            hintTaken: true,
            Puzzle: {
              select: {
                difficulty: true,
                solution: true,
                minPoints: true,
                plusPoints: true,
                minusPoints: true,
              },
            },
          },
        });

        if (
          submission.Puzzle.solution.toLowerCase() !==
          input.answer.toLowerCase()
        )
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Invalid answer",
          });

        const serverSettings = await ctx.db.serverSettings.findFirstOrThrow();

        if (!serverSettings.roundOneLive) return;

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

        const timeTakenMinutes = Math.floor(
          (Date.now() - submission.startTime.getTime()) / 60000,
        );

        const initialPoints = submission.Puzzle.plusPoints;
        const deductedPoints =
          initialPoints * (1 - deductionRate * timeTakenMinutes);
        const finalPoints = Math.floor(
          Math.max(
            submission.Puzzle.minPoints,
            deductedPoints -
              (submission.hintTaken ? submission.Puzzle.minusPoints : 0),
          ),
        );

        await ctx.db.submission.update({
          where: {
            userId_puzzleId: {
              userId: ctx.session.user.id,
              puzzleId: input.puzzleId,
            },
          },
          data: {
            points: finalPoints,
            status: "ACCEPTED",
            endTime: new Date(),
          },
        });
      } catch (error) {
        console.log(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }
    }),

  helpPuzzle: protectedProcedure
    .input(helpPuzzleZ)
    .mutation(async ({ input, ctx }) => {
      try {
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

          await db.submission.update({
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

          return puzzle;
        });
      } catch (error) {
        console.log(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }
    }),

  quitPuzzle: protectedProcedure
    .input(quitPuzzleZ)
    .mutation(async ({ ctx, input }) => {
      try {
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
      } catch (error) {
        console.log(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }
    }),

  resetAllPuzzle: adminProcedure.mutation(async ({ ctx }) => {
    try {
      if (env.NODE_ENV !== "development")
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Reset all puzzles only allowed in development",
        });

      await ctx.db.submission.deleteMany({
        where: {
          userId: {
            equals: ctx.session.user.id,
          },
        },
      });
    } catch (error) {
      console.log(error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong",
      });
    }
  }),
});

export default submissionRouter;
