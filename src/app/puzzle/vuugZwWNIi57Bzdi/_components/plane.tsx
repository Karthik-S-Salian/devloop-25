import Image from "next/image";
import React from "react";

const Plane = ({
  time,
  isOddOneOut = false,
}: {
  time: number;
  isOddOneOut?: boolean;
}) => {
  return (
    <div
      className="animate-plane relative mt-6 size-32"
      style={{ animationDuration: `${time}s` }}
    >
      <Image
        src={
          isOddOneOut
            ? "/image/eqw4rK7SRu2q7QcK.png"
            : "/image/eqw4rK7SRu2q7QeK.png"
        }
        className="object-contain"
        alt="Plane"
        fill
      />
    </div>
  );
};

export default Plane;
