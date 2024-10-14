"use client";

import { Submission } from "@prisma/client";
import { useEffect, useRef, useState } from "react";

import { pusherClient } from "~/lib/pusher";
import { api } from "~/trpc/react";

import styles from "./leaderboard.module.css";

interface LeaderboardEntry {
  userId: string;
  name: string;
  totalScore: number;
}

const LeaderBoard = () => {
  const tableRef = useRef<HTMLDivElement>(null);
  const { data: leaderboardData, refetch: fetchLeaderboard } =
    api.leaderboard.getLeaderBoard.useQuery();

  useEffect(() => {
    const channel = pusherClient.subscribe("submissions");

    channel.bind("newSubmission", async (data: Partial<Submission>) => {
      console.log("New submission recieved", data);
      await fetchLeaderboard();
    });

    return () => {
      channel.unbind_all();
      pusherClient.unsubscribe("submissions");
    };
  }, []);

  useEffect(() => {
    if (leaderboardData?.leaderboard) {
      const currentUserIndex = leaderboardData.currentUserRank;
      if (currentUserIndex >= 0 && tableRef.current) {
        const rowElements = tableRef.current.getElementsByTagName("tr");
        const currentUserRow = rowElements[currentUserIndex + 1];
        if (currentUserRow) {
          const container = tableRef.current;
          const rowBottom = currentUserRow.getBoundingClientRect().bottom;
          const containerBottom = container.getBoundingClientRect().bottom;

          if (rowBottom > containerBottom) {
            currentUserRow.scrollIntoView({ behavior: "smooth", block: "end" });
          }
        }
      }
    }
  }, [leaderboardData]);

  const maxScore = 1000;

  if (!leaderboardData?.leaderboard) {
    return <div>Loading...</div>;
  }

  return (
    <main className="min-h-[90vh] w-full">
      <section className="flex w-full flex-col items-center gap-12 py-4">
        <h1 className="text-4xl font-bold">Leaderboard</h1>
        <div
          ref={tableRef}
          className={`${styles.tableContainer} relative max-h-[70vh] w-[80%] overflow-y-auto`}
        >
          <table className="table w-full table-fixed">
            <thead className="sticky top-0 z-20 bg-slate-50 text-xl">
              <tr className="b text-left font-bold">
                <th className="w-1/3 p-2">Rank</th>
                <th className="w-1/3 p-2">Team</th>
                <th className="w-1/3 p-2 text-center">Score</th>
              </tr>
            </thead>
            <tbody className="text-left">
              {leaderboardData.leaderboard.map(
                (entry: LeaderboardEntry, index: number) => (
                  <tr
                    key={entry.userId}
                    className={`text-lg} ${index === leaderboardData.currentUserRank ? "bg-orange-100" : "bg-white"}`}
                  >
                    <td className="w-1/3 p-2">{index + 1}</td>{" "}
                    <td className="w-1/3 p-2 capitalize">{entry.name}</td>{" "}
                    <td className="w-1/3 p-2">
                      <div className="flex w-full items-center justify-center">
                        <div className="mr-2 h-5 w-48 rounded-full bg-gray-200">
                          <div
                            className="h-5 rounded-full bg-gray-700"
                            style={{
                              width: `${(entry.totalScore / maxScore) * 100}%`,
                            }}
                          ></div>
                        </div>
                        <span>{entry.totalScore}</span>
                      </div>
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};

export default LeaderBoard;
