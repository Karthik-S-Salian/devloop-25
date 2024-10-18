"use client";

import { useState, useEffect } from "react";

export default function Compass() {
  const [tiltLR, setTiltLR] = useState(0);
  const [tiltFB, setTiltFB] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", handleOrientation, true);
    } else {
      setIsSupported(false);
    }

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation, true);
    };
  }, []);

  const handleOrientation = (event: DeviceOrientationEvent) => {
    setTiltLR(Math.ceil(event.gamma ?? 0));
    setTiltFB(Math.ceil(event.beta ?? 0));
    setDirection(Math.ceil(event.alpha ?? 0));
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] p-8 text-center font-sans text-[#86fe19]">
      <h1 className="mb-4 text-2xl font-bold">Compass/Gyro</h1>

      <div id="notice" className="mb-4">
        {isSupported
          ? "SUPPORTED on this device / browser..."
          : "NOT SUPPORTED on this device / browser..."}
      </div>

      <div className="relative mx-auto my-5 h-[260px] w-[260px] rounded-[40px] border-4 border-[#444] bg-[#222] p-5">
        <div
          className="absolute left-5 top-5 h-[260px] w-[260px] bg-[url('http://dev.rvltn.eu/compass/compass.svg')] bg-cover"
          style={{ transform: `rotate(${direction}deg)` }}
        />
        <div className="absolute left-5 top-5 z-10 h-[260px] w-[260px] bg-[url('http://dev.rvltn.eu/compass/arrow.svg')] bg-cover" />
      </div>

      <div className="orientation-data mx-auto max-w-xs text-left">
        <div>
          tiltFB: <span id="tiltFB">{tiltFB}</span>
        </div>
        <div>
          tiltLR: <span id="tiltLR">{tiltLR}</span>
        </div>
        <div>
          direction: <span id="direction">{direction}</span>
        </div>
      </div>
    </div>
  );
}
