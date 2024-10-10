import Link from "next/link";

import { getServerAuthSession } from "~/auth";
import Puzzles from "~/components/navbar/puzzles";
import UserView from "~/components/navbar/userView";
import { env } from "~/env";

const Navbar = async () => {
  const session = await getServerAuthSession();

  return (
    <nav className="fixed flex h-16 w-full flex-row items-center justify-center">
      <Link
        href={session ? "/auth/signOut" : `/auth/signIn`}
        className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
      >
        {session ? "Sign out" : "Sign in"}
      </Link>
      {env.NODE_ENV === "development" && (
        <div className="flex gap-4">
          <Puzzles />
          <UserView />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
