import { createTRPCRouter, protectedProcedure } from "../trpc";

const leaderboardRouter = createTRPCRouter({
  getLeaderboard: protectedProcedure.query(async ({ ctx }) => {
    const submissions = await ctx.db.submission.findMany({
      where: {
        status: "ACCEPTED",
      },
      select: {
        points: true,
        User: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    const leaderboard = submissions.reduce(
      (acc, submission) => {
        const { id: userId, name: userName } = submission.User;

        if (!acc[userId])
          acc[userId] = {
            totalScore: 0,
            userName,
          };

        acc[userId].totalScore += submission.points ?? 0;

        return acc;
      },
      {} as Record<string, { totalScore: number; userName: string }>,
    );

    const leaderboardArray = Object.entries(leaderboard)
      .map(([userId, { totalScore, userName }]) => ({
        userId,
        userName,
        totalScore,
      }))
      .sort((a, b) => b.totalScore - a.totalScore);

    return leaderboardArray;
  }),
});

export default leaderboardRouter;
