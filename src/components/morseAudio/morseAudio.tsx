"use client";

import { useState } from "react";

export default function MorseAudio() {
  const [input, setInput] = useState<string>("");
  const [hint, showHint] = useState<boolean>(false);

  const checkValue = () => {
    if (input === "digital hunt is easy") {
      alert("Correct");
    } else {
      alert("Try Again");
    }
  };

  return (
    <>
      <div className="flex h-screen items-center justify-center border-black">
        <div className="flex h-auto w-auto flex-col items-center space-y-5 rounded-2xl border-black bg-green-100 p-4 text-black shadow-lg shadow-green-900">
          <audio src="/morse-code.mp3" controls />
          <div className="flex flex-row space-x-5">
            <label>Enter the message : </label>
            <input
              onChange={(e) => setInput(e.target.value)}
              type="text"
              name="message"
              id="message"
              className="border-3 rounded-2xl border border-black pl-2 pr-2"
              required
            />
          </div>
          {hint && (
            <>
              <div>
                The pitch will guide you. High and low, dot and dash—the key
                lies in the sound.
              </div>
            </>
          )}
          <div className="flex flex-row justify-center space-x-5">
            <button
              className="rounded-xl border-2 border-black p-1"
              onClick={checkValue}
            >
              Check
            </button>
            <button
              className="rounded-xl border-2 border-black p-1"
              onClick={(e) => showHint(!hint)}
            >
              Hint
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
