import Link from "next/link";
import React from "react";

import { Button } from "~/components/ui/button";

import Puzzles from "~/components/navbar/puzzles";
import Reset from "~/components/navbar/reset";
import UserView from "~/components/navbar/userView";

const Navbar = () => {
  return (
    <nav className="absolute left-0 top-0 z-50 flex h-16 w-full flex-row items-center justify-center gap-4 border-b">
      <Button asChild>
        <Link href="/">Home</Link>
      </Button>
      <Button asChild>
        <Link href="/round">Round</Link>
      </Button>
      <Button asChild>
        <Link href="/story">Story</Link>
      </Button>
      <Button asChild>
        <Link href="/leaderboard">Leaderboard</Link>
      </Button>
      <Puzzles />
      <UserView />
      <Reset />
    </nav>
  );
};

export default Navbar;
