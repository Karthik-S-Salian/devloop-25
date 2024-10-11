import { useState } from "react";

import { api } from "~/trpc/react";

interface LeaderboardEntry {
  userId: string;
  name: string;
  totalScore: number;
}

const LeaderBoard = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  api.leaderboard.leaderboardSubscription.useSubscription(undefined, {
    onData: (newLeaderboard) => {
      console.log(newLeaderboard);
      setLeaderboard(newLeaderboard);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  if (leaderboard.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <main className="min-h-screen">
      <section className="flex flex-col items-center gap-16">
        <h1>Leaderboard</h1>
        <table>
          <thead>
            <tr className="font-bold">
              <th>Rank</th>
              <th>Team</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Team 1</td>
              <td>100</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Team 2</td>
              <td>90</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Team 3</td>
              <td>80</td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  );
};
export default LeaderBoard;
