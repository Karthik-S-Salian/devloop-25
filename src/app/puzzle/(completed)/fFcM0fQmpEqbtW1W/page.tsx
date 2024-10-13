"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { Button } from "~/components/ui/button";

import { useSubmitPuzzle } from "~/hooks/submission";
import { useSubmission } from "~/store";

const Page = () => {
  const { makeAutoSubmission } = useSubmission();
  useEffect(() => {
    makeAutoSubmission();
  }, [makeAutoSubmission]);

  const submitPuzzle = useSubmitPuzzle();

  const [solved, setSolved] = useState<boolean>(false);

  const onClickHandler = useCallback(() => {
    if (!solved)
      submitPuzzle({
        answer: "Button behind Image",
      });
    setSolved(true);
  }, [solved, submitPuzzle]);

  return (
    <div className="relative size-full">
      <Button
        onClick={onClickHandler}
        className="absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4"
      >
        Click Me
      </Button>
      <Link
        href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        className="absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4"
        target="_blank"
      >
        <Image
          src="/image/broken-image.svg"
          alt="click-me"
          width={600}
          height={400}
        />
      </Link>
    </div>
  );
};

export default Page;
