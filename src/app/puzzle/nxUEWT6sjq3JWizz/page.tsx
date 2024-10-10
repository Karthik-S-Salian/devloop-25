"use client";

import Image from "next/image";
import { useState } from "react";

import illusion from "~/resources/optical illusion.jpg";

export default function Page() {
  const [showHint, setShowHint] = useState<boolean>(false);
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (input.toLowerCase() === "docker") {
      alert("Correct");
    } else {
      alert("Wrong");
    }
  };

  return (
    <>
      <div className="flex h-screen w-screen">
        <div className="mx-auto my-auto flex flex-col items-center space-y-4 rounded-lg border-2 border-black bg-green-300 p-2">
          <div className="self-center p-1">
            Find the hidden image from the image
          </div>
          <Image
            src={illusion}
            alt="Optical Illusion Puzzle"
            width={800}
            height={800}
            className="rounded-lg"
          />
          <div className="flex flex-row space-x-3">
            <label className="p-1">Enter the key</label>
            <input
              type="text"
              className="rounded-2xl border-2 border-black p-1"
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          {showHint && (
            <div>
              &quot;What your eyes perceive may not reveal the whole truth—dive
              beneath the surface and explore the hidden layers within the
              depths.&quot;
            </div>
          )}
          <div className="flex flex-row space-x-8">
            <button
              className="rounded-2xl border-2 border-black p-2"
              onClick={handleSubmit}
            >
              Submit
            </button>
            <button
              className="rounded-2xl border-2 border-black p-2"
              onClick={() => setShowHint(!showHint)}
            >
              Hint
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
