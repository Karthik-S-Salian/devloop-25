"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

import { Button } from "~/components/ui/button";

import Reset from "~/components/navbar/reset";

const ProdNavbar = () => {
  const router = useRouter();

  return (
    <nav className="absolute left-2/4 top-0 z-50 flex h-16 w-4/5 -translate-x-2/4 items-center justify-center gap-6 border-b shadow-md">
      <Button
        onClick={() => router.push("/round")}
        className="bg-cyan-500 text-white transition-colors hover:bg-cyan-600"
      >
        Round
      </Button>
      <Button
        asChild
        className="bg-cyan-500 text-white transition-colors hover:bg-cyan-600"
      >
        <Link href="/leaderboard">Leaderboard</Link>
      </Button>
      <Reset />
    </nav>
  );
};

export default ProdNavbar;
