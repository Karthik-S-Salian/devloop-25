import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

import { addPuzzleZ, editPuzzleZ, removePuzzleZ } from "~/zod/puzzleZ";

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
          minPoints: input.minPoints,
          minusPoints: input.minusPoints,
          hint: input.hint,
          plusPoints: input.plusPoints,
          solution: input.solution,
        },
      });
    }),

  // Get(Retrieve), NOTE: infiniteQuery is always preferred
  getPuzzles: protectedProcedure.query(async ({ ctx }) => {
    const puzzles = await ctx.db.puzzle.findMany({
      select: {
        id: true,
        name: true,
        difficulty: true,
        route: true,
        minPoints: true,
        minusPoints: true,
        plusPoints: true,
        Submission: {
          where: {
            userId: {
              equals: ctx.session.user.id,
            },
          },
        },
      },
    });

    const refinedPuzzles = [];

    for (const puzzle of puzzles) {
      if (puzzle.Submission.length <= 0)
        refinedPuzzles.push({
          ...puzzle,
          Submission: undefined,
        });
      else
        refinedPuzzles.push({
          ...puzzle,
          Submission: puzzle.Submission[0]!,
        });
    }

    return refinedPuzzles;
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
          minPoints: input.minPoints,
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
