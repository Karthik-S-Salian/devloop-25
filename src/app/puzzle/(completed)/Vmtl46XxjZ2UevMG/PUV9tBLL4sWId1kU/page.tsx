"use client";

import { useEffect, useState } from "react";

import { useSubmitPuzzle } from "~/hooks/submission";

const Page = () => {
  const submitPuzzle = useSubmitPuzzle();

  const [solved, setSolved] = useState(false);

  useEffect(() => {
    if (!solved)
      submitPuzzle({
        answer: "Secret Page",
      });
    setSolved(true);
  }, [solved, submitPuzzle]);

  return null;
};

export default Page;
