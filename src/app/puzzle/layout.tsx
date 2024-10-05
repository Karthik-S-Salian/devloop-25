"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import Hint from "~/app/puzzle/_components/hint";
import Submission from "~/app/puzzle/_components/submission";
import { api } from "~/trpc/react";

import { UpCounter } from "./_components/timer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const { data: puzzle } = api.puzzle.getPuzzle.useQuery({
    route: pathname.split("/")[2]!,
  });

  const { data: submissionData } = api.submission.getSubmission.useQuery(
    { id: puzzle?.id ?? "" },
    { enabled: !!puzzle },
  );

  const [startTime, setStartTime] = useState<Date | null>(null);

  const startPuzzleMutation = api.submission.startPuzzle.useMutation({
    onSuccess: (data) => {
      setStartTime(data.startTime);
    },
  });

  useEffect(() => {
    if (submissionData?.startTime) {
      setStartTime(submissionData.startTime);
    }
  }, [submissionData]);

  useEffect(() => {
    if (puzzle && !startTime) {
      startPuzzleMutation.mutate({ id: puzzle.id });
    }
  }, [puzzle, startTime, startPuzzleMutation]);

  if (!puzzle) return null;

  return (
    <div className="relative size-full">
      <UpCounter initialTime={startTime?.toDateString()!} />
      {children}
      <div className="absolute bottom-5 right-10">
        <Submission puzzle={puzzle} />
        <Hint puzzle={puzzle} />
      </div>
    </div>
  );
}
