"use client";

import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";

import { useSubmitPuzzle } from "~/hooks/submission";

gsap.registerPlugin(Draggable);

function PatiencePuzzle() {
  const submitPuzzle = useSubmitPuzzle();
  const [unlocked, setUnlocked] = useState(false);
  const [dropped, setDropped] = useState(false);
  const keyRef = useRef(null);
  const dropZoneRef = useRef(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    startTimer();
    return () => clearTimeout(timerRef.current!);
  }, []);

  function startTimer() {
    clearTimeout(timerRef.current!);
    setUnlocked(false);
    setDropped(false);

    timerRef.current = setTimeout(() => {
      setUnlocked(true);
    }, 15000);
  }

  function resetTimer() {
    toast.error("DAMN", {
      description: "you got it wrong",
    });
    clearTimeout(timerRef.current!);
    setUnlocked(false);
    setDropped(false);

    timerRef.current = setTimeout(() => {
      setUnlocked(true);
    }, 15000);
  }

  useEffect(() => {
    if (unlocked) {
      Draggable.create(keyRef.current, {
        type: "x,y",
        bounds: ".game-container",
        onDragEnd: function () {
          if ((this as Draggable).hitTest(dropZoneRef.current, "50%")) {
            setDropped(true);
            gsap.to(keyRef.current, { x: 0, y: 0, opacity: 0, duration: 0.5 });
            toast.success("😌", { description: "you did it", duration: 3000 });
            submitPuzzle({ answer: "Patience unlocked respect++" });
          }
        },
      });
    }
  }, [unlocked]);

  return (
    <div
      className={`game-container flex min-h-screen select-none flex-col items-center justify-center bg-black text-5xl text-white ${dropped ? "pointer-events-none" : ""}`}
    >
      <h1 className="mb-8 select-none text-7xl">
        {unlocked ? <div ref={keyRef}>Patience</div> : <div>Patience</div>} is
        the Key
      </h1>
      <div className="grid grid-cols-2 gap-4">
        <div
          ref={dropZoneRef}
          onClick={resetTimer}
          className={`border border-white p-4 ${dropped ? "bg-green-500" : ""}`}
        >
          {dropped ? (
            <p className="text-center text-green-300">hehe!</p>
          ) : (
            "Yeah kinda"
          )}
        </div>
        <div className="border border-white p-4" onClick={resetTimer}>
          Hell Naawh
        </div>
        <div className="border border-white p-4" onClick={resetTimer}>
          Idk Dude
        </div>
        <div className="border border-white p-4" onClick={resetTimer}>
          Well Im having brainfog
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return <PatiencePuzzle />;
}
