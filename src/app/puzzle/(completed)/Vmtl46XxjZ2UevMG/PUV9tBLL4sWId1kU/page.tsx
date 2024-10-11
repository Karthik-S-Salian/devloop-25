"use client";

import { useEffect, useState } from "react";

import { useSubmitPuzzle } from "~/hooks/submission";

const Page = () => {
  const submitPuzzle = useSubmitPuzzle();

  const [solved, setSolved] = useState(false);

  useEffect(() => {
    if (!solved)
      submitPuzzle({
        answer: "QR Code Scramble",
      });
    setSolved(true);
  }, [solved, submitPuzzle]);

  return null;
};

export default Page;
