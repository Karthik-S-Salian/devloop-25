"use client";

//bomb
import { useState, useEffect } from "react";
import { toast } from "sonner";

import { useSubmitPuzzle } from "~/hooks/submission";

const WIRE_COLORS = ["yellow", "green", "red", "blue", "white"];
const ANSWER_SEQUENCE = ["yellow", "red", "white", "blue", "green"];

export default function BombGame() {
  const submitPuzzle = useSubmitPuzzle();

  const [time, setTime] = useState(300); // 5 minutes in seconds
  const [hasExploded, setHasExploded] = useState(false);
  const [cutWires, setCutWires] = useState<Set<string>>(new Set());
  const [selectedColor, setSelectedColor] = useState<string[]>([]);
  const [explode, setExplode] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [explosionCount, setExplosionCount] = useState(0);

  useEffect(() => {
    if (hasExploded) {
      setExplosionCount((prev) => prev + 1);
      setTime((prevTime) => Math.max(prevTime - 300, 0)); // Deduct 5 minutes (300 seconds)
      toast.error("The bomb exploded! 5 minutes deducted.");
      setTimeout(() => {
        setHasExploded(false);
        setExplode(false);
        setCutWires(new Set());
        setSelectedColor([]);
      }, 3000); // Reset after 3 seconds
    }
  }, [hasExploded, toast]); // Added toast to dependencies

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleWireClick = (color: string) => {
    if (cutWires.has(color)) return; // Wire already cut

    const newCutWires = new Set(cutWires).add(color);
    setCutWires(newCutWires);
    const newSelectedColor = [...selectedColor, color];
    setSelectedColor(newSelectedColor);

    // Check if the cut wire is correct
    if (color !== ANSWER_SEQUENCE[newSelectedColor.length - 1]) {
      setHasExploded(true);
      setExplode(true);
      setVideoEnded(false);
    } else if (newSelectedColor.length === ANSWER_SEQUENCE.length) {
      // All wires cut correctly
      submitPuzzle({ answer: "Bomb defused" });
      toast.success("You've successfully defused the bomb!");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#282828] bg-[radial-gradient(black_15%,transparent_16%)_0_0,radial-gradient(black_15%,transparent_16%)_8px_8px] bg-[length:16px_16px]">
      <div className={`relative ${hasExploded ? "explode" : ""}`}>
        {explode && (
          <div className="fixed inset-0 z-50 bg-black">
            <video
              className="h-full w-full object-cover"
              autoPlay
              onEnded={() => setVideoEnded(true)}
            >
              <source src="/explosion.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
        {!explode || videoEnded ? (
          <div className="bomb yrwbg relative flex flex-col items-center justify-center text-[1.1vw] drop-shadow-[1em_1em_0.3em_rgba(0,0,0,0.5)] filter">
            {/* Dynamite sticks */}
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className={`relative h-[9em] w-[52em] bg-gradient-to-b from-[#3A0101] via-[#A00202] to-[#3A0101] ${
                  index === 0
                    ? "translate-y-[2em]"
                    : index === 2
                      ? "-translate-y-[2em]"
                      : "z-10 w-[54em]"
                } drop-shadow-[0_0.2em_0.1em_rgba(0,0,0,0.5)] filter`}
              >
                <div className="absolute left-[-1.9em] top-0 h-full w-[2em] rounded-l-full bg-gradient-to-b from-[#3A0101] via-[#A00202] to-[#3A0101]"></div>
                <div className="absolute right-[-1.9em] top-0 h-full w-[2em] rounded-r-full bg-gradient-to-b from-[#3A0101] via-[#A00202] to-[#3A0101]"></div>
              </div>
            ))}

            {/* Tape */}
            <div className="absolute left-[8em] top-[calc(50%-11.5em)] z-20 h-[23em] w-[3em] rounded-l-full shadow-[-1em_0_0_0_black,_-2em_0_0_0_black,_-3em_0_0_0_black,_-4em_0_0_0_black] drop-shadow-[0_0_0.3em_rgba(0,0,0,0.4)] filter"></div>
            <div className="absolute right-[8em] top-[calc(50%-11.5em)] z-20 h-[23em] w-[3em] rounded-r-full shadow-[1em_0_0_0_black,_2em_0_0_0_black,_3em_0_0_0_black,_4em_0_0_0_black] drop-shadow-[0_0_0.3em_rgba(0,0,0,0.4)] filter"></div>

            {/* Circuit board */}
            <div className="circuit absolute left-[calc(50%-12em)] top-[calc(50%-8em)] z-20 h-[16em] w-[24em] bg-[#08422A] text-[1em] shadow-[0.1em_0.1em_0.1em_rgba(0,0,0,0.4),_-0.1em_-0.1em_0.1em_rgba(0,0,0,0.4),_-0.1em_0.1em_0.1em_rgba(0,0,0,0.4),_0.1em_-0.1em_0.1em_rgba(0,0,0,0.4),_0.3em_0.3em_0.3em_rgba(0,0,0,0.5)]">
              {/* LCD Display */}
              <div className="lcd relative mx-auto mt-4 h-[7em] w-[19.5em] bg-black drop-shadow-[-0.05em_-0.05em_0_rgba(0,0,0,0.4)] filter">
                <div className="lcd__background absolute right-[0.6em] top-[0.02em] text-right font-['LCD_AT&T_Phne_Time/Date',_sans-serif] text-[5em] text-[rgba(255,255,255,0.1)]">
                  88:88
                </div>
                <div className="lcd__time absolute right-[0.6em] top-[0.02em] text-right font-['LCD_AT&T_Phne_Time/Date',_sans-serif] text-[5em] text-[#E00505] [text-shadow:0_0_0.5em_#E00505,_0_0_0.1em_#E00505]">
                  {formatTime(time)}
                </div>
              </div>

              {/* Explosion count */}
              <div className="mt-4 text-center text-white">
                Explosions: {explosionCount}
              </div>
            </div>

            {/* Wires */}
            <svg
              className="absolute right-[-6.2em] top-[6em] z-40 w-[24em] drop-shadow-[0.5em_0.5em_0.2em_rgba(0,0,0,0.3)] filter"
              viewBox="0 0 240 160"
            >
              {WIRE_COLORS.map((color, index) => {
                const isCut = cutWires.has(color);
                const d = isCut
                  ? `M10,${20 + index * 30} C30,${20 + index * 30} 40,${50 + index * 20} 60,${60 + index * 15} M180,${100 + index * 5} C200,${90 + index * 8} 220,${85 + index * 9} 230,${80 + index * 10}`
                  : `M10,${20 + index * 30} C50,${20 + index * 30} 100,${80 + index * 10} 230,${80 + index * 10}`;

                return (
                  <path
                    key={color}
                    className={`wire wire--${color} cursor-pointer`}
                    d={d}
                    stroke={color}
                    strokeWidth="3"
                    fill="none"
                    onClick={() => handleWireClick(color)}
                  />
                );
              })}
            </svg>
          </div>
        ) : null}
      </div>
    </div>
  );
}
