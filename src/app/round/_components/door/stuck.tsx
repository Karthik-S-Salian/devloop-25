import { type PuzzleDifficulty } from "@prisma/client";
import Image from "next/image";
import React from "react";

import { cn } from "~/lib/utils";

const StuckDoor = ({
  className,
  difficulty,
}: {
  className?: string;
  difficulty: PuzzleDifficulty;
}) => {
  const src =
    difficulty === "HARD"
      ? "/assets/round/hardStuckDoor.svg"
      : difficulty === "MEDIUM"
        ? "/assets/round/mediumStuckDoor.svg"
        : difficulty === "EASY"
          ? "/assets/round/easyStuckDoor.svg"
          : undefined;

  if (!src) return null;

  return (
    <div className={cn("relative", className)}>
      <Image src={src} alt="hello-kitty" fill />
    </div>
  );
};

export default StuckDoor;
