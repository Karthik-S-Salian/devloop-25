"use client";

import { Info } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/ui/hover-card";

import BrokenDoor from "~/app/round/_components/door/broken";
import CloseDoor from "~/app/round/_components/door/close";
import OpenDoor from "~/app/round/_components/door/open";
import StuckDoor from "~/app/round/_components/door/stuck";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";

const Page = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const { data: puzzles } = api.puzzle.getPuzzles.useQuery(void null, {
    enabled: !!session,
  });

  const activePuzzle = puzzles?.find(
    (puzzle) => puzzle.Submission?.status === "PENDING",
  );

  return (
    <div
      // style={{
      //   backgroundImage: "url(/assets/round/bg.svg)",
      //   backgroundRepeat: "no-repeat",
      // }}
      className="flex size-full flex-col items-center justify-center gap-4 px-4 py-20 sm:px-6 md:px-8 xl:px-10"
    >
      <div className="grid size-full grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {puzzles?.map((puzzle, idx) => (
          <div
            key={idx}
            className={cn(
              "relative flex items-center justify-center border",
              activePuzzle
                ? activePuzzle.id === puzzle.id
                  ? "cursor-pointer"
                  : ""
                : puzzle.Submission
                  ? puzzle.Submission.status === "PENDING"
                    ? "cursor-pointer"
                    : puzzle.Submission.status === "ACCEPTED"
                      ? ""
                      : ""
                  : "cursor-pointer",
            )}
            onClick={() => {
              if (activePuzzle)
                if (activePuzzle.id === puzzle.id)
                  router.push(`/puzzle/${puzzle.route}` as "/puzzle/demo");
                else toast.error("Complete the active puzzle first");
              else if (puzzle.Submission)
                if (puzzle.Submission.status === "PENDING")
                  router.push(`/puzzle/${puzzle.route}` as "/puzzle/demo");
                else if (puzzle.Submission.status === "ACCEPTED")
                  toast.error("You have already solved this puzzle");
                else toast.error("You have already quitted this puzzle");
              else router.push(`/puzzle/${puzzle.route}` as "/puzzle/demo");
            }}
          >
            {puzzle.Submission ? (
              puzzle.Submission.status === "ACCEPTED" ? (
                <OpenDoor className="size-72" difficulty={puzzle.difficulty} />
              ) : puzzle.Submission.status === "PENDING" ? (
                <StuckDoor className="size-72" difficulty={puzzle.difficulty} />
              ) : (
                <BrokenDoor
                  className="size-72"
                  difficulty={puzzle.difficulty}
                />
              )
            ) : (
              <CloseDoor className="size-72" difficulty={puzzle.difficulty} />
            )}

            {puzzle.Submission && (
              <div
                className={cn(
                  "absolute right-2 top-2 flex size-8 items-center justify-center rounded-full border font-digital-number",
                  puzzle.Submission.status === "ACCEPTED"
                    ? puzzle.Submission.hintTaken
                      ? "border-blue-500 bg-blue-200"
                      : "border-gray-500 bg-green-200"
                    : puzzle.Submission.status === "PENDING"
                      ? puzzle.Submission.hintTaken
                        ? "border-blue-500 bg-gray-200"
                        : "border-gray-500 bg-gray-200"
                      : "border-red-600 bg-red-200",
                )}
              >
                {puzzle.Submission.status === "PENDING"
                  ? "-"
                  : (puzzle.Submission.points ?? "-")}
              </div>
            )}

            <HoverCard openDelay={0} closeDelay={0}>
              <HoverCardTrigger>
                <div
                  className={cn(
                    "absolute left-2 top-2 flex size-10 items-center justify-center rounded-full border",
                  )}
                >
                  <Info />
                </div>
              </HoverCardTrigger>
              <HoverCardContent>
                <div className="grid size-full grid-cols-3">
                  <div>Difficulty</div>
                  <div className="col-span-2">: {puzzle.difficulty}</div>
                  {/* TODO */}
                  {puzzle.Submission ? (
                    <>
                      <div>Status</div>
                      <div className="col-span-2">
                        : {puzzle.Submission.status}
                      </div>
                      <div>Hint Taken</div>
                      <div className="col-span-2">
                        : {puzzle.Submission.hintTaken ? "Yes" : "No"}
                      </div>
                      <div>Points</div>
                      <div className="col-span-2">
                        : {puzzle.Submission.points}
                      </div>
                    </>
                  ) : (
                    <>
                      <div>Plus</div>
                      <div className="col-span-2">: {puzzle.plusPoints}</div>
                      <div>Minus</div>
                      <div className="col-span-2">: {puzzle.minusPoints}</div>
                      <div>Status</div>
                      <div className="col-span-2">
                        : {puzzle.Submission.status}
                      </div>
                    </>
                  )}
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
