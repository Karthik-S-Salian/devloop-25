"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

import { Button } from "~/components/ui/button";

const ProdNavbar = () => {
  const router = useRouter();

  return (
    <nav className="absolute left-0 top-0 z-50 flex h-16 w-full flex-row items-center justify-center gap-4 border-b">
      <Button onClick={() => router.back()}>Go Back</Button>
      <Button asChild>
        <Link href="/leaderboard">Leaderboard</Link>
      </Button>
    </nav>
  );
};

export default ProdNavbar;
