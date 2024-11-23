"use client";
import React, { useEffect } from "react";

import { useSubmission } from "~/store";

const Page = () => {
  const { setSubmissionNote } = useSubmission();
  useEffect(() => {
    setSubmissionNote("With space");
  }, [setSubmissionNote]);

  return (
    <div className="flex size-full items-center justify-center">
      Submit answer from the below button
    </div>
  );
};

export default Page;
