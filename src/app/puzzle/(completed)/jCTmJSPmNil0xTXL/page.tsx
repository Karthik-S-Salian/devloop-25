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
    let countStr = localStorage.getItem("guardianCount");
    if (!countStr) localStorage.setItem("guardianCount", "0");
    countStr = localStorage.getItem("guardianCount")!;
    const storedCount = parseInt(countStr);
    if (storedCount >= 10 && !solved) {
      submitPuzzle({
        answer: "Gaurdian Lost",
      });
      setSolved(true);
    }
    localStorage.setItem("guardianCount", (storedCount + 1).toString());
  }, [solved, submitPuzzle]);

  return (
    <>
      {/* TODO(Omkar): TailwindCSS?? */}
      <style jsx>{`
        .game-container {
          display: grid;
          place-content: center;
          font-size: 80px;
          overflow-y: hidden;
          overflow-x: hidden;
          min-width: 300px;
          min-height: 400px;
          user-select: none;
        }
        #player span {
          cursor: pointer;
          transition: all 0.5s;
          opacity: 1;
          display: inline-block;
          position: relative;
          width: 80px;
          bottom: 0;
        }
        #player span.chosen {
          bottom: 25px;
        }
        #player span.hidden {
          opacity: 0;
          width: 0;
        }
        .noclick #player span {
          cursor: default;
        }
        #pc {
          position: absolute;
          top: 40px;
          left: calc(50vw - 40px);
          transform: rotate(180deg);
          transition: top 0.5s;
        }
        #pc.hidden {
          top: -120px;
        }
        .game-container p {
          position: absolute;
          width: 100vw;
          text-align: center;
          bottom: 40px;
          margin: 0;
          color: #fff;
          transition: bottom 0.5s;
        }
        p.hidden {
          bottom: -200px;
        }
      `}</style>
      <div className="flex size-full flex-col items-center justify-center">
        <pre className="text-2xl">
          The &quot;Guardian&quot; is protecting the gates u need to outsmart
          him to pass through.
        </pre>
        <pre className="text-2xl">
          He is a gambler and a good one at it. But one thing he is not good at
          is waiting.
        </pre>

        <div className="game-container">
          <div id="computer-choice" className="hand text-center">
            {compChoice ? compChoice.symbol : " 💂 "}
          </div>

          <div id="player" className="hand">
            {CHOICES.map((choice) => (
              <span
                key={choice.id}
                className={cn(
                  "choice cursor-pointer",
                  playChoice?.id === choice.id && "chosen",
                )}
                onClick={() => handlePlayerChoice(choice)}
              >
                {choice.symbol}
              </span>
            ))}
          </div>

          <pre className="text-4xl">
            The Guardian : {compScore} - You : {playerScore}
          </pre>
        </div>
      </div>
    </>
  );
};

export default Page;
