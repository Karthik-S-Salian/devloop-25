/* eslint-disable @next/next/no-img-element */
"use client";

const Page = () => {
  return (
    <div className="flex size-full items-center justify-center">
      <div className="grid aspect-square size-full grid-cols-2">
        <img
          src="/image/Dvs7MGbCWpIYcUti.png"
          alt="hello-kitty"
          className="pointer-events-none size-full select-none object-contain"
          draggable="false"
        />
        <img
          src="/image/Dvs7MGbCWpIYeUti.png"
          alt="hello-kitty"
          className="pointer-events-none size-full select-none object-contain"
          draggable="false"
        />
        <img
          src="/image/Dws7MGbCWpIYcUti.png"
          alt="hello-kitty"
          className="pointer-events-none size-full select-none object-contain"
          draggable="false"
        />
        <img
          src="/image/Dws7MGbCWpIYeUti.png"
          alt="hello-kitty"
          className="pointer-events-none size-full select-none object-contain"
          draggable="false"
        />
      </div>
    </div>
  );
};

export default Page;
