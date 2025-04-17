"use client";

// DRAGDROP
import { useState, useEffect } from "react";

import { useSubmitPuzzle } from "~/hooks/submission";

declare global {
  interface Window {
    unlock: () => void;
  }
}

export default function DragDropPuzzle() {
  const submitPuzzle = useSubmitPuzzle();
  const [dropped, setDropped] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);
  const [inputMessages, setInputMessages] = useState<string[]>(
    Array(5).fill(""),
  );
  const [inputPositions, setInputPositions] = useState<
    { top: string; left: string }[]
  >([]);
  const [inputCount, setInputCount] = useState(0);
  const answer = "HiddenWisdom";

  useEffect(() => {
    setInputPositions(
      Array(5)
        .fill(null)
        .map(() => ({
          top: `${Math.random() * 70 + 15}%`,
          left: `${Math.random() > 0.5 ? Math.random() * 20 + 5 : Math.random() * 20 + 75}%`,
        })),
    );
  }, []);

  const unlock = () => {
    setButtonVisible(true);
  };

  if (typeof window !== "undefined") {
    window.unlock = unlock;
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    if (data === "key") {
      alert("Success! You unlocked it.");
      setDropped(true);
      submitPuzzle({ answer: "Elon Musk" });
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const placeholders = [
    "Maybe try elsewhere...",
    "This doesn't seem right...",
    "Are you sure about this?",
    "Looks like a dead end...",
    "Keep looking...",
  ];

  const handleInputChange = (index: number, value: string) => {
    setInputCount((prev) => {
      if (prev + 1 === 40) {
        alert(
          "Ah, you're trying but this is not the way to unlock the secret.",
        );
      }
      return prev + 1;
    });

    const newMessages = [...inputMessages];
    if (value === "unlock") {
      newMessages[index] = "Not the right place to talk";
    } else {
      newMessages[index] = "NO bruh";
    }
    setInputMessages(newMessages);
  };

  return (
    <div className="relative flex h-screen w-screen flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-yellow-400">
        🔒 Unlock the Secret!
      </h1>
      <p className="mt-6 max-w-md text-center text-lg text-black">
        A door with no key, <br />A chain with no lock. <br />
        Yet one word can set me free—
        <br />
        If you dare to speak what is lost.
      </p>
      <div
        className="mt-6 flex h-32 w-32 items-center justify-center border-2 border-dashed border-gray-500"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        Drop the key here
      </div>

      {buttonVisible && (
        <div
          className="mt-4 cursor-pointer bg-gray-700 p-4 text-white"
          draggable="true"
          onDragStart={(event) => event.dataTransfer.setData("text", "key")}
        >
          🗝️ Drag me
        </div>
      )}

      {/* Scattered Input Boxes */}
      {inputPositions.map((position, index) => (
        <div key={index} className="absolute" style={position}>
          <input
            type="text"
            className="border border-gray-400 p-2"
            placeholder={placeholders[index]}
            onChange={(event) => handleInputChange(index, event.target.value)}
          />
          {inputMessages[index] && (
            <span className="mt-1 block text-red-500">
              {inputMessages[index]}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
