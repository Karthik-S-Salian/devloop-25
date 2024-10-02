import { adminProcedure, createTRPCRouter } from "~/server/api/trpc";


const puzzleRouter = createTRPCRouter({
  addPuzzle: adminProcedure
    .input()
    .mutation(async ({input, ctx}) => {
      return
    }),
});

export default puzzleRouter;
