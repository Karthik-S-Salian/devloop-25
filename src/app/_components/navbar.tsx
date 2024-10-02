import Link from "next/link";
import React from "react";

import { getServerAuthSession } from "~/auth";

const Navbar = async () => {
  const session = await getServerAuthSession();

  return (
    <nav className="flex h-16 w-full flex-row items-center justify-center">
      <Link
        href={session ? "/api/auth/signout" : `/login`}
        className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
      >
        {session ? "Sign out" : "Sign in"}
      </Link>
    </nav>
  );
};

export default Navbar;
