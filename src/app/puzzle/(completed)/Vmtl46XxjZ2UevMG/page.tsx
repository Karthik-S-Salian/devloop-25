"use client";

import NextJSImage from "next/image";
import { usePathname } from "next/navigation";
import QRCode from "qrcode";
import React, { useEffect, useState, type DragEvent } from "react";

import { env } from "~/env";
import { shuffleArray } from "~/lib/utils";
import { useSubmission } from "~/store";

const DIMENSION = 4;

const Page = () => {
  const pathname = usePathname();
  const { makeAutoSubmission } = useSubmission();

  useEffect(() => {
    makeAutoSubmission();
  }, [makeAutoSubmission]);

  const [imageList, setImageList] = useState<string[]>([]);

  const handleDragStart = (e: DragEvent<HTMLImageElement>, idx: number) =>
    e.dataTransfer.setData("text/plain", idx.toString());

  const handleDrop = (e: DragEvent<HTMLImageElement>, targetIndex: number) => {
    const sourceIndex = parseInt(e.dataTransfer.getData("text/plain"), 10);
    setImageList((prev) => {
      const updatedList = [...prev];
      const temp = updatedList[targetIndex]!;
      updatedList[targetIndex] = updatedList[sourceIndex]!;
      updatedList[sourceIndex] = temp;
      return updatedList;
    });
  };

  useEffect(() => {
    QRCode.toDataURL(
      `${env.NEXT_PUBLIC_URL}${pathname}/PUV9tBLL4sWId1kU`,
      {
        width: 300,
        margin: 0,
      },
      (err, dataURL) => {
        if (err) return console.error(err);

        const qrImage = new Image();
        qrImage.src = dataURL;
        qrImage.onload = () => {
          const imgWidth = qrImage.width;
          const imgHeight = qrImage.height;

          const qrCanvas = document.createElement("canvas");
          qrCanvas.width = imgWidth;
          qrCanvas.height = imgHeight;

          const qrCtx = qrCanvas.getContext("2d");
          if (!qrCtx) throw new Error("Failed to get qr canvas context");

          qrCtx.drawImage(qrImage, 0, 0, imgWidth, imgHeight);

          const dataURLs: string[] = [];

          for (let row = 0; row < DIMENSION; row++) {
            for (let col = 0; col < DIMENSION; col++) {
              const pieceWidth = imgWidth / DIMENSION;
              const pieceHeight = imgHeight / DIMENSION;

              const pieceCanvas = document.createElement("canvas");
              pieceCanvas.width = pieceWidth;
              pieceCanvas.height = pieceHeight;

              const pieceCtx = pieceCanvas.getContext("2d");
              if (!pieceCtx)
                throw new Error("Failed to get piece canvas context");

              pieceCtx.drawImage(
                qrCanvas,
                col * pieceWidth,
                row * pieceHeight,
                pieceWidth,
                pieceHeight,
                0,
                0,
                pieceWidth,
                pieceHeight,
              );

              const dataURL = pieceCanvas.toDataURL("image/png");
              dataURLs.push(dataURL);
            }
          }

          setImageList(shuffleArray(dataURLs));
        };
      },
    );
  }, [pathname]);

  return (
    <div className="flex size-full items-center justify-center">
      <div className="w-fit pt-12">
        <div
          style={{
            gridTemplateColumns: `repeat(${DIMENSION}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${DIMENSION}, minmax(0, 1fr))`,
          }}
          className="grid size-full border-2 border-black p-2"
        >
          {imageList.map((src, idx) => (
            <div key={idx} className="relative size-32 border-black">
              <NextJSImage
                fill
                src={src}
                alt="QR Fragment"
                className="size-full cursor-move object-cover"
                draggable
                onDragStart={(e) => handleDragStart(e, idx)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, idx)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
