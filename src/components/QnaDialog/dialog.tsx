"use client";

import Image from "next/image";
import React, { useState } from "react";

type propType = {
  questionNo: number;
  answer: string;
  question: string;
  imageUrl?: string;
  hint: string;
};

export default function Dialog({
  questionNo,
  question,
  answer,
  imageUrl,
  hint,
}: propType) {
  const [userAnswer, setUserAnswer] = useState("");
  const [hintDialogView, setHintDialogView] = useState(false);
  const [answeredState, setUserAnsweredState] = useState(false);

  const verifyAnswer = () => {
    if (userAnswer === `finiteCTF{${answer}}`) {
      alert("Bingo");
      setUserAnsweredState(true);
    } else {
      alert("Incorrect");
    }
  };

  return (
    <div className="p-6">
      <h2 className="mt-[25vh] text-center text-3xl">Challenge {questionNo}</h2>
      <br />

      <div className="bg--600 container m-auto w-[60%] text-center">
        <div id="question" className="m-auto">
          {question}
        </div>

        <div id="image" className="mt-3">
          {imageUrl && (
            <Image
              width={100}
              height={100}
              className="w-full"
              src={imageUrl}
              alt="hello-kitty"
            />
          )}
        </div>

        <div className="mt-6">
          <p>Use the word as the flag in the format:</p>
          <p className="text-green-500">finiteCTF&#123;XXXX&#125;</p>
        </div>

        {hintDialogView && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-950 bg-opacity-20">
            <dialog
              open
              className="h-fit w-[200px] flex-col items-center justify-center rounded-md bg-white p-2 shadow-md"
            >
              {hint} <br />
              <button
                onClick={() => setHintDialogView((prev) => !prev)}
                className="right-0 m-2 rounded-md bg-slate-300 p-2 text-sm"
              >
                Close
              </button>
            </dialog>
          </div>
        )}

        {hint && (
          <div id="hint" className="mt-3 flex justify-center">
            <button
              onClick={() => setHintDialogView((prev) => !prev)}
              className="rounded-md bg-green-400 px-2 py-1"
            >
              Hint
            </button>
          </div>
        )}

        <div>
          <input
            type="text"
            placeholder="Answer"
            onChange={(e) => {
              setUserAnswer(e.target.value);
            }}
            className="my-3 w-full rounded-md bg-gray-600 p-2 outline-0"
            disabled={answeredState}
            title={answeredState ? "answered once" : ""}
          />
          <button
            onClick={verifyAnswer}
            title={answeredState ? "answered once already" : ""}
            disabled={answeredState}
            className="w-full rounded-lg border-2 p-3 transition-colors hover:bg-slate-500"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
