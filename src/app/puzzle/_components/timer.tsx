"use client";

import { type inferProcedureOutput } from "@trpc/server";
import React from "react";
import { useState, useEffect } from "react";

import { type AppRouter } from "~/server/api/root";

const SECOND = 1000;
const MINUTE = 60 * 1000;
const HOUR = 60 * 60 * 1000;

const Timer = ({
  puzzle,
}: {
  puzzle: inferProcedureOutput<AppRouter["submission"]["startPuzzle"]>;
}) => {
  const [timePassed, setTimePassed] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const timeElapsed = Date.now() - puzzle.Submission[0].startTime.getTime();
      setTimePassed(timeElapsed);
    }, 1000);

    return () => clearInterval(interval);
  }, [puzzle]);

  const hours = Math.floor(timePassed / HOUR);
  const minutes = Math.floor((timePassed % HOUR) / MINUTE);
  const seconds = Math.floor((timePassed % MINUTE) / SECOND);

  return (
    <div className="flex">
      <p className="font-mono">Solving since</p>
      <p className="font-digital-number">:{String(hours).padStart(2, "0")}</p>
      <p className="font-digital-number">:{String(minutes).padStart(2, "0")}</p>
      <p className="font-digital-number">:{String(seconds).padStart(2, "0")}</p>
    </div>
  );
};

export default Timer;
