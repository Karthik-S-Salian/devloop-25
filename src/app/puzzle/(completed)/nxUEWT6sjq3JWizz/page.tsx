"use client";

import Image from "next/image";

const Page = () => {
  return (
    <div className="flex size-full flex-col items-center justify-center gap-4 px-4 py-20 sm:px-6 md:px-8 xl:px-10">
      <p className="absolute top-8 z-10 text-center text-3xl font-bold">
        <span>Find </span>
        <span className="text-blue-500">ME</span>
      </p>
      <div className="relative size-full">
        <Image
          className="object-contain"
          src="/image/xEISCJIINyKYp3vx.jpg"
          alt="hello-kitty"
          quality={100}
          fill
        />
      </div>
    </div>
  );
};

export default Page;
