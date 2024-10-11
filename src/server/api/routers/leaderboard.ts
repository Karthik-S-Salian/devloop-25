import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { on } from "events";

import { ee } from "~/utils/eventEmitter";

import { createTRPCRouter, protectedProcedure } from "../trpc";

const getLeaderboardArray = async (
  db: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
) => {
  const submissions = await db.submission.findMany({
    include: {
      User: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  const leaderboard = submissions.reduce(
    (
      acc: { [key: string]: { totalScore: number; name: string } },
      submission,
    ) => {
      const userId = submission.userId;
      const userName = submission.User?.name;

      if (userId && userName) {
        if (!acc[userId]) {
          acc[userId] = {
            totalScore: 0,
            name: userName,
          };
        }

        acc[userId].totalScore += submission.points ?? 0;
      }
      return acc;
    },
    {},
  );

  const leaderboardArray = Object.entries(leaderboard)
    .map(([userId, { totalScore, name }]) => ({
      userId,
      totalScore,
      name,
    }))
    .sort((a, b) => b.totalScore - a.totalScore);

  return leaderboardArray;
};

export const leaderboardRouter = createTRPCRouter({
  getLeaderBoard: protectedProcedure.query(async ({ ctx }) => {
    return await getLeaderboardArray(ctx.db);
  }),

  leaderboardSubscription: protectedProcedure.subscription(
    async function* (opts) {
      for await (const [submission] of on(ee, "newSubmission", {
        signal: opts.signal,
      })) {
        const leaderboard = await getLeaderboardArray(opts.ctx.db);
        yield leaderboard;
      }
    },
  ),
});
