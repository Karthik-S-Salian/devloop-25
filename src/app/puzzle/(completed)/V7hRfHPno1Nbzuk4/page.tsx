"use client";

//corner div puzzle
import { useEffect, useState } from "react";

import { useSubmitPuzzle } from "~/hooks/submission";
import { cn } from "~/lib/utils";
import { useSubmission } from "~/store";

const Page = () => {
  const { makeAutoSubmission } = useSubmission();
  useEffect(() => {
    makeAutoSubmission();
  }, [makeAutoSubmission]);

  const submitPuzzle = useSubmitPuzzle();

  const [solved, setSolved] = useState(false);
  const [clicked, setClicked] = useState({
    topLeft: false,
    topRight: false,
    bottomLeft: false,
    bottomRight: false,
  });

  const handleClick = (corner: keyof typeof clicked) =>
    setClicked((prev) => ({ ...prev, [corner]: true }));

  useEffect(() => {
    if (
      clicked.topLeft &&
      clicked.topRight &&
      clicked.bottomLeft &&
      clicked.bottomRight &&
      !solved
    ) {
      submitPuzzle({
        answer: "Hearts touched",
      });
      setSolved(true);
    }
  }, [clicked, solved, submitPuzzle]);

  return (
    <div className="relative size-full">
      <div
        onClick={() => handleClick("topLeft")}
        className={cn(
          "absolute left-0 top-0 size-6 cursor-pointer",
          clicked.topLeft ? "bg-rose-500" : "bg-transparent",
        )}
      />
      <div
        onClick={() => handleClick("topRight")}
        className={cn(
          "absolute right-0 top-0 size-6 cursor-pointer",
          clicked.topRight ? "bg-rose-500" : "bg-transparent",
        )}
      />
      <div
        onClick={() => handleClick("bottomLeft")}
        className={cn(
          "absolute bottom-0 left-0 size-6 cursor-pointer",
          clicked.bottomLeft ? "bg-rose-500" : "bg-transparent",
        )}
      />
      <div
        onClick={() => handleClick("bottomRight")}
        className={cn(
          "absolute bottom-0 right-0 size-6 cursor-pointer",
          clicked.bottomRight ? "bg-rose-500" : "bg-transparent",
        )}
      />
    </div>
  );
};

export default Page;
