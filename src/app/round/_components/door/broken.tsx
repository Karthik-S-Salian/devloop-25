import { type PuzzleDifficulty } from "@prisma/client";
import Image from "next/image";
import React from "react";

import { cn } from "~/lib/utils";

const BrokenDoor = ({
  className,
  difficulty,
}: {
  className?: string;
  difficulty: PuzzleDifficulty;
}) => {
  const src =
    difficulty === "HARD"
      ? "/assets/round/hardBrokenDoor.svg"
      : difficulty === "MEDIUM"
        ? "/assets/round/mediumBrokenDoor.svg"
        : difficulty === "EASY"
          ? "/assets/round/easyBrokenDoor.svg"
          : undefined;

  if (!src) return null;

  return (
    <div className={cn("relative", className)}>
      <Image src={src} alt="hello-kitty" fill />
    </div>
  );
};

export default BrokenDoor;
