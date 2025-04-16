"use client";

// HIDDEN TEXT
import { useState, useRef } from "react";

export default function EmojiPuzzle() {
  const [copied, setCopied] = useState(false);
  const emojiRef = useRef(null);
  const answer = "Cheater"; // Hidden answer

  const handleCopy = () => {
    navigator.clipboard
      .writeText(answer)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {
        console.log(
          "Failed to copy to clipboard. Please copy the answer manually.",
        );
      });
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center p-6">
      <h1
        ref={emojiRef}
        onCopy={handleCopy}
        className="text-4xl font-bold text-yellow-400"
      >
        👉︎ Solve This!
      </h1>
      <p className="mt-6 max-w-xl text-center text-lg text-black">
        Long ago, in the legendary kingdom of Dholakpur, a prophecy spoke of an
        ancient secret—one that could bestow eternal wisdom upon its bearer.
        Hidden within the sacred archives of the Grand Temple, the puzzle
        remained unsolved for centuries, challenging even the most brilliant
        minds.
      </p>
      <p className="mt-4 max-w-xl text-center text-lg text-black">
        The kingdoms scholars dedicated their lives to deciphering the
        inscriptions carved into stone tablets, each inscribed with cryptic
        symbols and forgotten dialects. Many believed the key to unlocking the
        wisdom lay in powerful incantations, while others sought answers in the
        stars, consulting astrologers and celestial maps.
      </p>
      <p className="mt-4 max-w-xl text-center text-lg text-black">
        One day, a young traveler arrived, armed not with books or spells but
        with an open mind. He listened to the whispers of the wind, observed the
        tiniest details, and questioned everything he saw. Unlike others before
        him, he dared to embrace the simplest of actions.
      </p>
    </div>
  );
}
