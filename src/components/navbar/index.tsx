import Link from "next/link";
import React from "react";

import { Button } from "~/components/ui/button";

import { getServerAuthSession } from "~/auth";
import Puzzles from "~/components/navbar/puzzles";
import Reset from "~/components/navbar/reset";
import UserView from "~/components/navbar/userView";
import { env } from "~/env";

const Navbar = async () => {
  const session = await getServerAuthSession();

  return (
    <nav className="flex h-16 min-h-16 w-full flex-row items-center justify-center gap-4 border-b">
      <Button asChild>
        <Link href={session ? "/auth/signOut" : `/auth/signIn`}>
          {session ? "Sign out" : "Sign in"}
        </Link>
      </Button>

      {env.NODE_ENV === "development" && (
        <div className="flex gap-4">
          <Puzzles />
          <UserView />
          <Reset />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
