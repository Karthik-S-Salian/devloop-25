import { TRPCError } from "@trpc/server";
import { z } from "zod";

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
  addAllowedEmail: adminProcedure
  .input(z.array(z.string().email()))
  .mutation(async ({ input: emails, ctx }) => {
    try {
      for (const email of emails) {
        await ctx.db.allowedEmail.upsert({
          where: { email },
          update: {}, // Do nothing if exists
          create: { email },
        });
      }
      return { success: true };
    } catch (error) {
      console.error(error);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Something went wrong while adding emails.',
      });
    }
  }),
});

export default adminRouter;
