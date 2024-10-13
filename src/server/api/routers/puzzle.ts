import { adminProcedure, createTRPCRouter } from "~/server/api/trpc";

import {
  addPuzzleZ,
  editPuzzleZ,
  getRoundPuzzlesZ,
  removePuzzleZ,
} from "~/zod/puzzleZ";

const puzzleRouter = createTRPCRouter({
  // Add(Create)
  addPuzzle: adminProcedure
    .input(addPuzzleZ)
    .mutation(async ({ input, ctx }) => {
      await ctx.db.puzzle.create({
        data: {
          hint: input.hint,
          hintDeduction: input.hintDeduction,
          minimumPoints: input.minimumPoints,
          minimumBountyPoints: input.minimumBountyPoints,
          points: input.points,
          puzzleType: input.puzzleType,
          route: input.route,
          solution: input.solution,
          name: input.name,
          difficulty: input.difficulty,
          puzzleRound: input.puzzleRound,
        },
      });
    }),

  // Get(Retrieve), NOTE: infiniteQuery is always preferred
  getRoundPuzzles: adminProcedure
    .input(getRoundPuzzlesZ)
    .query(async ({ ctx, input }) => {
      return await ctx.db.puzzle.findMany({
        where: {
          puzzleRound: input.round,
        },
        select: {
          name: true,
          route: true,
        },
      });
    }),

  // Edit(Update)
  editPuzzle: adminProcedure
    .input(editPuzzleZ)
    .mutation(async ({ input, ctx }) => {
      await ctx.db.puzzle.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          hint: input.hint,
          hintDeduction: input.hintDeduction,
          minimumPoints: input.minimumPoints,
          minimumBountyPoints: input.minimumBountyPoints,
          points: input.points,
          puzzleType: input.puzzleType,
          route: input.route,
          solution: input.solution,
        },
      });
    }),

  // Remove(Delete)
  removePuzzle: adminProcedure
    .input(removePuzzleZ)
    .mutation(async ({ input, ctx }) => {
      await ctx.db.puzzle.delete({
        where: {
          id: input.puzzleId,
        },
      });
    }),
});

export default puzzleRouter;
