"use client";

import { useState, useEffect } from "react";

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;

interface UpCounterProps {
  initialTime: string | number;
}

export const UpCounter: React.FC<UpCounterProps> = ({ initialTime }) => {
  const [timePassed, setTimePassed] = useState<number>(0);

  const startTime =
    typeof initialTime === "string" ? Date.parse(initialTime) : initialTime;

  useEffect(() => {
    if (!isNaN(startTime)) {
      const interval = setInterval(() => {
        const timeElapsed = Date.now() - startTime;
        setTimePassed(timeElapsed);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [startTime]);

  const hours = Math.floor(timePassed / HOUR);
  const minutes = Math.floor((timePassed % HOUR) / MINUTE);
  const seconds = Math.floor((timePassed % MINUTE) / SECOND);

  return (
    <div className="timer absolute right-0 top-0 flex gap-0 bg-black p-1">
      {[
        { label: "Hours", value: hours },
        { label: "Minutes", value: minutes },
        { label: "Seconds", value: seconds },
      ].map(({ label, value }) => (
        <div key={label} className="text-white">
          <div className="box">
            <p>
              {label != "Hours" && ":"}
              {String(value).padStart(2, "0")}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
