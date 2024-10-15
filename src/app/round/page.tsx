"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Page = () => {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();

  if (sessionStatus === "loading") return null;
  if (!session) {
    router.push("/auth/signIn");
    return null;
  }

  if (session.user.roundTwoSelected) router.push("/round/2");
  else router.push("/round/1");

  return null;
};

export default Page;
