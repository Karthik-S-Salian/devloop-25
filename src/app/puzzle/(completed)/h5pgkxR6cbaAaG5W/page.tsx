"use client";

import { useEffect } from "react";

import { useSubmission } from "~/store";

const Page = () => {
  const { setSubmissionNote } = useSubmission();
  useEffect(() => {
    setSubmissionNote("Use bytes not bits");
  }, [setSubmissionNote]);

  return (
    <div className="flex size-full flex-col items-center justify-center gap-4">
      <div className="flex gap-0.5">
        <pre className="border border-black p-2">int arr[18]</pre>
        <pre className="border border-black p-2">float arr[25] + char c;</pre>
        <pre className="border border-black p-2">short arr[54];</pre>
        <pre className="border border-black p-2">char arr[108];</pre>
        <pre className="border border-black p-2">
          int arr[27] + short a + char c;
        </pre>
      </div>
    </div>
  );
};

export default Page;
