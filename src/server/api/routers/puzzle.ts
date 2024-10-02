import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

import { idZ } from "~/zod/generalZ";
import { addPuzzleZ, editPuzzleZ, getPuzzleZ } from "~/zod/puzzleZ";

const puzzleRouter = createTRPCRouter({
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
          puzzleType: input.PuzzleType,
          route: input.route,
          solution: input.solution,
          name: input.name,
        },
      });
    }),

  updatePuzzle: adminProcedure
    .input(editPuzzleZ)
    .mutation(async ({ input, ctx }) => {
      await ctx.db.puzzle.update({
        where: {
          id: input.id,
        },
        data: {
          hint: input.hint,
          hintDeduction: input.hintDeduction,
          minimumPoints: input.minimumPoints,
          minimumBountyPoints: input.minimumBountyPoints,
          points: input.points,
          puzzleType: input.PuzzleType,
          route: input.route,
          solution: input.solution,
        },
      });
    }),

  deletePuzzle: adminProcedure.input(idZ).mutation(async ({ input, ctx }) => {
    await ctx.db.puzzle.delete({
      where: {
        id: input.id,
      },
    });
  }),

  getPuzzle: protectedProcedure
    .input(getPuzzleZ)
    .query(async ({ input, ctx }) => {
      console.log(input);
      return await ctx.db.puzzle.findUnique({
        where: {
          route: input.route,
        },
      });
    }),
});

export default puzzleRouter;
