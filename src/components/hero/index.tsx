"use client";

import { ArrowDown } from "lucide-react";
import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center text-white">
      <Image
        src="/assets/Nitte NMAMIT Logo - White.webp"
        alt="Nitte NMAMIT Logo"
        height={400}
        width={400}
        className="mb-6"
      />
      <h1 className="my-2 font-serif text-5xl font-bold tracking-wide">
        Finite Loop Club
      </h1>
      <h3 className="my-2 font-serif text-3xl font-semibold text-gray-300">
        Presents
      </h3>
      <h1 className="mb-6 mt-2 pb-4 pt-2 text-5xl font-extrabold text-cyan-400">
        Decrypt’d: The PUZZLE Heist
      </h1>

      <p className="max-w-xl text-lg text-gray-300">
        Get ready for an exciting journey! Please read the instructions below
        before you start.
      </p>
      <div className="my-8">
        <ArrowDown
          size={40}
          className="animate-bounce cursor-pointer text-cyan-400 hover:text-cyan-300"
          onClick={() => {
            document
              .getElementById("rulesDiv")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        />
      </div>
    </div>
  );
};

export default Hero;
