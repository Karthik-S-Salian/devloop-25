import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

import { solvePuzzleZ } from "~/zod/submissionZ";

const submissionRouter = createTRPCRouter({
  // Add(Create)
  solvePuzzle: protectedProcedure
    .input(solvePuzzleZ)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.submission.create({
        data: {
          Puzzle: {
            connect: {
              id: input.puzzleId,
            },
          },
          User: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      });
    }),

  // Get(Retrieve), NOTE: infiniteQuery is always preferred

  // Edit(Update)
  // Remove(Delete)
});

export default submissionRouter;
