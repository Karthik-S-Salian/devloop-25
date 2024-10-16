
"use client";

import { useEffect, useState } from "react";
import RockPaperScissor from "./rock_papper_scissor";



const MAX_COUNT = 10;
// To solve this puzzle u must refresh the page MAX_COUNT no of times
export default function Page() {
  const [count, setCount] = useState(MAX_COUNT);

  useEffect(() => {
    const countStr = localStorage.getItem("count");
    if (countStr) {
      const storedCount = parseInt(countStr);
      setCount(storedCount);
      if (storedCount >= 10) {
        alert("puzzle solved");
        //puzzle solved
      }
      localStorage.setItem("count", `${storedCount + 1}`);
    } else {
      console.log("restart");
      localStorage.setItem("count", "1");
      setCount(1);
    }
  }, []);
  return (
    <>
      <p className="text-2xl">
        The "Guardian" is protecting the gates u need to outsmart him to pass
        through. He is a gambler and a good one at it. But one thing he is not good
        at is waiting.
      </p>
      <div>
        <RockPaperScissor />
      </div>
    </>
  );
}