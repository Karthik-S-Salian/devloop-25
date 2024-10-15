import { type PuzzleDifficulty } from "@prisma/client";
import Image from "next/image";
import React from "react";

import { cn } from "~/lib/utils";

const OpenDoor = ({
  className,
  difficulty,
}: {
  className?: string;
  difficulty: PuzzleDifficulty;
}) => {
  const src =
    difficulty === "HARD"
      ? "/image/hardOpenDoor.svg"
      : difficulty === "MEDIUM"
        ? "/image/mediumOpenDoor.svg"
        : difficulty === "EASY"
          ? "/image/easyOpenDoor.svg"
          : undefined;

  if (!src) return null;

  return (
    <div className={cn("relative", className)}>
      <Image src={src} alt="hello-kitty" fill />
    </div>
  );
};

export default OpenDoor;
