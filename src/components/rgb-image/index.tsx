"use client";

import React, { useEffect, useRef } from "react";

interface RGBImageSplitterProps {
  imageSrc: string;
}

const RGBImageSplitter: React.FC<RGBImageSplitterProps> = ({ imageSrc }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const redCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const greenCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const combinedCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      const canvas = canvasRef.current;
      const redCanvas = redCanvasRef.current;
      const greenCanvas = greenCanvasRef.current;
      const combinedCanvas = combinedCanvasRef.current;

      if (canvas && redCanvas && greenCanvas && combinedCanvas) {
        const ctx = canvas.getContext("2d");
        const redCtx = redCanvas.getContext("2d");
        const greenCtx = greenCanvas.getContext("2d");
        const combinedCtx = combinedCanvas.getContext("2d");

        // Set canvas dimensions
        canvas.width = image.width;
        canvas.height = image.height;
        redCanvas.width = image.width;
        redCanvas.height = image.height;
        greenCanvas.width = image.width;
        greenCanvas.height = image.height;
        combinedCanvas.width = image.width;
        combinedCanvas.height = image.height;

        // Draw the original image on the canvas
        ctx?.drawImage(image, 0, 0);

        // Get image data
        const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData?.data;

        if (data) {
          // Clear the canvases
          redCtx?.clearRect(0, 0, redCanvas.width, redCanvas.height);
          greenCtx?.clearRect(0, 0, greenCanvas.width, greenCanvas.height);
          combinedCtx?.clearRect(
            0,
            0,
            combinedCanvas.width,
            combinedCanvas.height
          );

          // Create RGB channels
          const redImageData = ctx!.createImageData(
            canvas.width,
            canvas.height
          );
          const greenImageData = ctx!.createImageData(
            canvas.width,
            canvas.height
          );
          const combinedImageData = ctx!.createImageData(
            canvas.width,
            canvas.height
          );

          for (let i = 0; i < data.length; i += 4) {
            // Set red channel
            redImageData.data[i] = data[i]!; // Red
            redImageData.data[i + 1] = 0; // Green
            redImageData.data[i + 2] = 0; // Blue
            redImageData.data[i + 3] = data[i + 3]!; // Alpha

            // Set green channel
            greenImageData.data[i] = 0; // Red
            greenImageData.data[i + 1] = data[i + 1]!; // Green
            greenImageData.data[i + 2] = 0; // Blue
            greenImageData.data[i + 3] = data[i + 3]!; // Alpha

            // Combine the red and green channels
            combinedImageData.data[i] = data[i]!; // Red
            combinedImageData.data[i + 1] = data[i + 1]!; // Green
            combinedImageData.data[i + 2] = 0; // Blue
            combinedImageData.data[i + 3] = data[i + 3]!; // Alpha
          }

          // Draw the RGB channels on their respective canvases
          redCtx?.putImageData(redImageData, 0, 0);
          greenCtx?.putImageData(greenImageData, 0, 0);
          combinedCtx?.putImageData(combinedImageData, 0, 0); // Draw combined image
        }
      }
    };
  }, [imageSrc]);

  return (
    <div className="flex flex-col items-center">
      <h2 className="mb-4 text-2xl">RGB Image Splitter</h2>
      <canvas ref={canvasRef} className="hidden" />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-center text-lg text-red-500">Red Channel</h3>
          <canvas className="w-[400px]" ref={redCanvasRef} />
        </div>
        <div>
          <h3 className="text-center text-lg text-green-500">Green Channel</h3>
          <canvas className="w-[400px]" ref={greenCanvasRef} />
        </div>
      </div>

      <h2 className="mt-6">
        Combine images to find hidden message
      </h2>
      <div className="mt-4">
        <h3 className="text-center text-lg">Combined Image</h3>
        <canvas className="w-[700px]" ref={combinedCanvasRef} />
      </div>
    </div>
  );
};

export default RGBImageSplitter;
