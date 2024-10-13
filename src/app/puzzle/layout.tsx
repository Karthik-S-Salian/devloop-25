"use client";

import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

import Hint from "~/app/puzzle/_components/hint";
import Quit from "~/app/puzzle/_components/quit";
import RoundTimer from "~/app/puzzle/_components/roundTimer";
import Submission from "~/app/puzzle/_components/submission";
import Timer from "~/app/puzzle/_components/timer";
import { useSubmission } from "~/store";
import { api } from "~/trpc/react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status: sessionStatus } = useSession();

  const { makeManualSubmission, setSubmissionNote } = useSubmission();
  useEffect(() => {
    makeManualSubmission();
    setSubmissionNote("");
    // Forcefully reset submission on route change
  }, [makeManualSubmission, setSubmissionNote, pathname]);

  const { data: puzzle, status: puzzleStatus } =
    api.submission.startPuzzle.useQuery(
      {
        route: pathname.split("/")[2]!,
      },
      {
        enabled: !!session && !!pathname.split("/")[2],
      },
    );

  if (sessionStatus === "loading") return null;
  if (!session) {
    router.push("/auth/signIn");
    return null;
  }

  if (puzzleStatus === "pending") return null;
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
      <div className="absolute bottom-5 left-0 flex w-full flex-col items-center justify-between gap-4 px-10 md:flex-row">
        <div className="order-2 flex w-full items-center justify-center md:order-1 md:w-1/3">
          <RoundTimer />
        </div>
        <div className="order-1 flex w-full items-center justify-center gap-4 md:order-2 md:w-1/3">
          <Quit puzzle={puzzle} />
          <Hint puzzle={puzzle} />
          <Submission puzzle={puzzle} />
        </div>
        <div className="order-3 flex w-full items-center justify-center md:order-3 md:w-1/3">
          <Timer puzzle={puzzle} />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
