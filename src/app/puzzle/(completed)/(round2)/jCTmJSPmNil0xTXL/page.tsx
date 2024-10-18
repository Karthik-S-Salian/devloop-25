"use client";

import { useEffect, useState } from "react";

import { useSubmitPuzzle } from "~/hooks/submission";
import { cn } from "~/lib/utils";
import { useSubmission } from "~/store";

type Choices = readonly [
  {
    id: "rock";
    symbol: "✊";
  },
  {
    id: "paper";
    symbol: "🤚";
  },
  {
    id: "scissor";
    symbol: "✌️";
  },
];

const CHOICES = [
  { id: "rock", symbol: "✊" },
  { id: "paper", symbol: "🤚" },
  { id: "scissor", symbol: "✌️" },
] as Choices;

const Page = () => {
  const { makeAutoSubmission } = useSubmission();
  useEffect(() => {
    makeAutoSubmission();
  }, [makeAutoSubmission]);

  const submitPuzzle = useSubmitPuzzle();

  const [playChoice, setPlayerChoice] = useState<Choices[number] | null>(null);
  const [compChoice, setCompChoice] = useState<Choices[number] | null>(null);

  const playerScore = 0;
  const [compScore, setCompScore] = useState<number>(0);

  const [solved, setSolved] = useState<boolean>(false);

  const handlePlayerChoice = (choice: Choices[number]) => {
    const compChoice =
      choice.id === "rock"
        ? CHOICES[1]
        : choice.id === "paper"
          ? CHOICES[2]
          : CHOICES[0];

    setPlayerChoice(choice);
    setCompChoice(compChoice);

    setCompScore((prev) => prev + 1);
  };

  useEffect(() => {
    // TODO(Omkar): Is this bug even in prod
    const countStr = localStorage.getItem("guardianCount") ?? "0";
    const storedCount = parseInt(countStr);
    if (storedCount >= 10 && !solved) {
      submitPuzzle({
        answer: "Gaurdian Lost",
      });
      setSolved(true);
      localStorage.removeItem("guardianCount");
    }
    localStorage.setItem("guardianCount", (storedCount + 1).toString());
  }, [solved, submitPuzzle]);

  return (
    <div className="flex size-full flex-col items-center justify-center gap-10">
      <div className="space-y-4">
        <pre className="text-2xl">
          The &quot;Guardian&quot; is protecting the gates u need to outsmart
          him to pass through.
        </pre>
        <pre className="text-2xl">
          He is a gambler and a good one at it. But one thing he is not good at
          is waiting.
        </pre>
      </div>

      <div className="grid select-none grid-cols-2 items-center justify-center">
        <pre className="text-2xl">The Guardian : {compScore}</pre>
        <div className="p-10 text-center text-7xl">
          {compChoice ? compChoice.symbol : " 💂 "}
        </div>
        <pre className="text-2xl">You : {playerScore}</pre>
        <div className="p-10 text-center text-7xl">
          {CHOICES.map((choice) => (
            <span
              key={choice.id}
              className={cn(
                "relative bottom-0 inline-block cursor-pointer transition-all",
                playChoice?.id === choice.id && "bottom-6",
              )}
              onClick={() => handlePlayerChoice(choice)}
            >
              {choice.symbol}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
