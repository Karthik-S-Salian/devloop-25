import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

import { addPuzzleZ, getPuzzleFromRouteZ } from "~/zod/puzzleZ";

const puzzleRouter = createTRPCRouter({
  // Retreive
  getAllPuzzle: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.puzzle.findMany();
  }),

  getPuzzleFromRoute: protectedProcedure
    .input(getPuzzleFromRouteZ)
    .query(async ({ ctx, input }) => {
      return await ctx.db.puzzle.findUnique({
        where: {
          route: input.route,
        },
      });
    }),

  // Create
  addPuzzle: protectedProcedure
    .input(addPuzzleZ)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.$transaction(async (db) => {
        const redeemCode = input.isOneTimeUse
          ? await db.redeemCode.create({
              data: {
                oneTimeUse: input.isOneTimeUse,
              },
            })
          : undefined;

        await db.puzzle.create({
          data: {
            route: input.route,
            puzzleType: input.puzzleType,
            redeemCode: redeemCode?.code,
            solution: input.solution,
            points: input.points,
            hint: input.hint,
            hintDeduction: input.hintDeduction,
          },
        });
      });
    }),
});

export default puzzleRouter;
