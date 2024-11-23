"use client";

import Image from "next/image";

const TeamCard = ({ name, image }: { name: string; image: string }) => {
  return (
    <div className="border-1 flex h-[400px] w-[270px] flex-col items-center gap-4 rounded-2xl border border-yellow-600 px-3 py-4 shadow-lg shadow-yellow-300">
      <div className="relative h-[250px] w-full">
        <Image
          src={image}
          alt={name}
          className="rounded-xl object-cover"
          fill
        />
      </div>
      <h1 className="font-fira-code text-2xl capitalize">{name}</h1>
    </div>
  );
};
export default TeamCard;
