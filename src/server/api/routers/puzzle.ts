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
          name: input.name,
          route: input.route,
          difficulty: input.difficulty,
          round: input.round,
          minusPoints: input.minusPoints,
          hint: input.hint,
          plusPoints: input.plusPoints,
          solution: input.solution,
        },
      });
    }),

  // Get(Retrieve), NOTE: infiniteQuery is always preferred
  getRoundPuzzles: adminProcedure
    .input(getRoundPuzzlesZ)
    .query(async ({ ctx, input }) => {
      return await ctx.db.puzzle.findMany({
        where: input.round === "BOTH" ? {} : { round: input.round },
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
          route: input.route,
          difficulty: input.difficulty,
          round: input.round,
          minusPoints: input.minusPoints,
          hint: input.hint,
          plusPoints: input.plusPoints,
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
