"use client";

import Image from "next/image";
import React, { useState } from "react";

const imageList = [
  "https://res.cloudinary.com/dh0sqelog/image/upload/v1728807170/cbc71db192d665f8eddea75bf64574ce2fbae9cb.webp",
  "https://res.cloudinary.com/dh0sqelog/image/upload/v1728808377/37c72bd3b820580a7f9afda864e0818f8112d286.jpg",
  "https://res.cloudinary.com/dh0sqelog/image/upload/v1728807223/c3fbab99a89461ead26bf855fa2f72d951979b73.jpg",
  "https://res.cloudinary.com/dh0sqelog/image/upload/v1728807208/214f955b81568f08cac4de47f83fcd077c959cc4.jpg",
  "https://res.cloudinary.com/dh0sqelog/image/upload/v1728807188/017fa3b720f4276550fec22248e490a9e9ecba65.jpg",
  "https://res.cloudinary.com/dh0sqelog/image/upload/v1728807244/3a03befaa2b00040e4a52e445159a778ebcdd73c.jpg",
  "https://res.cloudinary.com/dh0sqelog/image/upload/v1728807261/3e23d3e6977705ad38dd52ad4e301f4732169dd1.jpg",
];

export default function ImageGallery() {
  const [mainImage, setMainImage] = useState<string>(
    "https://res.cloudinary.com/dh0sqelog/image/upload/v1728806978/67eacae0ffc094f7e57e806ebb42b952f3117a11.png",
  );

  // const handleImageClick = (imageUrl: string) => {
  //   setMainImage(imageUrl)
  // }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 p-6 text-white">
      {/* Question Image */}
      <div className="mb-4 max-w-full">
        <Image
          src={mainImage}
          height={200}
          width={900}
          alt="Main Display"
          className="h-auto max-h-[80vh] w-auto max-w-full rounded-lg border-4 border-gray-700 object-contain"
        />
      </div>

      {/* Clue/distraction images */}
      <div className="flex max-w-full space-x-4 overflow-x-auto pb-4">
        {imageList.map((image, index) => (
          <Image
            key={index}
            src={image}
            width={100}
            height={100}
            alt={`Thumbnail ${index + 1}`}
            className="h-24 w-24 flex-shrink-0 cursor-pointer rounded-md object-cover transition-transform hover:scale-105"
          />
        ))}
      </div>

      {/* <h2 className='text-gray-900 mt-48 text-xs'>decypher the sentance</h2> */}
    </div>
  );
}
