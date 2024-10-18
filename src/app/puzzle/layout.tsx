"use client";

import { useWindowWidth } from "@react-hook/window-size";
import { type inferProcedureOutput } from "@trpc/server";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

import { type AppRouter } from "~/server/api/root";

import { Button } from "~/components/ui/button";
import { WIDTH_THRESHOLD } from "~/components/ui/config";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";

import Hint from "~/app/puzzle/_components/hint";
import Quit from "~/app/puzzle/_components/quit";
import RoundTimer from "~/app/puzzle/_components/roundTimer";
import Submission from "~/app/puzzle/_components/submission";
import Timer from "~/app/puzzle/_components/timer";
import { useSubmission } from "~/store";
import { api } from "~/trpc/react";

const ControlPanel = ({
  puzzle,
}: {
  puzzle: inferProcedureOutput<AppRouter["submission"]["startPuzzle"]>;
}) => {
  return (
    <div className="static bottom-5 left-0 flex w-full flex-col items-center justify-between gap-4 px-10 md:absolute md:flex-row">
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
  );
};

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

  const isMobile = useWindowWidth() < WIDTH_THRESHOLD;

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
    router.push("/round");
    return null;
  }

  return (
    <main className="size-full h-[calc(100%_-_4rem)]">
      <div className="relative size-full">
        {children}

        {isMobile ? (
          <Drawer>
            <DrawerTrigger asChild>
              <Button className="absolute bottom-5 left-2/4 -translate-x-2/4 bg-teal-500 hover:bg-teal-600">
                Control Panel
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Control Panel</DrawerTitle>
              </DrawerHeader>

              <ControlPanel puzzle={puzzle} />

              <DrawerFooter>
                <DrawerClose></DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        ) : (
          <ControlPanel puzzle={puzzle} />
        )}
      </div>
    </main>
  );
};

export default DashboardLayout;
