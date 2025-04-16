"use client";

import { Button } from "~/components/ui/button";

import { useSubmitPuzzle } from "~/hooks/submission";

export default function Hidden() {
  const submitPuzzle = useSubmitPuzzle();

  const handlesubmit = () => [
    alert("Good job! You passed!"),
    submitPuzzle({ answer: "Hidden Button clicked" }),
  ];

  return (
    <div className="flex h-full flex-col items-center justify-center bg-gray-100">
      <h1 className="mb-4 text-4xl font-bold">Welcome to Hidden Page</h1>
      <Button onClick={handlesubmit} className="hidden">
        Click
      </Button>
    </div>
  );
}
