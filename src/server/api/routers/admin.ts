import { TRPCError } from "@trpc/server";

import {
  adminProcedure,
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

const adminRouter = createTRPCRouter({
  getRoundStatus: publicProcedure.query(async ({ ctx }) => {
    try {
      return (await ctx.db.serverSettings.findFirst())?.roundOneLive ?? false;
    } catch (error) {
      console.log(error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong",
      });
    }
  }),

  startRound: adminProcedure.mutation(async ({ ctx }) => {
    try {
      await ctx.db.serverSettings.updateMany({
        data: {
          roundOneLive: true,
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

  stopRound: adminProcedure.mutation(async ({ ctx }) => {
    try {
      await ctx.db.serverSettings.updateMany({
        data: {
          roundOneLive: false,
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

export default adminRouter;
