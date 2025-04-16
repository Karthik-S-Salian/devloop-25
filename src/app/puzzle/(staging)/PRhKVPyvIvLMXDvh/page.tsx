"use client";

// flappy bird
import { useEffect, useState } from "react";

import { useSubmitPuzzle } from "~/hooks/submission";

export default function Page() {
  const submitPuzzle = useSubmitPuzzle();
  const [isWin, setIsWin] = useState(false);
  const [isLost, setIsLost] = useState(false);
  const [ypos, setYpos] = useState(100);
  const gravity = 10;
  const jumpStrength = -50;
  const jumpKey = " ";

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === jumpKey && !isLost) {
      setYpos((prev) => Math.max(prev + jumpStrength, 0));
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    let winTimeout: NodeJS.Timeout | null; // eslint-disable-line prefer-const
    const gravityInterval = setInterval(() => {
      setYpos((prev) => {
        const newY = prev + gravity;
        if (newY >= 370 || newY <= 10) {
          if (winTimeout) clearTimeout(winTimeout);
          setIsLost(true);
          clearInterval(gravityInterval);
          window.removeEventListener("keydown", handleKeyDown);
          return 185;
        }
        return newY;
      });
    }, 50);

    winTimeout = setTimeout(() => {
      setIsWin(true);
      submitPuzzle({ answer: "bird flappy dancing on a wall" });
      clearInterval(gravityInterval);
      window.removeEventListener("keydown", handleKeyDown);
    }, 10000);

    return () => {
      clearInterval(gravityInterval);
      clearTimeout(winTimeout);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="grid h-full place-content-center bg-gray-100">
      <div className="relative flex aspect-[4/3] h-[400px] w-[500px] items-center justify-center rounded-lg border-4 border-black bg-blue-200 shadow-lg">
        {/* Bird */}
        <div
          className="absolute aspect-square h-[30px] rounded-full"
          style={{ top: `${ypos}px`, left: "40%" }}
        />

        {/* Win Message */}
        {isWin && (
          <div className="absolute left-1/2 top-2 -translate-x-1/2 rounded bg-green-300 p-2 shadow">
            🎉 You Won!!!
          </div>
        )}

        {/* Loss Message */}
        {isLost && (
          <div className="absolute left-1/2 top-2 -translate-x-1/2 rounded bg-red-300 p-2 shadow">
            ❌ Game Over!
            <br />
            <button
              className="mt-2 rounded border bg-white px-3 py-1 shadow hover:bg-gray-200"
              onClick={() => window.location.reload()}
            >
              🔄 Restart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
