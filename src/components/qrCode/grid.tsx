"use client";

import Image from "next/image";
import React, { useState, type DragEvent } from "react";

interface ImageGridProps {
  images: string[];
  columns: number;
  rows: number;
}

export default function ImageGrid({ images, columns, rows }: ImageGridProps) {
  const [imageList, setImageList] = useState<string[]>(images);

  const handleDragStart = (e: DragEvent<HTMLImageElement>, index: number) => {
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDrop = (e: DragEvent<HTMLImageElement>, targetIndex: number) => {
    e.preventDefault();
    const sourceIndex = parseInt(e.dataTransfer.getData("text/plain"), 10);

    // Swap the images instead of inserting
    const updatedList = [...imageList];
    const temp = updatedList[targetIndex];
    updatedList[targetIndex] = updatedList[sourceIndex]!;
    updatedList[sourceIndex] = temp!;

    setImageList(updatedList);
  };

  const handleDragOver = (e: DragEvent<HTMLImageElement>) => {
    e.preventDefault();
  };

  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gridTemplateRows: `repeat(${rows}, 1fr)`,
    gap: "1px",
    width: "100%",
    height: "100%",
  };

  const imageStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    cursor: "move",
  };

  return (
    <div style={gridStyle} className="bg-white p-3">
      {imageList.map((src, index) => (
        <Image
          key={index}
          width={100}
          height={100}
          src={src}
          alt={`Tile ${index + 1}`}
          style={imageStyle}
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, index)}
          title="Arrange the image properly"
        />
      ))}
    </div>
  );
}
