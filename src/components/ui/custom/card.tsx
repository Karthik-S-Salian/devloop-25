"use client";

import Image from "next/image";

const TeamCard = ({ name, image }: { name: string; image: string }) => {
  return (
    <div className="group relative flex h-[400px] w-[270px] cursor-pointer flex-col items-center gap-4 overflow-hidden rounded-2xl border border-gray-700 bg-gray-900 px-3 py-4 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
      <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-gray-800 via-gray-700 to-gray-600 opacity-0 transition-opacity duration-300 group-hover:opacity-30"></div>
      <div className="relative h-[250px] w-full overflow-hidden rounded-xl">
        <Image
          src={image}
          alt={name}
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          fill
        />
      </div>
      <h1 className="font-fira-code text-2xl capitalize text-gray-300 transition-colors duration-300 group-hover:text-yellow-400">
        {name}
      </h1>
    </div>
  );
};
export default TeamCard;
