"use client";

import React, { useEffect, useRef } from "react";

const Page = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!pageRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = pageRef.current.clientWidth;
    canvas.height = pageRef.current.clientHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.font = "2.5rem Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const text =
      "Я повністю за дивну країну, яка дозволяє кіноакторам керувати нею";
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  }, []);

  return (
    <div ref={pageRef} className="size-full">
      <canvas ref={canvasRef} className="-scale-100"></canvas>
    </div>
  );
};

export default Page;
