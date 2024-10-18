import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

const puzzleRouter = createTRPCRouter({
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
});

export default puzzleRouter;
