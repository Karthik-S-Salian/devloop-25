import { getServerAuthSession } from "~/auth";
import Link from "next/link";

const Navbar = async () => {
  const session = await getServerAuthSession();

  return (
    <nav className="fixed flex h-16 w-full flex-row items-center justify-center">
      <Link
        href={session ? "/api/auth/signout" : `/api/auth/signin?callbackUrl=/`}
        className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
      >
        {session ? "Sign out" : "Sign in"}
      </Link>
    </nav>
  );
};

export default Navbar;
