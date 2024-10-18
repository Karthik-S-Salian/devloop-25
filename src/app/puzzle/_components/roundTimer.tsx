"use client";

import React, { useCallback } from "react";
import { useState, useEffect } from "react";

const SECOND = 1000;
const MINUTE = 60 * 1000;
const HOUR = 60 * 60 * 1000;

const ROUND_ONE_START = new Date("2024-10-19T04:00:00Z");
const ROUND_ONE_END = new Date("2024-10-19T05:30:00Z");

const RoundTimer = () => {
  const [timePassed, setTimePassed] = useState<number>(0);
  const [activeSlot, setActiveSlot] = useState<
    "BEFORE_ROUND_ONE" | "DURING_ROUND_ONE" | "EVENT_DONE"
  >("BEFORE_ROUND_ONE");

  const updateTime = useCallback(() => {
    const r1s = ROUND_ONE_START.getTime() - Date.now();
    const r1e = ROUND_ONE_END.getTime() - Date.now();

    setTimePassed(r1s > 0 ? r1s : r1e > 0 ? r1e : -r1e);
    setActiveSlot(
      r1s > 0
        ? "BEFORE_ROUND_ONE"
        : r1e > 0
          ? "DURING_ROUND_ONE"
          : "EVENT_DONE",
    );
  }, []);

  useEffect(() => {
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [updateTime]);

  const hours = Math.floor(timePassed / HOUR);
  const minutes = Math.floor((timePassed % HOUR) / MINUTE);
  const seconds = Math.floor((timePassed % MINUTE) / SECOND);

  return (
    <div className="flex">
      {activeSlot === "BEFORE_ROUND_ONE" && (
        <p className="font-mono">Round 1 starts in</p>
      )}
      {activeSlot === "DURING_ROUND_ONE" && (
        <p className="font-mono">Round 1 ends in</p>
      )}

      {activeSlot === "EVENT_DONE" && <p className="font-mono">Event ended</p>}
      <p className="font-digital-number">:{String(hours).padStart(2, "0")}</p>
      <p className="font-digital-number">:{String(minutes).padStart(2, "0")}</p>
      <p className="font-digital-number">:{String(seconds).padStart(2, "0")}</p>
    </div>
  );
};

export default RoundTimer;
