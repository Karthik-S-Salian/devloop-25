import Image from "next/image";
import React from "react";

import { env } from "~/env";

const Plane = ({
  idx,
  time,
  isOddOneOut = false,
}: {
  idx: number;
  time: number;
  isOddOneOut?: boolean;
}) => {
  const imageSrc = isOddOneOut
    ? "/image/eqw4rK7SRu2q7QcK.png"
    : "/image/eqw4rK7SRu2q7QeK.png";

  return (
    <div
      className="duration-20s relative size-32 animate-plane"
      style={{
        animationDuration: `${time}s`,
        filter: `hue-rotate(${idx * 60}deg)`,
      }}
    >
      <a
        href={`${env.NEXT_PUBLIC_URL}${imageSrc}`}
        onClick={(e) => e.preventDefault()}
        className="cursor-default"
      >
        <div className="relative size-full">
          <Image
            src={imageSrc}
            alt={imageSrc}
            className="object-contain"
            fill
          />
        </div>
      </a>
    </div>
  );
};

export default Plane;
