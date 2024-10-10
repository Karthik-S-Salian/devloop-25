"use client";

import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

import Hint from "~/app/puzzle/_components/hint";
import Quit from "~/app/puzzle/_components/quit";
import RoundTimer from "~/app/puzzle/_components/roundTimer";
import Submission from "~/app/puzzle/_components/submission";
import Timer from "~/app/puzzle/_components/timer";
import { api } from "~/trpc/react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();

  const { data: puzzle } = api.submission.startPuzzle.useQuery(
    {
      route: pathname.split("/")[2]!,
    },
    {
      enabled: !!session && !!pathname.split("/")[2],
    },
  );

  if (!session) {
    router.push("/auth/signIn");
    return null;
  }

  if (!puzzle) {
    router.push("/");
    return null;
  }

  if (puzzle.Submission[0].status !== "PENDING") {
    router.push(puzzle.puzzleRound === "ROUND_ONE" ? "/round/1" : "/round/2");
    return null;
  }

  return (
    <div className="relative size-full">
      {children}
      <div className="absolute bottom-5 left-0 flex w-full items-center justify-between gap-4 px-10">
        <div className="flex w-1/3 items-center justify-center">
          <RoundTimer />
        </div>
        <div className="flex w-1/3 items-center justify-center gap-4">
          <Quit puzzle={puzzle} />
          <Hint puzzle={puzzle} />
          <Submission puzzle={puzzle} />
        </div>
        <div className="flex w-1/3 items-center justify-center">
          <Timer puzzle={puzzle} />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
