//BUTTON
"use client";

import { useState } from "react";

//BUTTON

//BUTTON

//BUTTON

//BUTTON

//BUTTON

//BUTTON

//BUTTON

//BUTTON

//BUTTON

//BUTTON

//BUTTON

//BUTTON

export default function ButtonPuzzle() {
  const [clicks, setClicks] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // Fake domains array
  const fakeDomains = [
    "http://notarealdomain123.fake",
    "http://thisisnotreal.xyz",
    "http://nowaythisexists.lol",
    "http://totallyfakewebsite.abc",
    "http://clickbaitdoesnothing.null",
  ];

  const handleClick = () => {
    const newClickCount = clicks + 1;
    setClicks(newClickCount);

    if (newClickCount % 15 === 0) {
      const randomDomain =
        fakeDomains[Math.floor(Math.random() * fakeDomains.length)];
      window.open(randomDomain, "_blank");
    }
    if (newClickCount >= 100) {
      setShowMessage(true);
    }
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <div
        dangerouslySetInnerHTML={{
          __html: `<!--"CaesarCipher" -->`,
        }}
      />

      {showMessage ? (
        <div className="text-center">
          <h1 className="mb-4 text-3xl font-bold text-red-500">
            You have wasted a lot of time!
          </h1>
        </div>
      ) : null}

      {!showMessage && (
        <p className="mb-2 text-lg text-gray-400">Total Clicks: {clicks}</p>
      )}

      {!showMessage && (
        <button
          className="relative h-16 w-40 overflow-hidden rounded-lg px-6 py-3 text-xl font-semibold text-white shadow-lg transition-transform duration-300 hover:scale-105"
          onClick={handleClick}
        >
          <span className="animate-gradient absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-[length:200%_200%]"></span>
          <span className="relative z-10">Click Me!</span>
        </button>
      )}
    </div>
  );
}
