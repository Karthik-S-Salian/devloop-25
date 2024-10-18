import {
  adminProcedure,
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

const adminRouter = createTRPCRouter({
  getRoundStatus: publicProcedure.query(async ({ ctx }) => {
    return (await ctx.db.serverSettings.findFirst())?.roundOneLive ?? false;
  }),

  startRound: adminProcedure.mutation(async ({ ctx }) => {
    await ctx.db.serverSettings.updateMany({
      data: {
        roundOneLive: true,
      },
    });
  }),

  stopRound: adminProcedure.mutation(async ({ ctx }) => {
    await ctx.db.serverSettings.updateMany({
      data: {
        roundOneLive: false,
      },
    });
  }),
});

export default adminRouter;
