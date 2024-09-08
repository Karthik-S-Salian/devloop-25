'use client';
import React, { useState, type DragEvent } from 'react';
import Image from 'next/image';

// Define the type for the component props
interface ImageGridProps {
  images: string[];
  columns: number; // Number of columns in the grid
  rows: number;    // Number of rows in the grid
}

// ImageGrid component
const ImageGrid: React.FC<ImageGridProps> = ({ images, columns, rows }) => {
  const [imageList, setImageList] = useState<string[]>(images);

  // Handle drag start event
  const handleDragStart = (e: DragEvent<HTMLImageElement>, index: number) => {
    e.dataTransfer.setData('text/plain', index.toString());
  };

  // Handle drop event
  const handleDrop = (e: DragEvent<HTMLImageElement>, targetIndex: number) => {
    e.preventDefault();
    const sourceIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);
    const updatedList = [...imageList];
    const [movedItem] = updatedList.splice(sourceIndex, 1);
    updatedList.splice(targetIndex, 0, movedItem!);
    setImageList(updatedList);
  };
  
  // Handle drag over event
  const handleDragOver = (e: DragEvent<HTMLImageElement>) => {
    e.preventDefault();
  };

  // Calculate grid styles based on props
  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`, // Dynamic number of columns
    gridTemplateRows: `repeat(${rows}, 1fr)`,     // Dynamic number of rows
    gap: '1px',
    width: '100%', // Full width of the parent container
    height: '100%', // Full height of the parent container
  };

  const imageStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    cursor: 'move',
  };

  return (
    <div style={gridStyle} className='bg-white p-3'>
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
          title='Arrange the image properly'
        />
      ))}
    </div>
  );
};

export default ImageGrid;
