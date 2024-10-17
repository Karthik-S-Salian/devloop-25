"use client";

import React, { useEffect, useRef } from "react";

const Page = () => {
  const redCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const greenCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const redCanvas = redCanvasRef.current;
    const greenCanvas = greenCanvasRef.current;
    if (!redCanvas || !greenCanvas) return;

    const canvas = document.createElement("canvas");

    const image = new Image();
    image.src = "/image/rCWX2C2mbdlo6mML.jpg";
    image.onload = () => {
      const ctx = canvas.getContext("2d");
      const redCtx = redCanvas.getContext("2d");
      const greenCtx = greenCanvas.getContext("2d");

      if (!ctx || !redCtx || !greenCtx) return;

      canvas.width = image.width;
      canvas.height = image.height;
      redCanvas.width = image.width;
      redCanvas.height = image.height;
      greenCanvas.width = image.width;
      greenCanvas.height = image.height;

      ctx.drawImage(image, 0, 0);

      const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData?.data;

      if (data) {
        redCtx.clearRect(0, 0, redCanvas.width, redCanvas.height);
        greenCtx.clearRect(0, 0, greenCanvas.width, greenCanvas.height);

        const redImageData = ctx.createImageData(canvas.width, canvas.height);
        const greenImageData = ctx.createImageData(canvas.width, canvas.height);

        for (let i = 0; i < data.length; i += 4) {
          redImageData.data[i] = data[i]!;
          redImageData.data[i + 1] = 0;
          redImageData.data[i + 2] = 0;
          redImageData.data[i + 3] = data[i + 3]!;

          greenImageData.data[i] = 0;
          greenImageData.data[i + 1] = data[i + 1]!;
          greenImageData.data[i + 2] = 0;
          greenImageData.data[i + 3] = data[i + 3]!;
        }

        redCtx.putImageData(redImageData, 0, 0);
        greenCtx.putImageData(greenImageData, 0, 0);
      }
    };
  }, []);

  return (
    <div className="flex size-full items-center justify-center gap-4">
      <canvas className="size-96" ref={redCanvasRef} />
      <canvas className="size-96" ref={greenCanvasRef} />
    </div>
  );
};

export default Page;
