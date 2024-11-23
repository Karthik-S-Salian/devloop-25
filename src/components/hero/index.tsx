"use client";

import { ArrowDown } from "lucide-react";
import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <>
      <Image
        src="/assets/Nitte NMAMIT Logo - White.webp"
        alt=""
        height={700}
        width={700}
      />
      <h1 className="my-2 font-serif text-4xl font-bold">Finite Loop Club</h1>
      <h3 className="my-2 font-serif text-2xl font-bold">Presents</h3>
      <h1 className="neonText mb-6 mt-2 pb-12 pt-2 text-4xl font-bold text-green-600">
        Digital Hunt
      </h1>

      <p className="text-lg">Instructions before you start</p>
      <div className="my-8">
        <ArrowDown
          size={32}
          className="animate-bounce cursor-pointer"
          onClick={() => {
            document
              .getElementById("rulesDiv")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        />
      </div>
    </>
  );
};

export default Hero;
