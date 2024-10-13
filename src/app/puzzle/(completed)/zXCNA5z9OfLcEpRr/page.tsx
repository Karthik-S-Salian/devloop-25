"use client";

import React, { useCallback, useEffect, useState } from "react";

import { Checkbox } from "~/components/ui/checkbox";

import Goto from "~/app/puzzle/(completed)/zXCNA5z9OfLcEpRr/_components/goto";
import { useSubmitPuzzle } from "~/hooks/submission";
import { cn } from "~/lib/utils";
import { useSubmission } from "~/store";

const NO_OF_CELLS = 1_000;

const Page = () => {
  const { makeAutoSubmission } = useSubmission();

  useEffect(() => {
    makeAutoSubmission();
  }, [makeAutoSubmission]);

  const submitPuzzle = useSubmitPuzzle();

  const [solved, setSolved] = useState<boolean>(false);

  const onClick = useCallback(() => {
    if (!solved)
      submitPuzzle({
        answer: "Golden Checkbox",
      });
    setSolved(true);
    console.log(
      `Special checkbox clicked, you shall join the elite group https://chat.whatsapp.com/CoR8icLCDmNLcazWwaXYyE`,
    );
  }, [solved, submitPuzzle]);

  return (
    <div className="flex size-full flex-col items-center justify-center gap-4 px-4 pb-20 pt-4 sm:px-6 md:px-8 xl:px-10">
      <div className="flex w-80 items-center justify-center gap-4">
        <Goto />
      </div>
      <div
        className={cn(
          "grid size-full items-center justify-center gap-4 overflow-scroll",
          "grid-cols-[repeat(5,_minmax(0,_1fr))]",
          "sm:grid-cols-[repeat(10,_minmax(0,_1fr))]",
          "md:grid-cols-[repeat(15,_minmax(0,_1fr))]",
          "lg:grid-cols-[repeat(20,_minmax(0,_1fr))]",
          "xl:grid-cols-[repeat(25,_minmax(0,_1fr))]",
          "2xl:grid-cols-[repeat(30,_minmax(0,_1fr))]",
        )}
      >
        {Array.from({ length: NO_OF_CELLS }).map((_, idx) => (
          <div key={idx} className="flex size-full items-center justify-center">
            <Checkbox
              id={`cb-${idx}`}
              className={cn(
                "size-6 focus:border-4",
                idx === 742 && "click-me pointer-events-none",
                idx === 64 && "border-4 border-cyan-500",
                idx === 107 && "border-4 border-amber-500",
                idx === 131 && "border-4 border-emerald-500",
                idx === 201 && "border-4 border-amber-500",
                idx === 260 && "border-4 border-rose-500",
                idx === 352 && "border-4 border-cyan-500",
                idx === 469 && "border-4 border-amber-500",
                idx === 580 && "border-4 border-emerald-500",
                idx === 604 && "border-4 border-amber-500",
                idx === 621 && "border-4 border-rose-500",
                idx === 725 && "border-4 border-cyan-500",
                idx === 761 && "border-4 border-rose-500",
                idx === 854 && "border-4 border-emerald-500",
                idx === 927 && "border-4 border-amber-500",
              )}
              {...(idx === 742
                ? {
                    title: "Special Checkbox",
                    onClick: onClick,
                  }
                : {})}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
