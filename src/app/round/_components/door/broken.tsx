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
      ? "/image/hardBrokenDoor.svg"
      : difficulty === "MEDIUM"
        ? "/image/mediumBrokenDoor.svg"
        : difficulty === "EASY"
          ? "/image/easyBrokenDoor.svg"
          : undefined;

  if (!src) return null;

  return (
    <div className={cn("relative", className)}>
      <Image src={src} alt="hello-kitty" fill />
    </div>
  );
};

export default BrokenDoor;
