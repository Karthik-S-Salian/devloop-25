"use client";

import Image from "next/image";
import React from "react";

const imageList = [
  "/image/IMir1vSpUS9Hkl0G1.webp",
  "/image/IMir1vSpUS9Hkl0G2.webp",
  "/image/IMir1vSpUS9Hkl0G3.webp",
  "/image/IMir1vSpUS9Hkl0G4.webp",
  "/image/IMir1vSpUS9Hkl0G5.webp",
  "/image/IMir1vSpUS9Hkl0G6.webp",
  "/image/IMir1vSpUS9Hkl0G7.webp",
];

const Page = () => {
  const mainImage = "/image/IMir1vSpUS9Hkl0Gc.webp";

  return (
    <div className="flex size-full flex-col items-center justify-center">
      <div className="mb-4 max-w-full">
        <Image
          src={mainImage}
          height={200}
          width={900}
          alt="Main Display"
          className="h-auto max-h-[80vh] w-auto max-w-full rounded-lg border-4 border-gray-700 object-contain"
        />
      </div>

      <div className="flex w-full items-center justify-center space-x-4 pb-4">
        {imageList.map((image, index) => (
          <Image
            key={index}
            src={image}
            width={100}
            height={100}
            alt=""
            className="h-24 w-24 flex-shrink-0 cursor-pointer rounded-md object-cover transition-transform hover:scale-105"
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
