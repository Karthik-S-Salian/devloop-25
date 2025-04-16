"use client";

import { useState, useEffect } from "react";

//@ts-ignore
import { useSubmitRoundOnePuzzle } from "~/hooks/submission";

export default function T5() {
  const submitPuzzle = useSubmitRoundOnePuzzle();
  const [ans, setAns] = useState("");
  const [countdown, setCountdown] = useState<number | null>(null);

  const handleSubmit = () => {
    const correctPrimes = [
      2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67,
      71, 73, 79, 83, 89, 97,
    ];

    const userNumbers = ans.trim().split(/\s+/).map(Number);

    if (
      userNumbers.length === correctPrimes.length &&
      userNumbers.every((num, index) => num === correctPrimes[index])
    ) {
      submitPuzzle({ answer: "prime numbers arrangement done" });
      alert("It's correct!");
    } else {
      alert("It's wrong!");
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedTime = new Date().getTime();
    localStorage.setItem("pastedTime", pastedTime.toString());
    startCountdown();
  };

  const startCountdown = () => {
    setCountdown(60);
  };

  useEffect(() => {
    if (countdown !== null) {
      const interval = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown && prevCountdown > 0) {
            return prevCountdown - 1;
          } else {
            clearInterval(interval);
            return null;
          }
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [countdown]);

  useEffect(() => {
    const pastedTime = localStorage.getItem("pastedTime");
    if (pastedTime) {
      const currentTime = new Date().getTime();
      const elapsedTime = Math.floor(
        (currentTime - parseInt(pastedTime)) / 1000,
      );
      if (elapsedTime < 60) {
        setCountdown(60 - elapsedTime);
      } else {
        localStorage.removeItem("pastedTime");
      }
    }
  }, []);

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gray-100">
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <p className="whitespace-pre-wrap">
          {Array.from({ length: 100 }, (_, i) => i + 1)
            .join(" ")
            .repeat(1000)}
        </p>
      </div>
      <div className="relative z-10 w-full max-w-md rounded bg-white p-8 shadow-md">
        {countdown === null ? (
          <>
            <p className="mb-4 text-lg font-semibold">
              Write prime numbers from 1 to 100
            </p>
            <p className="text-sm">hint: 2 3 5 7 11...</p>
            <input
              type="text"
              className="mb-4 w-full rounded border border-gray-300 p-2"
              onChange={(e) => setAns(e.target.value)}
              onPaste={(e) => handlePaste(e)}
            />
            <button
              onClick={handleSubmit}
              className="w-full rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
            >
              Submit
            </button>
          </>
        ) : (
          <p className="mb-4 text-lg font-semibold">
            Pasting not allowed. Wait for {countdown} seconds to try again.
          </p>
        )}
      </div>
    </div>
  );
}
