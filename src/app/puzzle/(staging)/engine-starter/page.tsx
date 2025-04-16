"use client";

//gravity
import Image from "next/image";
import { useRef, useState } from "react";
import { toast } from "sonner";

import { useSubmitPuzzle } from "~/hooks/submission";

import GravitySlider from "./gravity-slider";

export default function EngineStarter() {
  const submitPuzzle = useSubmitPuzzle();
  const [running, setRunning] = useState(0);
  const [success, setSuccess] = useState(false);
  const kickStartRef = useRef<HTMLAudioElement>(null);
  const kickStartSuccessRef = useRef<HTMLAudioElement>(null);

  const handleReflectionChange = (value: number) => {
    setRunning(value);
    if (kickStartRef.current) {
      // Reset audio to the beginning (or a small offset if needed) and play
      kickStartRef.current.currentTime = 0; // or 0.2 if you want to skip a silent intro
    }
    if (value >= 100 && !success) {
      submitPuzzle({ answer: "Gearhead found success" });
      toast.success("GearHead i see 😈");
      kickStartSuccessRef.current
        ?.play()
        .then(() => {
          console.log("success");
        })
        .catch((err) => {
          console.error("failed:", err);
        });
      setSuccess(true);
    } else {
      kickStartRef.current?.play().catch((err) => {
        console.error("Audio play failed:", err);
      });
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="mb-8 text-4xl">
        Imagine a 2-stroke engine on a cold-morning: KickStart this!
      </h1>
      <div
        className={`w-128 mb-8 flex h-64 items-center justify-center rounded-lg border-4 shadow-lg transition-all duration-500 ${
          success
            ? "border-yellow-400 bg-yellow-300 text-gray-900"
            : "border-gray-600 bg-gray-500"
        }`}
      >
        <Image width={400} height={300} src={"/yamaha.webp"} alt="bike" />
      </div>
      <div className="mb-4">
        <p className="text-xl">
          RPM: {success ? "1200" : Math.round(running) * 10}
        </p>
      </div>
      <GravitySlider onChange={handleReflectionChange} />
      {/* Invisible audio element preloaded so that playback is instantaneous */}
      <audio
        ref={kickStartRef}
        preload="auto"
        src="/kickstart.mp3"
        style={{ display: "none" }}
      />
      <audio
        ref={kickStartSuccessRef}
        preload="auto"
        src="/successStart.mp3"
        style={{ display: "none" }}
      />
    </div>
  );
}
