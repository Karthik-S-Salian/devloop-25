"use client";

import { usePathname } from "next/navigation";

import Hint from "~/app/puzzle/_components/hint";
import Submission from "~/app/puzzle/_components/submission";
import { api } from "~/trpc/react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { data: puzzle } = api.puzzle.getPuzzle.useQuery({
    route: pathname.split("/")[2]!,
  });

  if (!puzzle) return null;

  return (
    <div className="relative size-full">
      {children}
      <div className="absolute bottom-5 right-10">
        <Submission puzzle={puzzle} />
        <Hint puzzle={puzzle} />
      </div>
    </div>
  );
}
