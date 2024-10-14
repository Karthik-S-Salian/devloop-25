"use client";

import { KeyRound, LockKeyhole, LockKeyholeOpen } from "lucide-react";
import React, { useEffect, useState } from "react";

import { useSubmitPuzzle } from "~/hooks/submission";
import { useSubmission } from "~/store";

const Page = () => {
  const { makeAutoSubmission } = useSubmission();
  useEffect(() => {
    makeAutoSubmission();
  }, [makeAutoSubmission]);

  const submitPuzzle = useSubmitPuzzle();

  const [solved, setSolved] = useState<boolean>(false);

  const lockRef = React.useRef<HTMLDivElement>(null);
  const keyRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onResizeHandler = () => {
      if (lockRef.current && keyRef.current) {
        const lockRect = lockRef.current.getBoundingClientRect();
        const keyRect = keyRef.current.getBoundingClientRect();
        if (keyRect.left <= lockRect.right) {
          if (!solved)
            submitPuzzle({
              answer: "Mobile Screen",
            });
          setSolved(true);
        }
      }
    };
    window.addEventListener("resize", onResizeHandler);
    return () => window.removeEventListener("resize", onResizeHandler);
  }, [solved, submitPuzzle]);

  return (
    <div className="flex size-full items-center justify-center">
      <div className="relative h-36 w-full">
        <div
          ref={lockRef}
          className="absolute left-0 top-0 aspect-square h-full text-center"
        >
          {solved ? (
            <LockKeyholeOpen className="h-full w-full" />
          ) : (
            <LockKeyhole className="h-full w-full" />
          )}
        </div>

        <div
          ref={keyRef}
          className="visible absolute right-0 top-0 aspect-square h-full text-center lg:invisible"
        >
          <KeyRound className="h-full w-full" />
        </div>
      </div>
    </div>
  );
};

export default Page;
