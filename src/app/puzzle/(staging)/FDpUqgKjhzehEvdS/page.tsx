"use client";

// Island
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { useSubmitPuzzle } from "~/hooks/submission";

gsap.registerPlugin(Draggable);

function NearestIslandPuzzle() {
  const submitPuzzle = useSubmitPuzzle();
  const manRef = useRef(null);
  const islandRef = useRef(null);
  const landRef = useRef(null);
  const containerRef = useRef(null);
  const [onIsland, setOnIsland] = useState(true); // Start on island

  useEffect(() => {
    if (!manRef.current || !landRef.current) return;

    // Move the land further away at the start
    gsap.to(landRef.current, {
      right: "-50%", // Move it far to the right
      top: "20%", // Adjust vertical position
      duration: 2,
      ease: "power2.inOut",
    });

    const draggable = Draggable.create(manRef.current, {
      type: "x,y",
      bounds: containerRef.current,
      onDrag: function () {
        const pointer: MouseEvent =
          (this.pointerEvent as MouseEvent) || (window.event as MouseEvent);
        handleAutoScroll(pointer);
        submitPuzzle({ answer: "Swimming successfull" });
        if (
          !(
            (this as Draggable).hitTest(islandRef.current, "50%") ||
            (this as Draggable).hitTest(landRef.current, "50%")
          )
        ) {
          setOnIsland(false);
        } else {
          setOnIsland(true);
        }
      },
      onDragEnd: function () {
        // @typescript-eslint/no-unsafe-call
        if ((this as Draggable).hitTest(landRef.current, "50%")) {
          setOnIsland(true);
          toast.success("Mission Passed", {
            description: "Respect++",
            duration: 3000,
          });

          (this as Draggable).disable(); // Disable dragging after reaching land
        }
      },
    });

    return () => {
      draggable[0]?.kill(); // Cleanup on unmount
    };
  }, []);

  function handleAutoScroll(event: MouseEvent) {
    const edgeThreshold = 100;
    const speed = 10;
    const { clientX, clientY } = event;
    const { innerWidth, innerHeight, scrollX, scrollY } = window;

    if (clientX < edgeThreshold) {
      window.scrollTo({ left: scrollX - speed, behavior: "smooth" });
    } else if (clientX > innerWidth - edgeThreshold) {
      window.scrollTo({ left: scrollX + speed, behavior: "smooth" });
    }

    if (clientY < edgeThreshold) {
      window.scrollTo({ top: scrollY - speed, behavior: "smooth" });
    } else if (clientY > innerHeight - edgeThreshold) {
      window.scrollTo({ top: scrollY + speed, behavior: "smooth" });
    }
  }

  return (
    <div
      ref={containerRef}
      className="game-container relative h-full w-full select-none overflow-hidden bg-blue-900"
    >
      <h1 className="p-10 text-5xl text-blue-300">SWIM TO NEAREST MAINLAND</h1>

      {/* Island */}
      <div
        ref={islandRef}
        className="absolute left-[20%] top-[50%] flex h-64 w-64 items-center justify-center rounded-full bg-yellow-700"
      >
        <div className="absolute left-[12%] top-[15%] flex h-48 w-48 items-center justify-center rounded-full bg-green-800">
          🏝️🌴🌴🌴🌴
          <div
            ref={manRef}
            className="absolute cursor-move select-none text-4xl"
          >
            {onIsland ? "🧍‍♂️" : "🏊"}
          </div>
        </div>
      </div>

      {/* Nearest Land (moves further away with GSAP) */}
      <div
        ref={landRef}
        className="absolute right-[30%] top-[40%] flex h-64 w-64 items-center justify-center rounded-lg bg-green-600 text-2xl text-white"
      >
        🏞️ Nearest Land
      </div>
    </div>
  );
}

export default function Page() {
  return <NearestIslandPuzzle />;
}
