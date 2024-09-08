"use client";

import React, { useEffect, useRef, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import ImageGrid from './grid'

const QrCodeWithImage: React.FC<{dimension:number,message:string}> = ({dimension,message}) => {
  const [qrImageUrl, setQrImageUrl] = useState<string | null>(null);
  const [pieces, setPieces] = useState<string[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const dataUrl = canvasRef.current.toDataURL('image/png');
      setQrImageUrl(dataUrl);
      void splitImage(dataUrl,dimension);
    }
  }, []);

  const splitImage = async (url: string,dimension:number) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous'; // Handle CORS
    img.src = url;

    
    await new Promise<void>((resolve) => {
      img.onload = () => resolve();
    });

    const imgWidth = img.width;
    const imgHeight = img.height;

    // Create a canvas element to draw the image
    const canvas = document.createElement('canvas');
    canvas.width = imgWidth;
    canvas.height = imgHeight;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      console.error('Failed to get canvas context');
      return;
    }

    ctx.drawImage(img, 0, 0);

    // Array to hold the data URLs of each piece
    const dataURLs: string[] = [];

    // Split the image into four pieces
    for (let row = 0; row < dimension; row++) {
      for (let col = 0; col < dimension; col++) {
        const pieceWidth = imgWidth / dimension;
        const pieceHeight = imgHeight / dimension;

        const pieceCanvas = document.createElement('canvas');
        pieceCanvas.width = pieceWidth;
        pieceCanvas.height = pieceHeight;
        const pieceCtx = pieceCanvas.getContext('2d');

        if (!pieceCtx) {
          console.error('Failed to get piece canvas context');
          return;
        }

        // Draw the piece onto the new canvas
        pieceCtx.drawImage(
          canvas,
          col * pieceWidth, row * pieceHeight, pieceWidth, pieceHeight,
          0, 0, pieceWidth, pieceHeight
        );

        // Convert the piece to a data URL
        const dataURL = pieceCanvas.toDataURL('image/png');
        dataURLs.push(dataURL);
      }
    }

    setPieces(dataURLs);
    console.log(dataURLs);
  };

  const shuffleArray = (array: string[]): string[] => {
    const shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
     
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j]!, shuffledArray[i]!];
    }
    
    return shuffledArray;
  };

  return (
    <div className='pt-12'>
 

    {pieces.length > 0 ? (
        <ImageGrid columns={dimension} rows={dimension} images={ shuffleArray(pieces) } />
      ) : (
        <p>Loading...</p>
      )}



<QRCodeCanvas
        value={message}
        size={800}
        bgColor="#FFFFFF"
        fgColor="#000000"
        ref={canvasRef}
        className='hidden'
      />
    </div>
  );
};

export default QrCodeWithImage;
