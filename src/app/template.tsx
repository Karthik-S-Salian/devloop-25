// "use client";
// import { useSession } from "next-auth/react";
// import { usePathname, useRouter } from "next/navigation";
import type React from "react";

const RootTemplate = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  // const router = useRouter();
  // const pathname = usePathname();
  // const { data: session } = useSession();

  // const unprotectedRoutes = [
  //   "/",
  //   "/login",
  //   "/round/1",
  //   "/round/1/intro",
  //   "/round/2",
  //   "/round/2/intro",
  // ];

  // if (!session && !unprotectedRoutes.includes(pathname)) router.push("/");

  return children;
};

export default RootTemplate;
