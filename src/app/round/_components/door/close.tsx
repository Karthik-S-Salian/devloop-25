import { type PuzzleDifficulty } from "@prisma/client";
import Image from "next/image";
import React from "react";

import { cn } from "~/lib/utils";

const CloseDoor = ({
  className,
  difficulty,
}: {
  className?: string;
  difficulty: PuzzleDifficulty;
}) => {
  const src =
    difficulty === "HARD"
      ? "/assets/round/hardCloseDoor.svg"
      : difficulty === "MEDIUM"
        ? "/assets/round/mediumCloseDoor.svg"
        : difficulty === "EASY"
          ? "/assets/round/easyCloseDoor.svg"
          : undefined;

  if (!src) return null;

  return (
    <div className={cn("relative", className)}>
      <Image src={src} alt="hello-kitty" fill />
    </div>
  );
};

export default CloseDoor;
